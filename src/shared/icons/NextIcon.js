import React from 'react';

const NextIcon = ({ className, isActive, width = 11, height = 16, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 11 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <path
        d="M2.43957 16L0.559571 14.12L6.66624 8L0.559573 1.88L2.43957 3.2871e-07L10.4396 8L2.43957 16Z"
        fill={isActive === 'next' ? '#0C5F8D' : "#43596D"}
      />
    </svg>

  );
};

export default NextIcon;
