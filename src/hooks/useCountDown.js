import { useEffect, useState } from 'react';

const useCountDown = (props) => {
  const {
    seconds,
    shouldStart,
  } = props;
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    if (!shouldStart || countdown <= 0) return;
    setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown, shouldStart]);

  const doSomething = (func) => { func(); };

  const isCountdownScreen = countdown > 0;

  return {
    countdown,
    setCountdown,
    doSomething,
    isCountdownScreen
  };
};

export default useCountDown;
