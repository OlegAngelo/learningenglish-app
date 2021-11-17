import React from 'react';
import { includesCapitalLetters } from '../../../../../../utils/text';

import styles from './QuestionnaireFeedback.module.css';

const QuestionnaireFeedback = ({
  topText,
  bottomText ,
  answer ,
  className = 'mt-6',
  upperTextClass = 'text-24',
  bottomTextClass = 'text-24',
  response,
  timerProps = null,
  correctAnswer,
}) => {
  // Convert to lower case when amount of capital letters in topText is under 2.
  const formattedTopText = includesCapitalLetters(topText, 2) ? topText : topText.toLowerCase();

  const horizontalLineChecker = (answer) => {
    if (timerProps) {
      if (timerProps.seconds === 0) {
        return 'incorrect';
      }
    }

    // This is to handle special space character `\xa0`
    answer = answer.replace(/(?=\s)[^\r\n\t]/g, ' ');

    return (answer === bottomText || answer === correctAnswer.toLowerCase()) && response != "Failed..."
      ? 'correct'
      : 'incorrect';
  };

  return (
    <div className={`mx-2 text-center ${className}`}>
      <div className="text-basic-100">
        <div className={`text-24 ${upperTextClass}`}>{formattedTopText}</div>
        <div className={`w-full ${styles.horizontalLine} ${styles[`${horizontalLineChecker(answer.toLowerCase())}Line`]}`} />
        <div className={`${bottomTextClass} ${styles.correctAnswer}`}>{bottomText}</div>
      </div>
    </div>
  );
};

export default QuestionnaireFeedback;
