import React, { useState, useEffect, Fragment } from 'react';

import InputField from './InputField';
import CorrectAnswer from './CorrectAnswer';
import IncorrectAnswer from './IncorrectAnswer';
import inputBoxConstants from './inputBoxConstants';
import QuestionnaireFeedback from '../QuestionnaireFeedback';
import questionHelper from '../../../../../../utils/questionHelper';
import SoftKeyboard from '../../../../../../shared/SoftKeyboard';

import styles from './QuestionnaireInputBox.module.css';

const QuestionnaireInputBox = ({
  className = 'mt-px-30',
  color,
  textColor,
  wordLength,
  correctAnswer,
  setResponse,
  setSelected,
  correctTranslation,
  correctTranslationClass,
  withFeedback,
  questionId,
  setAnswers,
  resultMessage,
  checkAnswer,
  timerProps,
  setIsShowfooter,
  categories,
  response,
  hint,
  children,
  typing,
  learningType,
  tagIdentifier,
  tagValues,
  handleAnswer = () => {}
}) => {
  const [displayType, setDisplayType] = useState(inputBoxConstants.input.type);
  const [answer, setAnswer] = useState('');
  const [answerWithNoTag, setAnswerWithNoTag] = useState('');
  const correctAnswerArray = correctAnswer.split('');
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [responseMsg, setResponseMsg] = useState('');

  const inputBoxComponents = {
    input: InputField,
    correct: CorrectAnswer,
    incorrect: IncorrectAnswer,
  };

  useEffect(() => {
    if(!response) {
      setDisplayType(inputBoxConstants.input.type);
      setAnswer('');
      setAnswerWithNoTag('');
      setIncorrectIndices([]);
      setResponseMsg('');
    }
  }, [response]);

  const DisplayField = inputBoxComponents[displayType];

  const getCompleteAnswer = (answer) => {
    let finalAnswer = '';
    let answerArray = answer.split('');
    answerArray = [...Array(wordLength - tagIdentifier.tagTotal)].map((e, i) => {
      let order = i;
      if (tagIdentifier.tagType === 'start') {
        order = tagIdentifier.tagTotal + i;
      }
      if (tagIdentifier.tagType === 'middle') {
        if (i > tagIdentifier.prevIndex) {
          order = tagIdentifier.tagTotal + i;
        }
      }
      return {
        order: order,
        value: answer[i] ? answer[i] : '',
      };
    });

    for (let i = 0; i < wordLength; i++) {
      let tagValue = tagValues.filter((tag) => tag.order == i);
      finalAnswer += (tagValue.length === 0)
        ? answerArray.filter((ans) => ans.order == i)[0].value
        : tagValue[0].value;
    }
    return finalAnswer;
  };

  const checkDifference = (answer) => {
    let finalAnswer = answer;
    const incorrects = [];
    
    if (tagIdentifier) {
      finalAnswer = getCompleteAnswer(answer);
      setAnswer(finalAnswer);
    }

    // This is to handle special space character `\xa0`
    const answerArray = finalAnswer.replace(/(?=\s)[^\r\n\t]/g, ' ').split('');

    correctAnswerArray.forEach((char, index) => {
      if (answerArray[index] == null) return;

      if (char.toLowerCase() !== answerArray[index].toLowerCase()) {
        incorrects.push(index);
      }
    });

    const isCorrect = answerArray.length === correctAnswerArray.length && incorrects.length === 0;
    const responseType = isCorrect ? 'correct' : 'incorrect';
    const response = inputBoxConstants[responseType].response;

    setIncorrectIndices(incorrects);
    setResponse(response);
    setDisplayType(responseType);
    setIsShowfooter(true);
    handleAnswer(finalAnswer);
    setSelected(finalAnswer);
    setAnswers(answers => [
      ...answers,
      questionHelper.generateQuestionResult(
        categories,
        questionId,
        finalAnswer,
        undefined,
        hint,
      ),
    ]);
  };

  const displayFieldProps = {
    wordLength,
    checkDifference,
    answer,
    incorrectIndices,
    setIsShowfooter,
    hint,
    typing,
    correctAnswer,
    learningType,
    tagIdentifier,
    tagValues,
    answerWithNoTag,
  };

  useEffect(() => {
    if (timerProps.seconds == 0) {
      setAnswer(correctAnswer);
      setIncorrectIndices([]);
      setResponse('Failed...');
      setDisplayType('incorrect');
      setResponseMsg('Failed...');
    }
  }, [timerProps.seconds]);

  useEffect(() => {
    if (displayType != 'input') {
      setResponseMsg(
        checkAnswer(displayType === 'correct', timerProps.seconds)
        ? resultMessage
        : 'Failed...'
      );
    }
  }, [displayType]);

  const getFeedbackFragment = (className = '') => {
    return (
      <Fragment>
        {!withFeedback || displayType === inputBoxConstants.input.type ? null : (
          <QuestionnaireFeedback
            className={`font-sf-pro-text ${className}`}
            correctAnswer={correctAnswer}
            bottomText={correctTranslation}
            answer={answer}
            bottomTextClass={correctTranslationClass}
            response={responseMsg}
            topText={typing}
          />
        )}
      </Fragment>
    );
  };

  const getInputBoxFragment = (params) => {
    return (
      <div
        style={{ backgroundColor: color, color: textColor }}
        className={`bg-basic-400 rounded text-14 h-px-88 -mb-2 mx-2 flex flex-col justify-center text-left focus:outline-none ${
          styles[`${displayType}Outline`]
        } ${styles.inputBox}`}
      >
        <div className="flex justify-center">
          <DisplayField {...displayFieldProps} />
        </div>
      </div>
    );
  };

  const getResponseMessageFragment = (params) => {
    return (
      <div className={categories != 'audio-typing' ? className : ''}>
        <div
          className={`${!response ? `hidden` : `visible`} text-24 text-center font-black ${styles.response}`}
          style={{ color: questionHelper.getResponseColor(responseMsg) }}
        >
          &nbsp;{responseMsg}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {children ? (
        <Fragment>
          {getFeedbackFragment()}
          {children}
          {getResponseMessageFragment()}
          {getInputBoxFragment()}
          {responseMsg === 'Try again!' ? getFeedbackFragment('mt-px-24') : ''}
        </Fragment>
      ) : (
        <Fragment>
          {getFeedbackFragment()}
          {getResponseMessageFragment()}
          {getInputBoxFragment()}
        </Fragment>
      )}

      {!responseMsg && (
        <div className={`${styles.softKeyboardWrapper} w-full`}>
          <SoftKeyboard
            answer={answer}
            setAnswer={setAnswer}
            wordLength={!tagIdentifier ? wordLength : wordLength - tagIdentifier.tagTotal}
            submitHandler={checkDifference}
            setAnswerWithNoTag={setAnswerWithNoTag}
            hasTagIdentifier={tagIdentifier ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionnaireInputBox;
