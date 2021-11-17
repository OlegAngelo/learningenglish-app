import React from 'react';

const ExpandMoreIcon = ({
  className = '',
  height = '8',
  width = '12',
  color = '#000000 ',
  opacity = '0.54'
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.59 0.616211L6 5.19621L1.41 0.616211L0 2.02621L6 8.02621L12 2.02621L10.59 0.616211Z"
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  );
};

export default ExpandMoreIcon;
