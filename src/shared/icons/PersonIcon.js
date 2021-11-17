import React from 'react';

const PersonIcon = ({ color = "#FFFFFF", className, width = 20, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.333 6.66659C13.333 8.50825 11.8413 9.99992 9.99967 9.99992C8.15801 9.99992 6.66634 8.50825 6.66634 6.66659C6.66634 4.82492 8.15801 3.33325 9.99967 3.33325C11.8413 3.33325 13.333 4.82492 13.333 6.66659ZM3.33301 14.9999C3.33301 12.7833 7.77467 11.6666 9.99967 11.6666C12.2247 11.6666 16.6663 12.7833 16.6663 14.9999V16.6666H3.33301V14.9999Z"
        fill={color}
      />
    </svg>
  );
};

export default PersonIcon;
