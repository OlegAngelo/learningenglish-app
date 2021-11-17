import React, { Fragment } from 'react';

import LightBulbIcon from '../../../../../../shared/icons/LightBulb';

import styles from './LetterHint.module.css';

const LetterHint = ({
  hint,
  wordLength,
  className,
  typing,
  correctAnswer,
  learningType,
}) => {
  const hintLength = hint.length;
  
  const dashedStyle = (wordLength) => {
    const charWidth = 1;
    const gap = 0.5;
    const inWidth = wordLength * (charWidth + gap);

    return {
      fontSize: '24px',
      width: `${inWidth + 2.1}ch`,
      background: `repeating-linear-gradient(
        90deg,
        #044071 0,
        #044071 ${charWidth}ch,
        transparent 0,
        transparent ${charWidth + gap}ch) 50% 100% / ${inWidth - gap}ch 2px no-repeat
      `,
      letterSpacing: `${gap}ch`,
      pointerEvents: 'none',
      marginLeft: `-17px`,
    };
  }
  
  const prepositionStyle = (index) => {
    return {
      fontSize: '24px',
      letterSpacing: '8px',
      textAlign: 'center',
      marginRight: index == 0 ? '3px' : '8px',
      marginLeft: index == 0 ? '0px' : '10px',
      fontFamily: 'SF Pro Text',
      lineHeight: '30px',
    };
  }

  const displayLines = (index = null) => {
    return (
      <Fragment>
        {hint.split("").map((char, i) => (
          <span
            key={index ? `${index}${i}`: i}
            className={`${styles.hintField}`}
          >
            {char}
          </span>
        ))}
        <input
          className="block border-none p-0 text-primary-500 w-full -mr-px-15"
          maxLength={wordLength-hintLength}
          type="text"
          style={dashedStyle(wordLength-hintLength)}
          spellCheck="false"
        />
      </Fragment>
    );
  };

  const displayHint = () => {
    if ((typing.toLowerCase() === correctAnswer.toLowerCase() && learningType == 'word') || learningType == 'phrase') return displayLines();

    const prepositions = typing.toLowerCase().split(correctAnswer);
    const titleArray = typing.toLowerCase().split(' ');
    const correctAnswerIndex = titleArray.indexOf(correctAnswer);

    return prepositions.map((preposition, index) => {
      let items = [
        <span
          className="inline-block mt-px-3"
          key={index}
          style={prepositionStyle(index)}
        >
          {preposition}
        </span>
      ];

      /**
       * Display lines if:
       * Correct answer is the first word in phrase or
       * Correct answer index is between words (to display lines between words. this happens when there are 3 or more words)
       */
      if ((correctAnswerIndex == 0 && index == correctAnswerIndex) || index + 1 == correctAnswerIndex) items.push(displayLines(index));
      return items;
    });
  };

  return (
    <div className={className}>
      <div className="flex justify-center -mt-px-27 mb-px-27">
        <LightBulbIcon width="13" height="15" className="mt-px-10" />
        <div className="font-sf-pro-text text-primary-500 text-24 pl-px-8 flex flex-row">
          {displayHint()}
        </div>
      </div>
    </div>
  );
};

export default LetterHint;
