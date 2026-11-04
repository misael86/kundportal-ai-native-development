const databasePath = process.env.PLAYWRIGHT_DATABASE_PATH;
if (!databasePath) {
  throw new Error('PLAYWRIGHT_DATABASE_PATH was not configured.');
}

process.env.DATABASE_PATH = databasePath;
process.env.PORT = process.env.PORT ?? '3001';

void import('../packages/api/src/server.js').catch((error: unknown) => {
  console.error('Failed to start the Playwright API server:', error);
  process.exitCode = 1;
});
