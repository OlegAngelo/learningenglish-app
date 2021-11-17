import React from 'react';

const Info = ({ label, content, classContent, classInfo }) => {
  return (
    <div className="w-px-255 h-px-42">
      <p className={`${classInfo}`}>{label}</p>
      <div className="pt-4" />
      <p className={`${classContent}`}>{content}</p>
    </div>
  );
};

export default Info;
