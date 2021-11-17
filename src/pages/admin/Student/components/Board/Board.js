import React from 'react';

const Board = ({ children, className = '' }) => {
  return <div className={`bg-white mx-8 rounded-px-4 shadow-card ${className}`}>{children}</div>;
};

export default Board;
