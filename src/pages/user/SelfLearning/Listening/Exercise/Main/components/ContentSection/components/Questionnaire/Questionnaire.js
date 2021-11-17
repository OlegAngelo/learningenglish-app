import React, { useEffect, Fragment, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import QuestionnaireFeedback from '../QuestionnaireFeedback';
import Button from '../../../../../../../../../../shared/Button';
import InputWordLines from '../../../../../../../components/InputWordLines';
import ProceedFooter from '../ProceedFooter';
import SoftKeyboard from '../../../../../../../../../../shared/SoftKeyboard';

import exerciseConstants from '../../exerciseConstants';

import useInputWordLines from '../../../../../../../components/InputWordLines/useInputWordLines';
import useSLListeningExercise from '../../../useSLListeningExercise';

import {
  setCorrectLines,
} from '../../../../../../../../../../redux/selfLearning/inputWordLines/slice';

import { log } from '../../../../../../../../../../utils/loggerHelper';

import style from '../../ContentSection.module.css';
import AudioContext from '../../audioContext';

const Questionnaire = () => {
  const dispatch = useDispatch();
  const {
    currentState,
    setCurrentState,
    correctAnswer,
    level,
    answer,
    onPressEnterKey,
    setAnswer,
    preSentence,
    postSentence,
    showKeyboard, 
    setShowKeyboard,
    setSticky
  } = useContext(AudioContext);

  const {
    areAllLinesFilled,
    backwardActiveLineIndex,
    forwardActiveLineIndex,
    onChangeLineValue,
    getAnswers,
  } = useInputWordLines();

  const { hasUsedPunctuationMark, skipQuestion } = useSLListeningExercise();

  const onPressEnterKeyHandler = () => {
    if (areAllLinesFilled) onPressEnterKey(getAnswers());
  };

  // event listener when skip or next icon was tapped
  const onProceedClick = (params) => {
    setCurrentState('resultWithSpeakingDisabled');
    skipQuestion();
  }

  useEffect(() => {
    log('correct answer ==> ', correctAnswer);
    const sentence = hasUsedPunctuationMark ? correctAnswer : correctAnswer.slice(0, -1);
    const punctuationsChecker = sentence.replace(/[^.]/g, '').length > 1;
    dispatch(setCorrectLines(punctuationsChecker ? sentence.split(' ') : sentence.replace(/[.,:!?]/g, "").split(' ')));
  }, [correctAnswer]);

  return (
    <div className="bg-background-200 flex-1 pb-px-20">
      {exerciseConstants.isTypingStates.includes(currentState) && (
        <Fragment>
          {/* # Fill in the blanks */}
          <div
            className="relative mt-px-14 mx-px-8 p-px-24 bg-white shadow-btn-choice"
          >
            { ['3','4'].includes(level) && <div className="text-12 text-basic-100 mb-px-24">{ preSentence }</div> }
            <InputWordLines
              sentence={correctAnswer}
              value={answer}
              hasUsedPunctuationMark={hasUsedPunctuationMark}
            />
            { ['3','4'].includes(level) && <div className="text-12 text-basic-100 mt-px-24">{ postSentence }</div> }
          </div>

        </Fragment>
      )}

      {exerciseConstants.isResultStates.includes(currentState) && (
        <QuestionnaireFeedback />
      )}

      {currentState === 'shadowing' && (
        <div className={`flex justify-center ${style.btnDiv}`}>
          <Button
            innerClass={style.btn}
            type="white-square-wider"
            onClick={(e) => {
              e.target.blur();
              setCurrentState('completeEnglishSentence');
            }}
          >
            NEXT
          </Button>
        </div>
      )}
    
      {exerciseConstants.isTypingStates.includes(currentState) && (
        <div className={`fixed bottom-0 pb-px-72 bg-background-200 border-t botder-primary-100 w-full ${!showKeyboard && 'hidden'}`}>
          <SoftKeyboard
            answer={answer}
            setAnswer={setAnswer}
            wordLength={correctAnswer.length - 1}
            submitHandler={onPressEnterKeyHandler}
            categories="self-learning"
            canSubmit={areAllLinesFilled}
            onPressHandler={onChangeLineValue}
            leftArrowOnClick={backwardActiveLineIndex}
            rightArrowOnClick={forwardActiveLineIndex}
            hasArrowKeys
            removeKeys={['space', ',']}
            firstLetterCapital
          />
        </div>
      )}
      
      <ProceedFooter
        isSkippable={true}
        hide={currentState !== 'completeEnglishSentence'}
        hideIcon={areAllLinesFilled}
        onClickHandler={onProceedClick}
        showKeyboardFunc={() => {
          setSticky(false);
          setShowKeyboard(!showKeyboard)
        }}
        showKeyboard={showKeyboard}
        withKeyboardIcon
      />
    </div>
  );
};

export default Questionnaire;
