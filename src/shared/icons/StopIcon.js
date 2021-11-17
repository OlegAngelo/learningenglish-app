import React from 'react';

const StopIcon = ({ color, width = '20', height = '20', ...props }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg " {...props}>
      <circle cx="32" cy="32" r="31" stroke="#E34E42" strokeWidth="2" />
      <circle cx="32" cy="32" r="27" fill="#E34E42" />
      <rect x="23" y="23" width="20" height="20" rx="1" fill={color} />
    </svg>
  );
};

export default StopIcon;
