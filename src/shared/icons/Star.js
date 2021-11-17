import React from 'react';

const Star = ({ width=14, height=13, color="black", className }) => {
  return (
    <svg 
      width={width}
      height={height}
      viewBox="0 0 20 19" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z" 
        fill={color}
      />
    </svg>
  );
};

export default Star;
