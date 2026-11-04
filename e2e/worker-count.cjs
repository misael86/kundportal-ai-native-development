function getWorkerCount(availableCpus) {
  if (!Number.isSafeInteger(availableCpus) || availableCpus < 1) {
    throw new RangeError('Available CPU count must be a positive safe integer.');
  }

  return Math.max(1, Math.floor(availableCpus * 0.8));
}

module.exports = { getWorkerCount };
