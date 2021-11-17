import React, { useEffect, Fragment, useContext } from 'react';

import QuestionnaireInputSentence from '../../components/QuestionnaireInputSentence';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import questionHelper from '../../../../../../utils/questionHelper';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import style from './SentenceTypingQuestion.module.css';

const SentenceTypingQuestion = () => {
  const {
    categories,
    checkAnswer,
    resultMessage,
    questionItem,
    footerProps,
    isAudioPlaying,
    setFooterProps,
    setAnswers,
    setSelected,
    isShowCommentary,
    response,
    timerProps,
    setResponse,
    setSentence,
    hint,
    play,
  } = useContext(QuestionWrapperContext);
  const japaneseTitle = questionItem.translation;
  const correctAnswer = questionHelper.formatQuestionSentence(questionItem.title);

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: !response,
      hasNext: response,
      hasSkip: !response,
      hasSpeaker: false,
    });
  }, [response]);

  return (
    <div>
      {isShowCommentary ? (
        <Fragment>
          <div className={`mx-px-24 inline-block ${style.titleContainer} ${style.titleMargin}`}>
            <p className="text-24 text-basic-100 -mt-px-23">{correctAnswer}</p>
            <p className="text-14 text-basic-100 mt-px-16">{questionItem.translation}</p>
          </div>

          <div className="flex justify-center pt-px-19">
            <button
              onClick={() => play(categories)}
              disabled={isAudioPlaying}
              className="disabled:opacity-50"
            >
              <SpeakerIcon width="25" height="24" className="text-center" />
              <div className="text-8 text-center text-primary-400 font-bold mt-px-4">
                問題を再生
              </div>
            </button>
          </div>

          <div className={`mx-px-8 p-px-16 bg-basic-400 rounded mb-px-80 ${style.commentaryDescription}`}>
            <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
              解説
            </p>
            <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 whitespace-pre-wrap ${style.textFormat}`}>
              {questionItem.description}
            </p>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div>
            {!response && (
              <p className="h-px-23 mx-2 font-bold text-16 leading-px-23 text-center text-primary-500">
                日本語を英語に訳しましょう
              </p>
            )}
          </div>

          <p className={`${style.itemQuestion} min-h-px-72 mx-6 text-24 text-basic-100 mt-px-37`}>
            {japaneseTitle}
          </p>
          <div>
            <QuestionnaireInputSentence
              checkAnswer={checkAnswer}
              categories={categories}
              questionItem={questionItem}
              response={response}
              setSentence={setSentence}
              hint={hint}
              key={questionItem.id}
              timerProps={timerProps}
              setResponse={setResponse}
              setAnswers={setAnswers}
              setSelected={setSelected}
              resultMessage={resultMessage}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SentenceTypingQuestion;
