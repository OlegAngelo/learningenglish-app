import React from 'react';

const HeartIcon = ({
  className = '',
  width = '20',
  height = '19',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.2769 16.6056 12.3549 11.4627 17.0185L11.45 17.03L10 18.35L8.55 17.04L8.51052 17.0041C3.38263 12.3442 0 9.27033 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09ZM10 15.65L10.1 15.55C14.86 11.24 18 8.39 18 5.5C18 3.5 16.5 2 14.5 2C12.96 2 11.46 2.99 10.94 4.36H9.07C8.54 2.99 7.04 2 5.5 2C3.5 2 2 3.5 2 5.5C2 8.39 5.14 11.24 9.9 15.55L10 15.65Z"
        fill={color}
      />
    </svg>
  );
};

export default HeartIcon;
