import React from 'react';

const BackspaceIcon = ({width='22', height='18'}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.41667 0.75H20.1667C21.175 0.75 22 1.575 22 2.58333V15.4167C22 16.425 21.175 17.25 20.1667 17.25H6.41667C5.78417 17.25 5.28917 16.92 4.95917 16.4342L0 9L4.95917 1.55667C5.28917 1.07083 5.78417 0.75 6.41667 0.75ZM16.1242 13.5833L17.4167 12.2908L14.1258 9L17.4167 5.70917L16.1242 4.41667L12.8333 7.7075L9.5425 4.41667L8.25 5.70917L11.5408 9L8.25 12.2908L9.5425 13.5833L12.8333 10.2925L16.1242 13.5833Z"
        fill="white"
      />
    </svg>
  );
};

export default BackspaceIcon;
