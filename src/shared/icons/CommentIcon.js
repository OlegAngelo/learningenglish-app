import React from 'react';

const CommentIcon = ({ width, height, color="#FFF" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M4 2H20C21.1 2 22 2.9 22 4V22L18 18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2ZM6 14H18V12H6V14ZM18 11H6V9H18V11ZM6 8H18V6H6V8Z" 
        fill={color}
       />
    </svg>
  );
};

export default CommentIcon;
