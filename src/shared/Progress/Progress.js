import React from 'react';

import { getZeroPaddedNum } from '../../utils/numberHelpers';

const Progress = ({
  className,
  innerClass,
  size = '67',
  progressNumber,
  base,
  baseColor,
  barHeight = 'h-px-16',
  valueHeight = 'text-18',
  sizePercentage = false,
}) => {
  const getWidth = (size) => {
    let style = { width: `${size}px` };

    if (sizePercentage) {
      let total = 72;
      let width = size > 100 ? total : total * (size / 100);
      style.width = `${width}%`;
    }

    return style;
  };

  return (
    <div className={`mt-px-4 flex items-center ${base ? 'relative' : ''}`}>
      <div
        className={`${barHeight} bg-adminSecondary-200 rounded-px-2 ${className}`}
        style={getWidth(size)}
      />
      {base && (
        <div
          className={`${barHeight} rounded-px-2 absolute`}
          style={{
            width: base + "px",
            backgroundColor: baseColor,
          }}
        />
      )}
      <span
        className={`${valueHeight} ml-px-8 font-bold leading-none text-adminSecondary-200 ${innerClass}`}
      >
        {getZeroPaddedNum(3, progressNumber)}
      </span>
    </div>
  );
};

export default Progress;
