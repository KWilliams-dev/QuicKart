// Timer.js
const startTimer = (callback, delay) => {
  const timerId = setInterval(() => {
    callback();
  }, delay);

  // Optionally, return the timerId if you want to have control over the timer (e.g., to stop it later)
  return timerId;
};

module.exports = startTimer;
