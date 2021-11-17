import React from 'react';

import AlarmIcon from '../../../../../../shared/icons/AlarmIcon';

const Counter = ({
  colorName,
  isDisappearedTimer,
  seconds,
  current = 0,
  max = 0,
  retry,
}) => {
  const curQuestion = current;
  const lenQuestion = max;

  if (isDisappearedTimer) {
    return (
      <div className="grid place-items-center h-px-28 w-full mt-4 mb-px-23">
        <div className="h-px-20 font-bold text-14 leading-px-20 text-primary-500">
          {retry ? 'Retry' : `${curQuestion}/${lenQuestion}`}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between h-px-28 w-full mt-4 mb-px-23 px-px-18">
      <div className="w-px-76"></div>
      <div className="h-px-20 font-bold text-14 leading-px-20 text-primary-500">
        {retry ? 'Retry' : `${curQuestion}/${lenQuestion}`}
      </div>
      <div className="flex items-center justify-between h-full w-px-76 px-4 rounded-2xl bg-white">
        <AlarmIcon colorName={colorName} />
        <p className="h-px-20 w-px-20 font-bold text-14 leading-px-20 text-center">
          <span className={`text-${colorName}`}>{seconds}</span>
        </p>
      </div>
    </div>
  );
};

export default Counter;
