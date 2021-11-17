import React, { Fragment, useEffect, useContext } from 'react';

import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';
import QuestionnaireItem from '../../components/QuestionnaireItem';
import QuestionSpeakerPlayer from '../../components/QuestionSpeakerPlayer';

import questionHelper from '../../../../../../utils/questionHelper';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './PhraseEnglishSelectionQuestion.module.css';

const PhraseEnglishSelectionQuestion = () => {
  const {
    timerProps,
    footerProps,
    setFooterProps,
    isShowCommentary,
    response,
    setResponse,
    selected,
    setSelected,
    questionItem,
    setAnswers,
    checkAnswer,
    resultMessage,
    categories,
    AudioErrorModal,
    play,
    isAudioPlaying,
  } = useContext(QuestionWrapperContext);
  const {
    translation,
    description,
    choices,
    id,
    audio_file: audioFile,
    pronunciation_point: pronuncationTips,
  } = questionItem;
  const correctChoice = choices.filter((item) => item.is_correct)[0].en_item;
  const learningType = choices[0];
  const parsedTitle = translation.replace(/#★|☆#/g, '');
  const hasLongTitle = parsedTitle.length > 50;

  const handleAnswerOptionClick = (choice) => {
    if (selected) return;
    setSelected(choice.en_item);
    setResponse(
      checkAnswer(choice.is_correct, timerProps.seconds)
        ? resultMessage
        : 'Failed...'
    );
    setAnswers((answers) => [
      ...answers,
      questionHelper.generateQuestionResult(categories, id, choice.id),
    ]);
  };

  const sessionQuestion = () => {
    if (learningType.training_word_id) {
      return '単語の意味を選択しましょう';
    } else {
      return '日本語にあてはまる英語を選択しましょう';
    }
  };

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasSpeaker: false,
      hasNext: response && true,
      hasLightBulb: false,
      hasSkip: !response,
    });
  }, [response]);

  return (
    <div className="w-full">
      <AudioErrorModal />
      <p className="mx-2 font-semibold text-16 leading-px-23 text-center text-primary-500">
        {!response && sessionQuestion()}
      </p>
      <div className={`${styles.flexDirectionColumn}`}>
      <p
        className={`mx-6 text-basic-100 ${isShowCommentary && `order-2`} ${
          hasLongTitle && !isShowCommentary
            ? `leading-px-29 mt-px-15 text-20`
            : `${styles.englishQuestion} mt-px-34 ${isShowCommentary ? 'text-18' : 'text-24'}`
        }`}
      >
        {parsedTitle}
      </p>
      <p
        className={`${styles.correctChoice} mx-6 text-basic-100 ${isShowCommentary && `order-1`} ${
          hasLongTitle && response
            ? isShowCommentary ? 'text-24' : 'text-14'
            : isShowCommentary ? 'text-24' : 'text-18'
        }`}
      >
        {response && correctChoice}
      </p>
      </div>
      {isShowCommentary && audioFile ? (
        <div className="pt-px-21 flex justify-center">
          <button
            onClick={() => play(categories)}
            disabled={isAudioPlaying}
            className="disabled:opacity-50"
          >
            <SpeakerIcon width="25" height="24" className={`text-center`} />
            <div
              className={`text-8 text-center text-primary-400 font-bold mt-px-4`}
            >
              問題を再生
            </div>
          </button>
        </div>
      ) : (
        <div>
          {response && audioFile && (
            <div>
              <QuestionSpeakerPlayer
                className="my-px-16 w-full"
                category={categories}
                isAudioPlaying={isAudioPlaying}
                play={play}
                key={questionItem.id}
                response={response}
              />
            </div>
          )}
        </div>
      )}

      <div className={`mx-2 mb-4 ${styles.contentContainer} `}>
        {isShowCommentary ? (
          <Fragment>
            { description &&
              <div className="mt-px-38 mb-px-8 p-4 rounded bg-basic-400">
                <p
                  className={`mb-2 font-bold text-16 ${styles.commentaryTitle} text-primary-500`}
                >
                  解説
                </p>
                <p
                  className={`mb-px-18 text-14 ${styles.commentaryDescription} ${styles.textFormat} text-basic-100`}
                >
                  {description}
                </p>
              </div>
            }
            {pronuncationTips && (
              <div className="mb-px-60 p-px-16 bg-basic-400 rounded">
                <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
                  発音のポイント
                </p>
                <p
                  className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}
                >
                  {pronuncationTips}
                </p>
              </div>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div
              className={`h-px-38 text-24 leading-px-38 text-center font-black ${styles.response}`}
              style={{ color: questionHelper.getResponseColor(response) }}
            >
              &nbsp;{response}
            </div>
            <div className={response ? styles.responseChoices : styles.choiceContainer}>
              {choices.map((choice, key) => (
                <QuestionnaireItem
                  key={key}
                  text={choice.en_item}
                  onClick={() => handleAnswerOptionClick(choice)}
                  color={
                    selected && choice.is_correct
                      ? 'bg-secondary-500'
                      : 'bg-basic-400'
                  }
                  textColor={
                    questionHelper.isIncorrectChoice(
                      choice.en_item,
                      selected,
                      choice.is_correct
                    )
                      ? '#E34E42'
                      : '#141414'
                  }
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PhraseEnglishSelectionQuestion;
