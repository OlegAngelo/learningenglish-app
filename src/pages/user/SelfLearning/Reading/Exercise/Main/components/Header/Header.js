import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../../../../shared/Header';
import HeaderClose from '../../../../../../../../shared/Header/Close';
import Counter from '../../../../../components/Counter';
import Timerbar from '../../../../../components/Timerbar';

import { setTimer } from '../../../../../../../../redux/selfLearning/reading/exercise/slice';
import { calculateTimerPercentage } from '../../../../../../../../utils/readingExerciseHelper';

const Main = ({contentType}) => {
  const dispatch = useDispatch();
  const [interrupted, setInterrupted] = useState(false);
  const {
    timer,
    maxTimer,
    level,
    timerWasStopped,
  } = useSelector(state => state.selfLearningReadingExercise);
  
  const percentage = calculateTimerPercentage(
    false,
    timer,
    maxTimer
  );

  useEffect(() => {
    if (timer === null || timer <= 0 || contentType === 'preview' || interrupted) return;

    const reduceTimerSeconds = setTimeout(() => {
      dispatch(setTimer({
        timer: timer - 1,
        maxTimer,
      }));
    }, 1000);

    return () => clearTimeout(reduceTimerSeconds);
  }, [timer, contentType, interrupted]);

  return (
    <div className="fixed top-0 z-20 w-screen">
      <Header
        title={`Level ${level.order} Reading`}
        hasBack={
          contentType === 'preview' &&
          `/self-learning/reading/${localStorage.getItem('set_id')}/exercise`
        }
        forcedUrl={`/self-learning/reading/${level.order}/list`}
      >
        {contentType === 'reading' && (
          <HeaderClose
            setInterrupted={setInterrupted}
            resetExamState={() => {}}
            isFromSLReading
          />
        )}
      </Header>
      {contentType !== 'preview' && (
        <Fragment>
          <div className="bg-background-200">
            <Timerbar
              colorName="secondary-500"
              percentage={percentage}
              isShowCommentary={false}
              response={false}
              hasTimeLimit={true}
              stopTimer={timerWasStopped}
            />
            <Counter
              showNumOfQuestions={false}
              isDisappearedTimer={false}
              seconds={timer}
              colorName="secondary-40"
              retry={false}
              stopTimer={timerWasStopped}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Main;
