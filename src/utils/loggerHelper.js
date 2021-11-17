export const log = (data, data2 = '') => {
  if (process.env.REACT_APP_ENV === 'production') return;
  console.log(data, data2);
};
