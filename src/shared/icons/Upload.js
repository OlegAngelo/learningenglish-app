import React from 'react';

const Upload = ({className, fill = 'black'}) => {
  return (
    <svg 
      className={className}
      width="28"
      height="26"
      viewBox="0 0 14 17" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M10 7V13H4V7H0L7 0L14 7H10ZM14 17V15H0V17H14Z" 
        fill={fill} 
      />
    </svg>
  );
};

export default Upload;
