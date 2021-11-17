import React from 'react';

const CubeProgress = ({
  children: icon,
  progressNumber,
  progressWidth,
  title,
  titleFontSize,
}) => {
  return (
    <div>
      <div className="flex items-center">
        {icon}
        <span
          className="ml-px-4 font-bold text-basic-400"
          style={{
            fontSize: titleFontSize,
            lineHeight: titleFontSize,
          }}
        >
          {title}
        </span>
      </div>

      <div className="mt-px-4 flex items-center">
        <div
          className="h-px-16 bg-adminSecondary-200 rounded-px-1"
          style={{
            width: progressWidth,
          }}
        />
        <span className="ml-px-8 font-bold text-18 leading-px-18 text-adminSecondary-200">
          {progressNumber}
        </span>
      </div>
    </div>
  );
};

export default CubeProgress;
