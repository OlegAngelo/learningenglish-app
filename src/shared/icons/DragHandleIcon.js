import React from 'react';

const DragHandleIcon = ({ color = 'black', opacity = '', className = ''}) => {
  return (
    <svg 
      width="16" 
      height="6" 
      viewBox="0 0 16 6" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M0 0H16V2H0V0ZM16 6H0V4H16V6Z" 
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default DragHandleIcon;
