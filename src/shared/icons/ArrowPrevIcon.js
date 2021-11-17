import React from 'react';

const ArrowPrevIcon = ({ width, height, viewBox, color, className = '' }) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
     <path d="M13.6663 6.16683L3.52467 6.16683L8.18301 1.5085L6.99967 0.333496L0.333008 7.00016L6.99967 13.6668L8.17467 12.4918L3.52467 7.8335L13.6663 7.8335L13.6663 6.16683Z" fill={color}/>
    </svg>
  );
};

ArrowPrevIcon.defaultProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 14 14",
  color: "#9CA3AF",
};

export default ArrowPrevIcon;
