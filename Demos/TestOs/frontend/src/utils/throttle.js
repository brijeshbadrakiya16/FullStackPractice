export const throttle = (fn, limit = 300) => {
  let inThrottle = false;
  let lastArgs = null;

  const throttled = (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          const pending = lastArgs;
          lastArgs = null;
          throttled(...pending);
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };

  return throttled;
};
