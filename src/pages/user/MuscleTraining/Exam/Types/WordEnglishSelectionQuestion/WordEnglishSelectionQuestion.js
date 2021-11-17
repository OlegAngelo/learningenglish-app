import React, { Fragment, useEffect, useContext } from 'react';

import QuestionnaireItem from '../../components/QuestionnaireItem';
import QuestionnaireFeedback from '../../components/QuestionnaireFeedback';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import questionHelper from '../../../../../../utils/questionHelper';
import { isIncorrectEnItemChoice } from '../../../../../../utils/validationHelper';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper';

import styles from './WordEnglishSelectionQuestion.module.css';

const WordEnglishSelectionQuestion = () => {
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
    checkAnswer,
    resultMessage,
    setAnswers,
    categories,
    AudioErrorModal,
    isAudioPlaying,
    play,
    playSentence
  } = useContext(QuestionWrapperContext)
  const correctChoice = questionItem.choices.filter(item => item.is_correct)[0].en_item;
  const correctChoiceTranslation = questionItem.choices.filter(item => item.is_correct)[0].jp_item;
  const commentary = questionItem.description;
  const exampleSentence = questionItem.example_sentence_jp;
  const parsedExampleSentence = exampleSentence.replace(/#★|☆#/g, '');
  const exampleSentenceTranslation = questionItem.example_sentence;
  const parsedExampleSentenceTranslation = exampleSentenceTranslation.replace(/#★|☆#/g, '');
  const pronuncationTips = questionItem.pronunciation_point;

  const handleAnswerOptionClick = ({ id, is_correct, en_item }) => {
    if (selected) return;

    setSelected(en_item);
    setResponse(checkAnswer(is_correct, timerProps.seconds) ? resultMessage : 'Failed...');
    setAnswers((answers) => [
      ...answers,
      questionHelper.generateQuestionResult(
        categories,
        questionItem.id,
        id,
      ),
    ]);
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
      {isShowCommentary
        ? (
          <div className="mx-px-8">
            <div className="pt-px-50 text-basic-100">
              <p className="mx-px-16 text-center text-24 leading-px-36">{questionItem.title}</p>
              <p
                className="mx-px-16 text-center text-18 leading-px-24"
                dangerouslySetInnerHTML={{
                  __html: questionItem.meaning.replace(/\n/g, '<br/>'),
                }}
              />
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
            </div>
            <div className="mb-px-8 px-px-16 pt-px-16 pb-px-40 bg-basic-400 rounded" style={{ marginTop: "105px" }}>
              <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">例文</p>
              <p className="font-bold text-14 leading-px-24 text-basic-100">{parsedExampleSentenceTranslation}</p>
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{parsedExampleSentence}</p>
              <div className="pt-px-8 flex justify-center">
                <button 
                  onClick={() => playSentence()}
                  disabled={isAudioPlaying}
                  className="disabled:opacity-50"
                >
                  <SpeakerIcon width="25" height="24" className={`text-center`}/>
                  <div className={`text-8 text-center text-primary-400 font-bold mt-px-4`}>
                    例文を再生
                  </div>
                </button>
              </div>
            </div>
            <div className="mb-px-8 p-px-16 bg-basic-400 rounded">
              <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">解説</p>
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{commentary}</p>
            </div>
            {
              pronuncationTips && (
                <div className="mb-px-33 p-px-16 bg-basic-400 rounded">
                  <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">発音のポイント</p>
                  <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{pronuncationTips}</p>
                </div>
              )
            }
          </div>
        ) : (
          <Fragment>
            <div className={`mx-2 mb-4 ${styles.contentContainer}`}>
              {response
                ? (
                  <Fragment>
                    <QuestionnaireFeedback
                      topText={correctChoiceTranslation}
                      bottomText={questionItem.title}
                      answer={selected}
                      className={styles.feedbackWord}
                      timerProps={timerProps}
                      correctAnswer={questionItem.title}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <p className="mx-2 font-semibold text-16 leading-px-23 text-center text-primary-500">{!response && '日本語にあてはまる単語を選択しましょう'}</p>
                    <div className={`mx-5 pt-px-50 ${styles.questionContainer}`} >
                      <p className={`${styles.translateQuestion} mx-6 text-24 text-center text-basic-100`}>{correctChoiceTranslation}</p>
                      <p className={`${styles.correctChoice} mx-6 mt-2 text-18 text-center text-basic-100`}>{response && correctChoice}</p>
                    </div>
                  </Fragment>
                )
              }
              <div
                className={`text-24 leading-px-38 text-center font-black ${styles.response}`}
                style={{ color: questionHelper.getResponseColor(response) }}
              >
                &nbsp;{response}
              </div>
                {questionItem.choices.map((choice, key) => (
                  <QuestionnaireItem
                    key={key}
                    text={choice.en_item}
                    onClick={() => handleAnswerOptionClick(choice)}
                    color={
                      selected && choice.is_correct
                        ? 'bg-secondary-500'
                        : 'bg-basic-400'
                    }
                    textColor={isIncorrectEnItemChoice(choice, selected) ? '#E34E42' : '#141414'}
                  />
                ))}
            </div>
          </Fragment>
        )
      }
    </div>
  );
};

export default WordEnglishSelectionQuestion;
