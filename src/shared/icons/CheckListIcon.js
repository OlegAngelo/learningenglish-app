import React from 'react';

const CheckListIcon = ({
  width = 24,
  height = 24,
  color = 'white',
}) => {
  return (
    <svg 
      width={width}
      height={height}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M2 6H14V8H2V6ZM2 10H14V12H2V10ZM2 16H10V14H2V16ZM23 13L21.5 11.5L16.01 17L13 14L11.5 15.5L16.01 20L23 13Z" 
        fill={color}
      />
    </svg>
  );
};

export default CheckListIcon;

