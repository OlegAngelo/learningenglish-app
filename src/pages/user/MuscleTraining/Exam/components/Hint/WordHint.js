import React, { Fragment } from 'react';

import LightBulbIcon from '../../../../../../shared/icons/LightBulb';

import styles from './WordHint.module.css';

const WordHint = ({ hint, correctAnswer, className }) => {
  const correctAnswerArray = correctAnswer.split(' ');
  const getWidthSize = (word) => {
    let charArray = word.split('');
    return charArray.length * 13;
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap text-left px-5">
        <div className="flex flex-wrap text-primary-500 text-18">
          <LightBulbIcon width="13" height="15" className="mt-px-3 mr-px-3" />
          {correctAnswerArray.map((word, index) =>
            hint[index] ? (
              <span className="mr-px-8 text-18" key={index}>
                {correctAnswerArray[index]}
              </span>
            ) : (
              <span
                className={`block border-b-2 p-0 text-primary-500 pt-px-25 mr-px-10 ${styles.wordHintBlank}`}
                style={{ width: getWidthSize(word) }}
                key={index}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WordHint;
