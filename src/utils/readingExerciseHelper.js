
export const calculateTimerPercentage = (timerHidden, currentTime, maxTime) => {
  return timerHidden ? 0 : ((currentTime - 1) / (maxTime - 1)) * 100;
};
