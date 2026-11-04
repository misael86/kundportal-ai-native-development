import { availableParallelism } from 'node:os';
import { defineConfig } from '@playwright/test';
import { getWorkerCount } from './e2e/worker-count.cjs';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: getWorkerCount(availableParallelism()),
  reporter: 'list',
  use: {
    trace: 'retain-on-failure'
  },
});
