import React, { useState } from 'react';

import Greetings from './components/Greetings/';
import RatingButtons from './components/RatingButtons/RatingButtons';

import styles from './Completion.module.css';

const IntegratedLearningResult = () => {

  const [countdown, setCountdown] = useState(3);
  const firstButtonText = "集中度MAX!";
  const secondButtonText = "まぁまぁ集中";
  const thirdButtonText = "あまり集中できなかった";

  if (countdown > 0) {
    return <Greetings {...{ countdown, setCountdown }} />;
  }

  return (
    <div className="absolute z-20 h-full w-full bg-primary-500" >
      <div className="text-center text-basic-400">
        <span className={`${styles.surveyText} absolute font-bold font-hiragino text-20`} >
          学習の集中度は？
        </span>
        <div className={`${styles.buttonGroup} absolute`} >
          <RatingButtons className="pb-4" buttonText={firstButtonText} />
          <RatingButtons className="pb-4" buttonText={secondButtonText} />
          <RatingButtons buttonText={thirdButtonText} />
        </div>
      </div>
    </div>
  );
};

export default IntegratedLearningResult;
