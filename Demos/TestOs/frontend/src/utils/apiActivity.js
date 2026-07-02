const listeners = new Set();
let activeCount = 0;

export const subscribeApiActivity = (fn) => {
  listeners.add(fn);
  fn(activeCount);
  return () => listeners.delete(fn);
};

const notify = () => listeners.forEach((fn) => fn(activeCount));

export const apiActivityStart = () => {
  activeCount += 1;
  notify();
};

export const apiActivityEnd = () => {
  activeCount = Math.max(0, activeCount - 1);
  notify();
};

export const getApiActivityCount = () => activeCount;
