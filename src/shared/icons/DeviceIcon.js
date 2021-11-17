import React from 'react';

const DeviceIcon = ({color}) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.66667 8.50008H31.1667V5.66675H5.66667C4.10833 5.66675 2.83333 6.94175 2.83333 8.50008V24.0834H0V28.3334H19.8333V24.0834H5.66667V8.50008ZM32.5833 11.3334H24.0833C23.3042 11.3334 22.6667 11.9709 22.6667 12.7501V26.9167C22.6667 27.6959 23.3042 28.3334 24.0833 28.3334H32.5833C33.3625 28.3334 34 27.6959 34 26.9167V12.7501C34 11.9709 33.3625 11.3334 32.5833 11.3334ZM25.5 24.0834H31.1667V14.1667H25.5V24.0834Z"
        fill={color}
      />
    </svg>
  );
};

export default DeviceIcon;
