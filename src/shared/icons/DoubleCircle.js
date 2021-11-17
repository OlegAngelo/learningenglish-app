
import React from 'react';

const DoubleCircle = ({ width = 25, height = 25, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12.5" cy="12.5" r="11.5" stroke="#03DAC6" strokeWidth="2"/>
      <circle cx="12.5" cy="12.5" r="4.5" stroke="#03DAC6" strokeWidth="2"/>
    </svg> 
  );
};

export default DoubleCircle;
