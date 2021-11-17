import React from 'react';

const ArrowForwardIcon = ({ width, height, viewBox, color, className = '' }) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6.99967 0.333496L5.82467 1.5085L10.4747 6.16683H0.333008V7.8335H10.4747L5.82467 12.4918L6.99967 13.6668L13.6663 7.00016L6.99967 0.333496Z" fill={color} />
    </svg>
  );
};

ArrowForwardIcon.defaultProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 14 14",
  color: "#9CA3AF",
};

export default ArrowForwardIcon;
