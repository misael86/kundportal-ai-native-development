import { spawn, type ChildProcess } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const projectRoot = process.cwd();

interface RunningProcess {
  child: ChildProcess;
  output(): string;
  startError(): Error | undefined;
}

export interface IsolatedApp {
  apiUrl: string;
  baseURL: string;
  close(): Promise<void>;
}

async function findAvailablePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', resolveListen);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Could not determine an available local port.');
  }

  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => error ? rejectClose(error) : resolveClose());
  });
  return address.port;
}

function startProcess(label: string, args: string[], env: NodeJS.ProcessEnv): RunningProcess {
  const child = spawn(process.execPath, args, {
    cwd: projectRoot,
    env,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let logs = '';
  let spawnError: Error | undefined;

  for (const [stream, write] of [
    [child.stdout, process.stdout.write.bind(process.stdout)],
    [child.stderr, process.stderr.write.bind(process.stderr)]
  ] as const) {
    stream?.on('data', (chunk: Buffer) => {
      const text = chunk.toString();
      logs = `${logs}${text}`.slice(-20_000);
      write(`[${label}] ${text}`);
    });
  }
  child.once('error', (error) => {
    spawnError = error;
  });

  return {
    child,
    output: () => logs,
    startError: () => spawnError
  };
}

async function waitForServer(processInfo: RunningProcess, url: string, label: string) {
  const deadline = Date.now() + 30_000;
  let lastError = 'Server did not become ready.';

  while (Date.now() < deadline) {
    if (processInfo.startError()) {
      throw new Error(`Could not start ${label}: ${processInfo.startError()?.message}`);
    }
    if (processInfo.child.exitCode !== null) {
      throw new Error(
        `${label} exited with code ${processInfo.child.exitCode}.\n${processInfo.output()}`
      );
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }

  throw new Error(`${label} did not become ready at ${url}: ${lastError}\n${processInfo.output()}`);
}

async function stopProcess(processInfo: RunningProcess) {
  const { child } = processInfo;
  if (child.exitCode !== null || child.signalCode !== null) return;

  const exited = new Promise<void>((resolveExit) => child.once('exit', () => resolveExit()));
  if (!child.kill('SIGTERM')) return;
  const forceKill = setTimeout(() => child.kill('SIGKILL'), 3_000);
  await exited;
  clearTimeout(forceKill);
}

export async function startIsolatedApp(): Promise<IsolatedApp> {
  const directory = mkdtempSync(join(tmpdir(), `kundportal-playwright-${process.pid}-`));
  const databasePath = join(directory, 'cases.sqlite');
  const apiPort = await findAvailablePort();
  const webPort = await findAvailablePort();
  const apiUrl = `http://127.0.0.1:${apiPort}`;
  const api = startProcess('Playwright API', ['--import', 'tsx', 'e2e/start-api.ts'], {
    ...process.env,
    PLAYWRIGHT_DATABASE_PATH: databasePath,
    PORT: String(apiPort)
  });
  let web: RunningProcess | undefined;

  try {
    await waitForServer(api, `${apiUrl}/api/health`, 'Playwright API');
    web = startProcess('Playwright web', [
      'node_modules/vite/bin/vite.js',
      'packages/web',
      '--config',
      'packages/web/vite.config.ts',
      '--host',
      '127.0.0.1',
      '--port',
      String(webPort),
      '--strictPort'
    ], {
      ...process.env,
      API_PROXY_TARGET: apiUrl
    });
    const baseURL = `http://127.0.0.1:${webPort}`;
    await waitForServer(web, baseURL, 'Playwright web');

    let closed = false;
    return {
      apiUrl,
      baseURL,
      async close() {
        if (closed) return;
        closed = true;
        if (web) await stopProcess(web);
        await stopProcess(api);
        rmSync(directory, { recursive: true, force: true });
      }
    };
  } catch (error) {
    if (web) await stopProcess(web);
    await stopProcess(api);
    rmSync(directory, { recursive: true, force: true });
    throw error;
  }
}
