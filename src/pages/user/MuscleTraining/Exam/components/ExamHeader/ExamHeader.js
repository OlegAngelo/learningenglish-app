import React, { Fragment, useEffect } from 'react';

import Timerbar from '../Timerbar';
import Counter from '../Counter';

import questionHelper from '../../../../../../utils/questionHelper';

const ExamHeader = ({
  timerSeconds,
  timerHandler,
  timerMaxSeconds,
  hasTimeLimit,
  isShowCommentary,
  isTimerExceeded,
  response,
  preventTimerUpdateConditions,
  totalQuestionCount,
  getCurrentQuestionNumber,
  retry,
}) => {
  const isDisappearedTimer = !hasTimeLimit || isShowCommentary;

  const percentage = questionHelper.calculateTimerPercentage(
    isDisappearedTimer,
    timerSeconds,
    timerMaxSeconds
  );

  const preventTimerUpdate =
    preventTimerUpdateConditions || isDisappearedTimer || response;

  const getTimerColorName = () => {
    if (isTimerExceeded || percentage <= 25) return 'progress-red';
    else if (percentage <= 50) return 'progress-orange';

    return 'secondary-40';
  };

  useEffect(() => {
    if (preventTimerUpdate) return;

    const reduceTimerSeconds = setTimeout(() => {
      timerHandler(timerSeconds - 1);
    }, 1000);

    return () => clearTimeout(reduceTimerSeconds);
  }, [preventTimerUpdate, timerSeconds]);

  return (
    <Fragment>
      <Timerbar
        colorName={getTimerColorName()}
        percentage={percentage}
        isShowCommentary={isShowCommentary}
        response={response}
        hasTimeLimit={hasTimeLimit}
      />
      <Counter
        current={getCurrentQuestionNumber()}
        max={totalQuestionCount}
        isDisappearedTimer={isDisappearedTimer}
        seconds={timerSeconds}
        colorName={getTimerColorName()}
        retry={retry}
      />
    </Fragment>
  );
};

export default ExamHeader;
