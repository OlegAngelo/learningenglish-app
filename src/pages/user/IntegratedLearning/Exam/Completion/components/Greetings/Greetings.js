import React, { useEffect } from 'react';

import styles from './Greetings.module.css';

const Greetings = ({ countdown, setCountdown }) => {
  useEffect(() => {
    setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown, setCountdown]);

  return (
    <div className="absolute grid place-items-center h-full w-full bg-primary-500">
      <div className="mt-px-2 text-center text-basic-400">
        <div className={`${styles.topText} font-bold font-hiragino-kaku text-24`}>トレーニング終了</div>
        <div className={`${styles.bottomText} font-bold font-hiragino text-16 pt-px-12`}>Good Job！</div>
      </div>
    </div>
  );
};

export default Greetings;
