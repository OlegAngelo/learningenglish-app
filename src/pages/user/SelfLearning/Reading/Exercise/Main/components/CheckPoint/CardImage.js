import React from 'react';

const CardImage = ({ className, imgClass, imgSrc }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`bg-contain bg-center bg-no-repeat bg-white rounded-px-4 ${imgClass}`}
        style={{ backgroundImage: `url(${imgSrc})` }}
      ></div>
    </div>
  );
};

export default CardImage;
