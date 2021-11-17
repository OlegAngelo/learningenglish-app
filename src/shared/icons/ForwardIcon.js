import React from 'react';

const ForwardIcon = ({ width, height, viewBox, color, className = '' }) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 7.5L3 13.9952L3 1.00481L12 7.5Z" fill={color} />
    </svg>
  );
};

ForwardIcon.defaultProps = {
  width: 12,
  height: 15,
  viewBox: '0 0 12 15',
  color: '#7A91A6',
};

export default ForwardIcon;
