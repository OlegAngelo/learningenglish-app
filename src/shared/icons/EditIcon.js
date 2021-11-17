import React from 'react';

const EditIcon = ({ className = '', width = '24px', height = '24px', color = '#9CA3AF' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.71 5.63006C21.1 6.02006 21.1 6.65006 20.71 7.04006L18.88 8.87006L15.13 5.12006L16.96 3.29006C17.35 2.90006 17.98 2.90006 18.37 3.29006L20.71 5.63006ZM3 21.0001V17.2501L14.06 6.19006L17.81 9.94006L6.75 21.0001H3Z"
        fill={color}
      />
    </svg>
  );
};

export default EditIcon;
