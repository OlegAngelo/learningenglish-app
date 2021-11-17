import React, { Fragment } from 'react';

const ProgressBar = ({
  done = 0,
  progress = 0,
  width = 261,
  height = 8,
  className = '',
  color = '',
  bgColor = '',
  doneBarColor = '',
  type = '',
  isMerge = false,
  barType = '',
}) => {
  const progressBarTypes = {
    'rounded':[
      'rounded-px-20'
    ],
    'square':[
      'rounded-none'
    ],
    'square-right':[
      'rounded-l-px-20'
    ],
  };

  const progressBarDimensions = {
    width: `${width}px`,
    height: `${height}px`
  };

  const doneBar = {
    opacity: 1,
    width: `${done}%`,
    borderTopRightRadius: done === 100 ? '20px' : '0',
    borderBottomRightRadius: done === 100 ? '20px' : '0',
  };

  const progressBar = {
    opacity: 1,
    width: `${progress}%`,
    borderTopLeftRadius: done === 0 ? '20px' : '0',
    borderBottomLeftRadius: done === 0 ? '20px' : '0',
    borderTopRightRadius: progress + done >= 100 ? '20px' : '0',
    borderBottomRightRadius: progress + done >= 100 ? '20px' : '0',
  };

  return (
    <Fragment>
      <div className={`relative ${bgColor} ${progressBarTypes[type].join(' ')} ${className}`} style={progressBarDimensions}>
        {!isMerge ? (
          <div
            className={`h-full opacity-0 ${color} ${
              done == 100 && doneBarColor
            } ${
              barType
                ? progressBarTypes[barType].join(' ')
                : progressBarTypes[type].join(' ')
            }`}
            style={doneBar}
          ></div>
        ) : (
          <div className="flex h-full w-full">
            <div className={`h-full opacity-0 ${doneBarColor} rounded-l-px-20`} style={doneBar}></div>
            <div className={`h-full opacity-0 ${color}`} style={progressBar}></div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProgressBar;
