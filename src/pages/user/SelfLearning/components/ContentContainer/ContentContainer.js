import React from 'react';

const ContentContainer = ({
  title,
  className,
  children,
  handleScroll = () => {},
  cardRef
}) => {
  return (
    <div className={`px-px-10 bg-basic-400 ${className}`} onScroll={(e)=> handleScroll(e)} ref={cardRef}>
      <div className="text-center text-basic-100 text-18 font-bold">
        {title}
      </div>
      {children}
    </div>
  );
};

export default ContentContainer;
