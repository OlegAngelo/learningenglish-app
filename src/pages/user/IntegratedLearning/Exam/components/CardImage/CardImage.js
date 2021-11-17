import React from 'react';

const CardImage = ({ imgSrc, children }) => {
  return (
    <div className="min-h-px-301 overflow-hidden bg-primary-500 rounded-px-4 m-px-16">
      <img src={imgSrc} className="min-h-px-220 w-screen" />
      <div align="center">{children}</div>
    </div>
  );
};

export default CardImage;
