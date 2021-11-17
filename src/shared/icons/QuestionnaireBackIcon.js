import React from 'react';

const QuestionnaireBackIcon = ({ className, isActive, width = 11, height = 16, onClick }) => {

  return (
    <svg
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 11 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.56043 -1.64355e-07L10.4404 1.88L4.33376 8L10.4404 14.12L8.56043 16L0.56043 8L8.56043 -1.64355e-07Z"
        fill={isActive === 'back' ? '#0C5F8D' : '#43596D'}
      />
    </svg>
  );
};

export default QuestionnaireBackIcon;
