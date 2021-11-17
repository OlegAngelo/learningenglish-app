import React from 'react';

const SaveAllIcon = ({
  className = '',
  color = '#FFFFFF',
  height = '16',
  width = '16',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9917 6.40833L8.83333 8.55833V0.5H7.16667V8.55833L5.00833 6.40833L3.83333 7.58333L8 11.75L12.1667 7.58333L10.9917 6.40833ZM13.8333 13.8333V8H15.5V13.8333C15.5 14.75 14.75 15.5 13.8333 15.5H2.16667C1.25 15.5 0.5 14.75 0.5 13.8333V8H2.16667V13.8333H13.8333Z"
        fill={color}
      />
    </svg>
  );
};

export default SaveAllIcon;
