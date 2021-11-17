import React from 'react';

const AccountBoxIcon = ({ color = 'white', ...props }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 2.16667V13.8333C0.5 14.75 1.24167 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5H2.16667C1.24167 0.5 0.5 1.25 0.5 2.16667ZM10.5 5.5C10.5 6.88333 9.38333 8 8 8C6.61667 8 5.5 6.88333 5.5 5.5C5.5 4.11667 6.61667 3 8 3C9.38333 3 10.5 4.11667 10.5 5.5ZM8 9.58333C6.33333 9.58333 3 10.5 3 12.1667V13H13V12.1667C13 10.5 9.66667 9.58333 8 9.58333Z"
        fill={color}
      />
    </svg>
  );
};

export default AccountBoxIcon;
