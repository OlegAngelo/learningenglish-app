import React from 'react';

const CorrectIcon = ({ width, height, color, className }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="4" />
    </svg>
  )
}

export default CorrectIcon;