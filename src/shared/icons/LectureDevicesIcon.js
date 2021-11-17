import React from 'react';

const LectureDevicesIcon = ({
  className = '',
  color = '#FFFFFF',
  height = '18',
  width = '18',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 1.5H16.5V0H3C2.175 0 1.5 0.675 1.5 1.5V9.75H0V12H10.5V9.75H3V1.5ZM17.25 3H12.75C12.3375 3 12 3.3375 12 3.75V11.25C12 11.6625 12.3375 12 12.75 12H17.25C17.6625 12 18 11.6625 18 11.25V3.75C18 3.3375 17.6625 3 17.25 3ZM13.5 9.75H16.5V4.5H13.5V9.75Z"
        fill={color}
      />
    </svg>
  );
};

export default LectureDevicesIcon;
