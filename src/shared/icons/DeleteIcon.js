import React from 'react';

const DeleteIcon = ({ className = '', width = '24px', height = '24px', color = '#9CA3AF', ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 2.95532L15.5 3.9404H19V5.91055H5V3.9404H8.5L9.5 2.95532H14.5ZM6 18.7165C6 19.8001 6.9 20.6867 8 20.6867H16C17.1 20.6867 18 19.8001 18 18.7165V6.89562H6V18.7165ZM8 8.86577H16V18.7165H8V8.86577Z"
        fill={color}
      />
    </svg>
  );
};

export default DeleteIcon;
