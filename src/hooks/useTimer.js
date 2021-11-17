import {useEffect, useState} from 'react';
import questionTypeTimer from '../config/questionTypeTimer.json';

const useTimer = () => {
  const [timerMaxSeconds, setTimerMaxSeconds] = useState(20);
  const [timerSeconds, setTimerSeconds] = useState(timerMaxSeconds);

  // this is commented temporarily
  // const [questionType, setQuestionType] = useState('');
  // const [shouldStart, setShouldStart] = useState(false);

  // Set Default Timer Depending on the Question Type Config
  // useEffect(() => {
  //   if (shouldStart) setTimerMaxSeconds(questionTypeTimer[questionType])
  // }, [])

  // useEffect(() => {
  //   startTimer(timerSeconds, setTimerSeconds);
  // }, [timerSeconds])


  // Pure Functions
  const startTimer = (startingTime, callback) => {
    const reduceTimerSeconds = setTimeout(() => {
      callback(startingTime - 1);
    }, 1000);

    return () => clearTimeout(reduceTimerSeconds);
  }

  // restart timer

  return {
    timerMaxSeconds,
    timerSeconds,
    setTimerSeconds,
    setTimerMaxSeconds
  };
}

export default useTimer;
