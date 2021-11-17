import React from 'react';

const InsertDriveFile = ({className, fill = 'black'}) => {
  return (
    <svg 
      className={className}
      width="28"
      height="26"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M5.34634 5.33366C5.34634 3.86699 6.53301 2.66699 7.99967 2.66699H18.6663L26.6663 10.667V26.667C26.6663 28.1337 25.4663 29.3337 23.9997 29.3337H7.98634C6.51967 29.3337 5.33301 28.1337 5.33301 26.667L5.34634 5.33366ZM17.333 4.66699V12.0003H24.6663L17.333 4.66699Z"
        fill={fill} 
        fillOpacity="0.54"
      />
    </svg>

  );
};

export default InsertDriveFile;
