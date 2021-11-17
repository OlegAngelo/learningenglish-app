import React from 'react';

const CheckboxIcon = ({ className, width = 16, height = 16 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.16667 0.5H13.8333C14.75 0.5 15.5 1.25 15.5 2.16667V13.8333C15.5 14.75 14.75 15.5 13.8333 15.5H2.16667C1.25 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.25 1.25 0.5 2.16667 0.5ZM13.8333 13.8333V2.16667H2.16667V13.8333H13.8333Z"
        fill="#7A91A6"
      />
    </svg>
  );
};

export default CheckboxIcon;
