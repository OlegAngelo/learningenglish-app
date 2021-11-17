import React from 'react';

const ChevronUpIcon = ({ color = "#8D8D8D", width = 12, height = 8, ...props }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 12 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill={color}/>
    </svg>

  );
};

export default ChevronUpIcon;
