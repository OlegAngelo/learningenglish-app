import React, { useEffect, useRef, useState } from 'react';

const Timerbar = ({
  colorName,
  percentage,
  isShowCommentary,
  response,
  hasTimeLimit,
  stopTimer = false,
}) => {
  const timerRef = useRef(null);
  const [timerWidth, setTimerWidth] = useState(null);

  // disable transition only when timer just started and in commentary page
  const isTimerJustStarted = (percentage === 100 && colorName === 'secondary-500');
  const isTransitionDisabled = isTimerJustStarted || isShowCommentary || !hasTimeLimit;

  // update timer width when timer percentage is updated
  useEffect(() => {
    if (stopTimer) return;
    setTimerWidth(`${percentage}%`);
  }, [percentage]);

  // stop timer transition when user response is set
  useEffect(() => {
    if (response) setTimerWidth(timerRef.current.offsetWidth);
  }, [response]);

  return (
    <div
      className="flex justify-end h-px-10 w-full bg-white sticky top-0 z-10"
      style={{ zIndex: 11 }}
    >
      {response ? (
        <div
          ref={timerRef}
          className={`h-full bg-${colorName}`}
          style={{
            width: timerWidth,
            transition: 'width',
          }}
        />
      ) : (
        <div
          ref={timerRef}
          className={`h-full bg-${colorName}`}
          style={{
            width: timerWidth,
            transition: isTransitionDisabled ? 'none' : 'width 1s linear',
          }}
        />
      )}
    </div>
  );
};

export default Timerbar;
