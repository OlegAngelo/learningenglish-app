import React from 'react';

const ArrowBackIcon = ({ className = '', width = '24px', height = '24px', color = '#000000' }) => {
  
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
    >
      <path
        d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowBackIcon;
