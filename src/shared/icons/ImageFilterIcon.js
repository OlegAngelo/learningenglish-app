import React from 'react';

const ImageFilterIcon = ({
  color = 'black',
  width = '24',
  height = '24',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 1H7C5.9 1 5 1.9 5 3V17C5 18.1 5.9 19 7 19H21C22.1 19 23 18.1 23 17V3C23 1.9 22.1 1 21 1ZM3 5H1V21C1 22.1 1.9 23 3 23H19V21H3V5ZM7 17H21V3H7V17Z"
        fill={color}
      />
    </svg>
  );
};

export default ImageFilterIcon;
