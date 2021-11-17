import React from 'react';

const BigSpeakerIcon = ({
  className = '',
  width = 72,
  height = 72,
  color = '#0C5F8D',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 72 70.16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 9.15992V0.919922C60.04 4.55992 72 18.8799 72 35.9999C72 53.1199 60.04 67.4399 44 71.0799V62.8399C55.56 59.3999 64 48.6799 64 35.9999C64 23.3199 55.56 12.5999 44 9.15992ZM0 24V48H16L36 68V3.99998L16 24H0ZM54 36.0006C54 28.9206 49.92 22.8406 44 19.8806V52.0806C49.92 49.1606 54 43.0806 54 36.0006Z"
        fill={color}
      />
    </svg>
  );
};

export default BigSpeakerIcon;
