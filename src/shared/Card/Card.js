import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-px-4 shadow-card max-w-px-928 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
