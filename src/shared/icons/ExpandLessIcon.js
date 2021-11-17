import React from 'react';

const ExpandLessIcon = ({
  className = '',
  color = '#000000',
  width = '12',
  height = '8',
  opacity = '0.54',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0L0 6L1.41 7.41L6 2.83L10.59 7.41L12 6L6 0Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default ExpandLessIcon;
