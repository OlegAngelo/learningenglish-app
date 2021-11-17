import React from 'react';

const SkipIcon = ({ className, isActive, width = 21, height = 16, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 21 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5832 16L0.722657 14.12L6.76614 8L0.722659 1.88L2.58321 2.23266e-06L10.5004 8L2.5832 16Z"
        fill={isActive === 'skip' ? '#0C5F8D' : '#43596D'}
      />

      <path
        d="M12.3605 16L10.5 14.12L16.5435 8L10.5 1.88L12.3606 2.23266e-06L20.2778 8L12.3605 16Z"
        fill={isActive === 'skip' ? '#0C5F8D' : '#43596D'}
      />
    </svg>

  );
};

export default SkipIcon;
