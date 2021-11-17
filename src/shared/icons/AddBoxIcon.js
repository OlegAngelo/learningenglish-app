import React from 'react';

const AddBoxIcon = ({ color = 'white', ...props}) => {
  return (
    <svg 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M2 0H16C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0ZM10 10H14V8H10V4H8V8H4V10H8V14H10V10Z" 
        fill={color}
      />
    </svg>
  );
};

export default AddBoxIcon;
