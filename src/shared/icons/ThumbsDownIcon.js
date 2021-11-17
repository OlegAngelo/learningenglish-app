import React from 'react';

const ThumbsDownIcon = ({ className = '', color = 'white', height = '32', width = '32' }) => {
  return (
    <svg
      className={className}
      height={height}
      width={width}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00016 4H20.0002C21.4668 4 22.6668 5.2 22.6668 6.66667V20C22.6668 20.7333 22.3735 21.4 21.8802 21.88L13.1068 30.6667L11.6935 29.2667C11.3335 28.9067 11.1068 28.4 11.1068 27.8533L11.1468 27.4267L12.4135 21.3333H4.00016C2.5335 21.3333 1.3335 20.1333 1.3335 18.6667V16C1.3335 15.6533 1.40016 15.3333 1.52016 15.0267L5.54683 5.62667C5.94683 4.66667 6.8935 4 8.00016 4ZM30.6668 4H25.3335V20H30.6668V4Z"
        fill={color}
      />
    </svg>
  );
};

export default ThumbsDownIcon;
