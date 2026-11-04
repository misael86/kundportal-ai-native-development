import assert from 'node:assert/strict';
import test from 'node:test';
import workerCount from './worker-count.cjs';

const { getWorkerCount } = workerCount;

test('[STEP10-PARALLEL-001] uses 80% of available CPUs, rounded down with a minimum of one worker', () => {
  assert.equal(getWorkerCount(1), 1);
  assert.equal(getWorkerCount(2), 1);
  assert.equal(getWorkerCount(4), 3);
  assert.equal(getWorkerCount(10), 8);
});

test('[STEP10-PARALLEL-001] rejects invalid CPU counts', () => {
  assert.throws(() => getWorkerCount(0), RangeError);
  assert.throws(() => getWorkerCount(-1), RangeError);
  assert.throws(() => getWorkerCount(1.5), RangeError);
});
