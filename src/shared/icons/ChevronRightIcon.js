import React from 'react';

const ChevronRightIcon = ({ color = "#0C5F8D", width = 24, height = 24, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  {...props} >
      <path d="M8.59003 16.59L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.59Z" fill={color} />
    </svg>
  );
};

export default ChevronRightIcon;
