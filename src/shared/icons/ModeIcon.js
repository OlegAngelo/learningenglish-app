import React from 'react';

const ModeIcon = ({ width, height, color, ...props }) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2584 5.11276C17.5834 5.43776 17.5834 5.96276 17.2584 6.28776L15.7334 7.81276L12.6084 4.68776L14.1334 3.16276C14.4584 2.83776 14.9834 2.83776 15.3084 3.16276L17.2584 5.11276ZM2.5 17.9211V14.7961L11.7167 5.57944L14.8417 8.70444L5.625 17.9211H2.5Z"
      fill={color}
    />
  </svg>
);

export default ModeIcon;
