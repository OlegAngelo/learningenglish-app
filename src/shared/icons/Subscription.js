import React from 'react';

const Subscription = ({className, color = 'black', opacity = ""}) => {
  return (
    <svg 
      className={className}
      width="28"
      height="26" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M4 0H16V2H4V0ZM2 6H18V4H2V6ZM18 8C19.1 8 20 8.9 20 10V18C20 19.1 19.1 20 18 20H2C0.9 20 0 19.1 0 18V10C0 8.9 0.9 8 2 8H18ZM8 10.73L14 14L8 17.26V10.73Z" 
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default Subscription;
