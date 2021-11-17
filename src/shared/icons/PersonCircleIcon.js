import React from 'react';

const PersonCircleIcon = ({ color = "#FFFFFF", className = '', width = 25, height = 25 }) => {
  return (
    <svg 
      width={width}
      height={height}
      viewBox="0 0 26 26" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M13 0.499023C6.1 0.499023 0.5 6.09708 0.5 12.9947C0.5 19.8923 6.1 25.4903 13 25.4903C19.9 25.4903 25.5 19.8923 25.5 12.9947C25.5 6.09708 19.9 0.499023 13 0.499023ZM13 4.24772C15.075 4.24772 16.75 5.92214 16.75 7.99642C16.75 10.0707 15.075 11.7451 13 11.7451C10.925 11.7451 9.25 10.0707 9.25 7.99642C9.25 5.92214 10.925 4.24772 13 4.24772ZM5.5 17.9679C7.1125 20.3921 9.875 21.9915 13 21.9915C16.125 21.9915 18.8875 20.3921 20.5 17.9679C20.4625 15.4813 15.4875 14.1193 13 14.1193C10.5 14.1193 5.5375 15.4813 5.5 17.9679Z" 
        fill={color}
      />
    </svg>

  );
};

export default PersonCircleIcon;
