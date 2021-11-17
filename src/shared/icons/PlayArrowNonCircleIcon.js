import React from 'react';

const PlayArrowNonCircleIcon = ({
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
      viewBox="0 0 33 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M0.333496 0.583374V41.4167L32.4168 21L0.333496 0.583374Z" fill={color} />
    </svg>
  );
};

export default PlayArrowNonCircleIcon;
