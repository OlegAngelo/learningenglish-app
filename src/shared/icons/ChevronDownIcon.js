import React from 'react';

const ChevronDownIcon = ({ color = "#8D8D8D", fillOpacity = "1", width = 12, height = 8, ...props }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 12 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <path
        d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
        fill={color}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default ChevronDownIcon;
