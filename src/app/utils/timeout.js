export const handleTimeout = (callback, delay) => {
  const timeout = setTimeout(callback, delay);
  return timeout;
};
