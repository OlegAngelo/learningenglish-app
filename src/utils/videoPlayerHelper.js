export const convertTimeFormat = (totalSeconds) => {
  const sec_num = parseInt(totalSeconds, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = hours > 0 && minutes < 10? `0${minutes}` : minutes;
  hours = hours > 0 ? `${hours}:` : '';
  return `${hours}${minutes}:${seconds}`;
};

export const getPercentage = (current, total) => (current / total) * 100;
