import React from 'react';

const CheckIcon = ({
  width = 12,
  height = 9,
  color = 'white',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.16667 8.84154L0 4.67487L1.175 3.49987L4.16667 6.4832L10.4917 0.158203L11.6667 1.34154L4.16667 8.84154Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
