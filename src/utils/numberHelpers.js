export const isUnsignedInteger = (num) => {
  return typeof num === 'number' && Number.isInteger(num) && num >= 0;
};

export const getZeroPaddedNum = (digit, num) => {
  const str = String(num);
  const isInvalidDigit = !isUnsignedInteger(digit) || digit < str.length;

  if (isInvalidDigit) {
    console.error('Invalid argument: digit');
    return '';
  }

  const array = Array(digit).fill('0');

  for (let i = 1; i <= str.length; i++) {
    array[digit - i] = str.charAt(str.length - i);
  }

  return array.join('');
};

export const formatBytes = (bytes, precision = 2) => { 
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let pow;

  bytes = Math.max(bytes, 0); 
  pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024)); 
  pow = Math.min(pow, units.length - 1);

  bytes /= Math.pow(1024, pow);

  return `${Math.round(bytes, precision)} ${units[pow]}`; 
};
