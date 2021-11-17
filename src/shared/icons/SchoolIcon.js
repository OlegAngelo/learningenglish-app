import React from 'react';

const SchoolIcon = ({ color = '#FFFFFF', className, width = 20, height = 20 }) => {
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
        d="M0.833008 7.5L9.99967 2.5L19.1663 7.5V14.1667H17.4997V8.40833L9.99967 12.5L0.833008 7.5ZM4.16634 14.3167V10.9833L9.99967 14.1667L15.833 10.9833V14.3167L9.99967 17.5L4.16634 14.3167Z"
        fill={color}
      />
    </svg>
  );
};

export default SchoolIcon;
