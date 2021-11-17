import React from 'react';

const FullscreenIcon = ({
  className = '',
  width = '14',
  height = '14',
  color = '	#FFFFFF',
  onClick,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      onClick={onClick}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5H0V0H5V2H2V5ZM0 9H2V12H5V14H0V9ZM12 12H9V14H14V9H12V12ZM9 2V0H14V5H12V2H9Z"
        fill={color}
      />
    </svg>
  );
};

export default FullscreenIcon;
