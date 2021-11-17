import React, { useEffect, Fragment } from 'react';
import { isMobileSafari } from 'react-device-detect';

import inputBoxConstants from './inputBoxConstants';

const InputField = ({
  wordLength,
  answer,
  setIsShowfooter,
  typing,
  correctAnswer,
  learningType,
  tagIdentifier,
  tagValues,
}) => {
  const typingArray = typing.split('');
  const typingLength = typing.length;

  useEffect(() => {
    if (isMobileSafari) {
      setIsShowfooter(true);
    }
  },[]);

  const displayLines = (index = null, updatedWordLength = null) => {
    const finalWordLength = !updatedWordLength ? wordLength : updatedWordLength;
    return [...Array(finalWordLength)].map((e, i) => {
      let order = i === 0 ? 'first' : i === finalWordLength - 1 ? 'last' : 'between';

      return (
        <span
          className={`inline-block ${inputBoxConstants.inputBoxClass(typingLength)}`}
          key={index ? `${index}${i}` : i}
          style={inputBoxConstants.inputBoxStyle(wordLength, order)}
        >
          {answer[i] ? answer[i] : `\xa0`}
        </span>
      );
    });
  };

  const displayLinesWithTagsForWords = (titleArray, correctAnswerIndex, updatedWordLength) => {
    return titleArray.map((preposition, index) => {
      let items = [];
      if ((correctAnswerIndex == 0 && index == correctAnswerIndex) || index == correctAnswerIndex) {
        items.push(tagPositioning(updatedWordLength));
      } else {
        items.push([
          <span
            className={`inline-block ${inputBoxConstants.prepositionClass(typingLength)}`}
            key={index}
            style={inputBoxConstants.prepositionStyle(index)}
          >
            {preposition}
          </span>
        ]);
      }
      return items;
    });
  };

  const tagPositioning = (updatedWordLength) => {
    if (tagIdentifier.tagType === 'start') {
      return (
        <Fragment>
          {displayTagValues()}
          {[...Array(updatedWordLength)].map((a, i) => {
            return (
              <span
                className={`inline-block ${inputBoxConstants.inputBoxClass(typingLength)}`}
                key={i}
                style={inputBoxConstants.inputBoxStyle(wordLength)}
              >
                {answer[i] ? answer[i] : `\xa0`}
              </span>
            );
          })}
        </Fragment>
      );
    }
    if (tagIdentifier.tagType === 'end') {
      return (
        <Fragment>
          {[...Array(updatedWordLength)].map((a, i) => {
            return (
              <span
                className={`inline-block ${inputBoxConstants.inputBoxClass(typingLength)}`}
                key={i}
                style={inputBoxConstants.inputBoxStyle(wordLength)}
              >
                {answer[i] ? answer[i] : `\xa0`}
              </span>
            );
          })}
          {displayTagValues()}
        </Fragment>
      );
    }
    if (tagIdentifier.tagType === 'middle') {
      return (
        <Fragment>
          {displayPrevTagLines()}
          {displayTagValues()}
          {displayAfterTagLines()}
        </Fragment>
      );
    }
  };

  const displayTagValues = () => {
    return tagValues.map((t, i) => {
      return (
        <span
          className={`inline-block ${inputBoxConstants.inputBoxClass(typingLength)}`}
          style={inputBoxConstants.tagStyle(wordLength)}
          key={i}
        >
          {t.value}
        </span>
      );
    });
  };

  const displayPrevTagLines = () => {
    let lines = [];
    for (let index = 0; index < typingArray.length; index++) {
      if (index > tagIdentifier.prevIndex) break;

      lines.push(
        <span
          className={`inline-block ${inputBoxConstants.inputBoxClass(typingLength)}`}
          key={index}
          style={inputBoxConstants.inputBoxStyle(wordLength)}
        >
          {answer[index] ? answer[index] : `\xa0`}
        </span>
      );
    }
    return lines.map((line, i) => {
      return line;
    });
  };

  const displayAfterTagLines = () => {
    let lines = [];
    let ansCounter = tagIdentifier.prevIndex + 1;
    let wordsCount = typing.split(' ').length;
    let wordArray = (wordsCount == 1) ? typing.split('') : correctAnswer.split('');
    for (let index = 0; index < wordArray.length; index++) {
      if (index > tagIdentifier.prevIndex + tagIdentifier.tagTotal) {
        lines.push(
          <span
            className={`inline-block ${inputBoxConstants.inputBoxClass(typingLength)}`}
            key={index}
            style={inputBoxConstants.inputBoxStyle(wordLength)}
          >
            {answer[ansCounter] ? answer[ansCounter] : `\xa0`}
          </span>
        );
        ansCounter++;
      }
    }
    return lines.map((line, i) => {
      return line;
    });
  };

  const displayItems = () => {
    const titleArray = typing.toLowerCase().split(' ');
    const correctAnswerIndex = titleArray.indexOf(correctAnswer.toLowerCase());

    // For phrases and words that has no tags and has no prepositions
    if ((typing.toLowerCase() === correctAnswer.toLowerCase() && learningType == 'word') && !tagIdentifier) {
      return displayLines();
    }

    const updatedWordLength = (tagIdentifier) ? wordLength - tagIdentifier.tagTotal : 0;
    // For phrases that have tags
    if (tagIdentifier && learningType == 'phrase') {
      return tagPositioning(updatedWordLength);
    }
    // For words that have tags && prepositions OR tags only (1 word or more)
    if (tagIdentifier && learningType == 'word') {
      return displayLinesWithTagsForWords(titleArray, correctAnswerIndex, updatedWordLength);
    }

    // For words that has no tags but has prepositions
    return titleArray.map((preposition, index) => {
      let items = [];
      let order =
        index === 0 ? 'first' : index === titleArray.length - 1 ? 'last' : 'between';

      if ((correctAnswerIndex == 0 && index == correctAnswerIndex) || index == correctAnswerIndex) {
        items.push(displayLines(index, correctAnswer.length));
      } else {
        items.push([
          <span
            className={`inline-block ${inputBoxConstants.prepositionClass(typingLength)}`}
            key={index}
            style={inputBoxConstants.prepositionStyle(index, order)}
          >
            {preposition}
          </span>
        ]);
      }
      return items;
    });
  };

  return (
    <div className='align-center'>
      {displayItems()}
    </div>
  );
};

export default InputField;
