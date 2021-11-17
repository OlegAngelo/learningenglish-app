import React from 'react';

const BackIcon = ({ width = 8.65, height = 14, color = 'white' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8.65 14"
      fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z"
        fill={color}
      />
    </svg>
  );
};

export default BackIcon;
