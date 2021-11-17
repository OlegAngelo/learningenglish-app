import React from 'react';

const PauseNonBorderIcon = ({
  className = '',
  width = '32',
  height = '41',
  color = '	#FFFFFF',
  onClick,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 14H0V0H4V14ZM8 14V0H12V14H8Z"
        fill={color}
      />
    </svg>
  );
};

export default PauseNonBorderIcon;
