import React from 'react';

const DoneIcon = ({ className = '', height = '18', width = '23', color = '#141414' }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99987 14.6001L2.39987 9.00013L0.533203 10.8668L7.99987 18.3335L23.9999 2.33346L22.1332 0.466797L7.99987 14.6001Z"
        fill={color}
      />
    </svg>
  );
};

export default DoneIcon;
