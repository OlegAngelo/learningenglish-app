import React from 'react';

const Equalizer = ({ color, width = '20', height = '20', ...props }) => {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.66699 19.3327H12.3337V0.666016H7.66699V19.3327ZM0.666992 19.3327H5.33366V9.99935H0.666992V19.3327ZM14.667 19.3327V6.49935H19.3337V19.3327H14.667Z"
        fill={color}
      />
    </svg>
  );
};

export default Equalizer;
