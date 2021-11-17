import React from 'react';

const ModeIconLarge = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2584 5.1918C17.5834 5.5168 17.5834 6.0418 17.2584 6.3668L15.7334 7.8918L12.6084 4.7668L14.1334 3.2418C14.4584 2.9168 14.9834 2.9168 15.3084 3.2418L17.2584 5.1918ZM2.5 18.0002V14.8752L11.7167 5.65848L14.8417 8.78348L5.625 18.0002H2.5Z"
      fill={color}
    />
  </svg>
);

export default ModeIconLarge;
