import React from 'react';

const MoreVerticalIcon = ({
  className = '',
  height = '24',
  width = '24',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8.97363C13.1 8.97363 14 8.07363 14 6.97363C14 5.87363 13.1 4.97363 12 4.97363C10.9 4.97363 10 5.87363 10 6.97363C10 8.07363 10.9 8.97363 12 8.97363ZM12 10.9736C10.9 10.9736 10 11.8736 10 12.9736C10 14.0736 10.9 14.9736 12 14.9736C13.1 14.9736 14 14.0736 14 12.9736C14 11.8736 13.1 10.9736 12 10.9736ZM10 18.9736C10 17.8736 10.9 16.9736 12 16.9736C13.1 16.9736 14 17.8736 14 18.9736C14 20.0736 13.1 20.9736 12 20.9736C10.9 20.9736 10 20.0736 10 18.9736Z"
        fill={color}
      />
    </svg>
  );
};

export default MoreVerticalIcon;
