import React from 'react';

const ThumbsUpIcon = ({ className = '', color = 'white', height = '32', width = '32' }) => {
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
        d="M19.5868 10.6663H28.0002C29.4668 10.6663 30.6668 11.8663 30.6668 13.333V15.9997C30.6668 16.3463 30.6002 16.6663 30.4802 16.973L26.4535 26.373C26.0535 27.333 25.1068 27.9997 24.0002 27.9997H12.0002C10.5335 27.9997 9.3335 26.7997 9.3335 25.333V11.9997C9.3335 11.2663 9.62683 10.5997 10.1202 10.1197L18.8935 1.33301L20.3068 2.73301C20.6668 3.09301 20.8935 3.59967 20.8935 4.14634L20.8535 4.57301L19.5868 10.6663ZM6.66683 11.9997H1.3335V27.9997H6.66683V11.9997Z"
        fill={color}
      />
    </svg>
  );
};

export default ThumbsUpIcon;
