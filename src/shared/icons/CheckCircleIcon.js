import React from 'react';

const CheckCircleIcon = ({
  width = 24,
  height = 24,
  color = 'black',
  opacity = '0.54',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM5 12L10 17L19 8L17.59 6.58L10 14.17L6.41 10.59L5 12Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default CheckCircleIcon;
