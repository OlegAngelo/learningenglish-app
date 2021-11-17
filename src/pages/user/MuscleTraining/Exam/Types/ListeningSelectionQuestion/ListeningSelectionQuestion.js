import React, { Fragment, useEffect, useContext } from 'react';

import QuestionSpeakerPlayer from '../../components/QuestionSpeakerPlayer';
import QuestionnaireItem from '../../components/QuestionnaireItem';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import questionHelper from '../../../../../../utils/questionHelper';
import { checkAnswer, isIncorrectChoice } from '../../../../../../utils/validationHelper';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './ListeningSelectionQuestion.module.css';

const ListeningSelectionQuestion = () => {
  const {
    footerProps,
    setFooterProps,
    isShowCommentary,
    response,
    setResponse,
    selected,
    setSelected,
    questionItem,
    setAnswers,
    timerProps,
    resultMessage,
    categories,
    isAudioEnded,
    isAudioPlaying,
    AudioErrorModal,
    play,
  } = useContext(QuestionWrapperContext);
  const { description, choices, pronunciation_point: pronuncationTips } = questionItem;
  const correctChoice = choices.filter(item => item.is_correct)[0];
  const learningType = choices[0];
  const playBackQuestion = '問題を再生';

  const handleAnswerOptionClick = (choice) => {
    if (selected) return;

    setSelected(choice.jp_item);
    setResponse(checkAnswer(choice.is_correct, timerProps) ? resultMessage : 'Failed...');
    setAnswers((answers) => [
      ...answers,
      questionHelper.generateQuestionResult(
        categories,
        questionItem.id,
        choice.id
      ),
    ]);
  };

  const sessionQuestion = () => {
    if (learningType.training_word_id) {
      return "音声を聞いて、読まれた単語の意味を選択しましょう";
    } else if (learningType.training_phrase_id) {
      return "音声を聞いて、読まれた英語の意味を選択しましょう";
    }
  };

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: false,
      hasSpeaker: false,
      hasNext: response && true,
      hasSkip: !response,
    });
  }, [response]);

  return (
    <div className="w-full">
      <AudioErrorModal />
      {response
        ? (
          <div className="pt-px-10 text-basic-100">
            <p className="ml-px-16 mr-px-36 text-24 leading-px-36">{correctChoice.en_item}</p>
            <p className="mx-px-16 mt-px-16 text-14 leading-px-24">{correctChoice.jp_item}</p>
            {isShowCommentary ? (
              <div className='mt-px-20 text-center w-full'>
                <button
                  onClick={() => play(categories)}
                  disabled={isAudioPlaying}
                  className="disabled:opacity-50"
                >
                  <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                  <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                    {playBackQuestion}
                  </div>
                </button>
              </div>
            ) : (
              <Fragment>
                <QuestionSpeakerPlayer
                  className="my-px-16 w-full"
                  category={categories}
                  isAudioPlaying={isAudioPlaying}
                  play={play}
                  key={questionItem.id}
                  response={response}
                />
              </Fragment>
            )}
          </div>
        ) : (
          <Fragment>
            <p className="mx-px-8 font-bold text-16 leading-px-23 text-center text-primary-500">{sessionQuestion()}</p>
            <QuestionSpeakerPlayer
              className="mt-px-34 mb-px-16 h-px-96 w-px-96"
              category={categories}
              isAudioPlaying={isAudioPlaying}
              play={play}
              key={questionItem.id}
              response={response}
            />
          </Fragment>
        )
      }

      <div className={`mx-px-8 ${styles.contentContainer}`}>
        {isShowCommentary
          ? (
            <Fragment>
              <div className="mt-px-37 mb-px-8 p-px-16 bg-basic-400 rounded">
                <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">解説</p>
                <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 whitespace-pre-wrap ${styles.textFormat}`}>{description}</p>
              </div>
              {pronuncationTips && (
                <div className={`mb-px-60 p-px-16 ${styles.commentary} bg-basic-400 rounded`}>
                  <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">発音のポイント</p>
                  <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{pronuncationTips}</p>
                </div>
              )}
            </Fragment>
          ) : (
            isAudioEnded && (
              <div className="mb-2">
                <div
                  className={`text-24 leading-px-38 text-center font-black ${styles.response}`}
                  style={{ color: questionHelper.getResponseColor(response) }}
                  >
                    &nbsp;{response}
                  </div>
                  {choices.map((choice, key) => (
                    <QuestionnaireItem
                      key={key}
                      text={choice.jp_item}
                      onClick={() => handleAnswerOptionClick(choice)}
                      color={
                        selected && choice.is_correct
                          ? 'bg-secondary-500'
                          : 'bg-basic-400'
                      }
                      textColor={isIncorrectChoice(choice, selected) ? '#E34E42' : '#141414'}
                    />
                  ))}
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default ListeningSelectionQuestion;
