import React, { useEffect, useMemo, useContext } from 'react';

import {
  getAnswer,
  getSentence,
  getTagValues,
  getTagIdentifier
} from '../../../../../../utils/text';

import QuestionnaireInputBox from '../../components/QuestionnaireInputBox';
import QuestionSentence from '../../components/QuestionSentence';
import LetterHint from '../../components/Hint/LetterHint';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import questionHelper from '../../../../../../utils/questionHelper';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './WordTypingQuestion.module.css';

const WordTypingQuestion = () => {
  const {
    footerProps,
    setFooterProps,
    timerProps,
    isShowCommentary,
    response,
    setResponse,
    questionItem,
    setAnswers,
    checkAnswer,
    resultMessage,
    setIsShowfooter,
    setSelected,
    categories,
    hint,
    isAudioEnded,
    isAudioPlaying,
    AudioErrorModal,
    play,
    learningType,
  } = useContext(QuestionWrapperContext);
  const {
    title,
    jp_title: japaneseQuestion,
    choices,
    translation,
    description,
    typing,
  } = questionItem;

  const sessionQuestion = '空所にあてはまる英語を選択しましょう';
  const correctAnswer = choices.filter((item) => item.is_correct)[0].blank_item;
  const wordLength = correctAnswer.length;
  const titleFormatted = questionHelper.formatQuestionSentence(title);

  const questionInfo = useMemo(
    () => ({
      answer: getAnswer(title.replace(/"/g, '')),
      sentence: getSentence(title.replace(/"/g, '')),
    }),
    [questionItem]
  );

  const tagIdentifier = getTagIdentifier(questionInfo.sentence);
  const tagValues = getTagValues(tagIdentifier, typing.split(''));

  const handleAnswer = (value) => {
    questionInfo.sentence.map((word) => {
      if (word.type === 'answer') {
        word.displayed = value;
        word.correct = value.toLowerCase() === correctAnswer.toLowerCase();
        word.selected = true;
      }
      return word;
    });
  };

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: !response,
      hasNext: response && true,
      hasSpeaker: false,
      hasSkip: !response,
    });
  }, [response]);

  return (
    <div>
      <AudioErrorModal />
      <p className={`mx-px-8 font-bold text-center text-primary-500 ${styles.instructionContainer}`}>
        {!response && sessionQuestion}
      </p>
      <div
        className={`${
          isShowCommentary ? `mx-px-24` : `mx-px-16`
        } mt-px-25 text-basic-100 ${styles.questionContainer}`}
      >
        <div className={styles.reduceTopSpaceOfQuestionSentence}>
          <QuestionSentence
            onCommentaryPage={isShowCommentary}
            onResponsePage={response}
            typing={typing}
            sentence={questionInfo.sentence}
            hasTyped={response !== 'Failed...' && response}
            fullQuestion={questionItem.voice_utterance}
            isTimerEnded={timerProps.seconds == 0}
            hint={hint}
            category={categories}
            withStyleCommentary
          />
          <div
            className={`
            ${isShowCommentary ? 'pt-px-8' : 'pt-px-16'}
            text-14 font-hiraginotext-basic-100
            ${styles.translateLineHeight}`}
          >
            {questionItem.translation}
          </div>
        </div>
      </div>
      <p className="mx-px-25 mt-px-14 text-14 leading-px-24 text-basic-100">
        {japaneseQuestion}
      </p>
      {!response && hint && (
        <LetterHint
          className="pt-px-16 -mb-px-23"
          hint={hint}
          wordLength={wordLength}
          typing={typing}
          correctAnswer={correctAnswer}
          learningType={learningType}
        />
      )}
      {isShowCommentary ? (
        <div>
          <div className="pt-px-21 flex justify-center">
            <button
              onClick={() => play(categories)}
              disabled={isAudioPlaying}
              className="disabled:opacity-50"
            >
              <SpeakerIcon width="25" height="24" className={`text-center`}/>
              <div className={`text-8 text-center text-primary-400 font-bold mt-px-4`}>
                問題を再生
              </div>
            </button>
          </div>
          <div className="mx-2 pt-px-65 mt-3 pb-px-36">
            <div className={`mb-px-8 mt-px-37 p-px-16 bg-basic-400 rounded`}>
              <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
                解説
              </p>
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 whitespace-pre-wrap ${styles.textFormat}`}>
                {description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <QuestionnaireInputBox
          className="mt-0 mb-4"
          color="bg-basic-400"
          correctAnswer={correctAnswer}
          response={response}
          setResponse={setResponse}
          textColor="#141414"
          wordLength={wordLength}
          handleAnswer={handleAnswer}
          key={questionItem.id}
          setAnswers={setAnswers}
          questionId={questionItem.id}
          checkAnswer={checkAnswer}
          resultMessage={resultMessage}
          timerProps={timerProps}
          setIsShowfooter={setIsShowfooter}
          setSelected={setSelected}
          categories={categories}
          hint={hint}
          typing={typing}
          learningType={learningType}
          tagIdentifier={tagIdentifier}
          tagValues={tagValues}
        />
      )}
    </div>
  );
};

export default WordTypingQuestion;
