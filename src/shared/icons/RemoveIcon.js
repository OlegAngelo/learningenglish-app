import React from 'react';

const RemoveIcon = ({ color = 'black', opacity = '', className = ''}) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M15.8337 10.8332H4.16699V9.1665H15.8337V10.8332Z" 
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default RemoveIcon;
