import React from 'react';
import PolygonIcon from '../../../../../../../../shared/icons/PolygonIcon';

import styles from './SingleQuestion.module.css';

const SingleQuestion = ({ firstDialogue, secondDialogue, hasPolygon = true, className = '', state }) => {
  return (
    <div className={`px-4 text-basic-100 ${state === 'feedback' ? 'bg-secondary-500 mt-px-2' : 'bg-white mt-px-18'} ${className} ${styles.singleQuestionCard}`}>
      { state === 'feedback' && (
        <div className={`text-24 text-center font-black text-secondary-500 ${styles.evaluationMessage}`}>
          Excellent!!
        </div>
      )}
      <div className="flex justify-center">
        <div className={`${styles.firstDialogue} text-16 font-bold pt-px-1 ${styles.firstDialogue}`}>
          {firstDialogue}
        </div>
      </div>
      <div className={`flex justify-center`}>
        <div className={`${styles.secondDialogue} text-14 font-normal whitespace-pre-line text-center ${firstDialogue === null ? 'pt-px-8' : styles.secondDialogue }`}>
          {secondDialogue}
        </div>
      </div>
      {
        ( hasPolygon && (
          <div className={`mt-px-5 flex justify-center ${styles.icon}`}>
            <PolygonIcon width="30" height="28" color={state === 'feedback' ? '#03DAC6' : '#FFFFFF'} />
          </div>)
        )
      }
    </div>
  );
};

export default SingleQuestion;
