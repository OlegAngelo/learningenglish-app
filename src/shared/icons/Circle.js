import React from 'react';

const Circle = ({ width = 24, height = 24, strokeWidth = "4", radius="10.5", ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12.5" cy="12.5" r={radius} stroke="#03DAC6" strokeWidth={strokeWidth}/>
    </svg>
  );
};

export default Circle;
