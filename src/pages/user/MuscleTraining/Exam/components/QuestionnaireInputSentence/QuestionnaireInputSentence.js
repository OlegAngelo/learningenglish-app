import React, { Fragment, useEffect, useState } from 'react';

import SoftKeyboard from '../../../../../../shared/SoftKeyboard';
import WordHint from '../Hint/WordHint';

import inputBoxConstants from './inputBoxConstants';
import questionHelper from '../../../../../../utils/questionHelper';

import style from './QuestionnaireInputSentence.module.css';

const QuestionnaireInputSentence = ({
  categories,
  resultMessage,
  hint,
  questionItem,
  response,
  timerProps,
  setResponse,
  setAnswers,
  setSelected,
}) => {
  const correctAnswer = questionHelper.formatQuestionSentence(questionItem.title);
  const possibleAnswers = [
    correctAnswer.toLowerCase(),
    questionHelper.formatQuestionSentence(questionItem.full_answer).toLowerCase()
  ];
  const [answer, setAnswer] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);
  const [responseType, setResponseType] = useState('default');
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    if (responseType != 'default' && timerProps.seconds != 0) {
      setResponseMsg(responseType === 'correct' ? resultMessage : 'Failed...');
      setResponse(responseType === 'correct' ? 'Excellent!!' : 'Failed...');
      setSelected(answer);
      setAnswers((answers) => [
        ...answers,
        {
          id: questionItem.id,
          type: categories,
          choice_id: null,
          input_spelling: answer,
          voice_text: null,
          voice_accuracy_rate: null,
          is_used_hint: !!hint?.length,
          is_skipped: false,
          is_correct: responseType === 'correct',
        },
      ]);
    }
  }, [responseType]);

  useEffect(() => {
    if (timerProps.seconds === 0) {
      setResponseMsg('Failed...');
    }
  }, [timerProps]);

  const onPressEnterKey = (answer) => {
    // convert into valid spaces for conditioning
    const formattedAnswer = answer.replace(/(?=\s)[^\r\n\t]/g, ' ');
    const isCorrect = correctAnswer.toLowerCase() === formattedAnswer.toLowerCase() || possibleAnswers.includes(formattedAnswer.toLowerCase());
    const answerEvaluation = isCorrect ? 'correct' : 'incorrect';

    setAnswer(formattedAnswer);
    setResponseType(answerEvaluation);
    setCursorBlink(false);
  };

  useEffect(() => {
    if (response) {
      setCursorBlink(false);
    }

    if (response === 'Failed...') {
      setResponseType('incorrect');
    }
  }, [response]);

  return (
    <div>
      {/* Display correct answer after user press enter key */}
      <div
        className={`${style.responseContainer} ${hint ? 'mb-px-6 pb-px-14' : ''} inline-block w-full`}>
        {response ? (
          <Fragment>
            <p className={`text-18 text-basic-100 font-normal mx-px-20 pt-px-15 ${style.correctAnswer}`}>
              {correctAnswer}
            </p>

            <div
              className={`text-24 text-center font-black -mt-px-3 ${style.response}`}
              style={{ color: questionHelper.getResponseColor(responseMsg) }}
            >
              {responseMsg}
            </div>
          </Fragment>
        ) : (
          hint && (
            <WordHint className="pt-px-10" hint={hint} correctAnswer={correctAnswer} />
          )
        )}
      </div>

      <p
        className={`${style.inputContainer} py-px-14 text-20 font-bold bg-basic-400 text-basic-100 px-px-16 mx-px-10 relative shadow-btn-choice rounded outline-none whitespace-pre-wrap ${style.textFormat}`}
        style={{ border: inputBoxConstants[responseType].borderStyle }}
      >
        <span className="pb-px-3">{answer.replace(/(?=\s)[^\r\n\t]/g, ' ')}</span>
        {cursorBlink && (
          <span className={`-mt-px-7 ml-px-3 ${style.cursorBlink}`}>|</span>
        )}
      </p>

      {/* Display SoftKeyboard if user has not pressed enter key */}
      
      {!response && (
        <div className="mb-px-100">
          <SoftKeyboard
            answer={answer}
            setAnswer={setAnswer}
            wordLength={correctAnswer.length}
            submitHandler={onPressEnterKey}
            categories={categories}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionnaireInputSentence;
