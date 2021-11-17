import React from 'react';

const MicIcon = ({ color, width, height, ...props }) => { 
  return (
    <svg {...props} width={width} height={height} viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} fillRule="evenodd" clipRule="evenodd" d="M9.99 9C9.99 10.66 8.66 12 7 12C5.34 12 4 10.66 4 9V3C4 1.34 5.34 0 7 0C8.66 0 10 1.34 10 3L9.99 9ZM7 14.1C9.76 14.1 12.3 12 12.3 9H14C14 12.42 11.28 15.24 8 15.72V19H6V15.72C2.72 15.23 0 12.42 0 9H1.7C1.7 12 4.24 14.1 7 14.1Z"/>
    </svg>
  );
};

export default MicIcon;
