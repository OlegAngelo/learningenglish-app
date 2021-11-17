import React from 'react';

const FastForwardIcon = ({ width, height, viewBox, color, className = '' }) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22 7.5L13 13.9952L13 1.00481L22 7.5Z" fill={color} />
      <path d="M12 7.5L3 13.9952L3 1.00481L12 7.5Z" fill={color} />
    </svg>
  );
};

FastForwardIcon.defaultProps = {
  width: 22,
  height: 15,
  viewBox: "0 0 22 15",
  color: "#7A91A6",
};

export default FastForwardIcon;
