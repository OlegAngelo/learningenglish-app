import React from 'react';

const ImageIcon = ({className, width="24", height="24", color = 'black', opacity=""}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M16 0C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0H16ZM8 13.51L5.5 10.5L2 15H16L11.5 9L8 13.51Z" 
        fill={color} 
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default ImageIcon;
