import React from 'react';

const MicIconSmall = ({ width, height, color, ...props }) => (
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
      d="M12.4916 10.5C12.4916 11.8833 11.3833 13 9.99996 13C8.61663 13 7.49996 11.8833 7.49996 10.5V5.5C7.49996 4.11667 8.61663 3 9.99996 3C11.3833 3 12.5 4.11667 12.5 5.5L12.4916 10.5ZM9.99996 14.75C12.3 14.75 14.4166 13 14.4166 10.5H15.8333C15.8333 13.35 13.5666 15.7 10.8333 16.1V18.8333H9.16663V16.1C6.43329 15.6917 4.16663 13.35 4.16663 10.5H5.58329C5.58329 13 7.69996 14.75 9.99996 14.75Z"
      fill={color}
    />
  </svg>
);

export default MicIconSmall;
