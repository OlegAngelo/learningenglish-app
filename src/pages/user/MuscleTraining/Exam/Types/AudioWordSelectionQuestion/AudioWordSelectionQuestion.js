import React, { Fragment, useEffect, useContext } from 'react';

import QuestionSpeakerPlayer from '../../components/QuestionSpeakerPlayer';
import QuestionnaireFeedback from '../../components/QuestionnaireFeedback';
import QuestionnaireItem from '../../components/QuestionnaireItem';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import questionHelper from '../../../../../../utils/questionHelper';
import { checkAnswer, isIncorrectChoice } from '../../../../../../utils/validationHelper';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper';

import styles from './AudioWordSelectionQuestion.module.css';

const AudioWordSelectionQuestion = () => {
  const {
    footerProps,
    setFooterProps,
    isShowCommentary,
    response,
    setResponse,
    selected,
    setSelected,
    questionItem,
    timerProps,
    resultMessage,
    setAnswers,
    categories,
    isAudioEnded,
    isAudioPlaying,
    AudioErrorModal,
    play,
    playSentence,
  } = useContext(QuestionWrapperContext)

  const commentary = questionItem.description;
  const learningType = questionItem.choices[0];
  const correctTranslation = questionItem.choices.filter((choice) => choice.is_correct)[0].jp_item;
  const translation = questionItem.title;
  const sentence = questionItem.example_sentence;
  const meaning = questionItem.meaning;
  const exampleSentenceTranslation = questionItem.example_sentence_jp;
  const pronuncationTips = questionItem.pronunciation_point;
  const choices = questionItem.choices;
  const playBackQuestion = '問題を再生';
  const playBackSentence = '例文を再生';

  const handleAnswerOptionClick = ({ id, jp_item, is_correct }) => {
    if (selected) return;

    setSelected(jp_item);
    setResponse(checkAnswer(is_correct, timerProps) ? resultMessage : 'Failed...');
    setAnswers((answers) => [
      ...answers,
      questionHelper.generateQuestionResult(
        categories,
        questionItem.id,
        id
      ),
    ]);
  };

  const sessionQuestion = () => {
    if (learningType.training_word_id) {
      return "音声を聞いて、読まれた単語の意味を選択しましょう";
    } else if (learningType.training_phrase_id) {
      return "音声を聞いて、読まれた単語の意味を選択しましょう";
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
  }, [response, isShowCommentary]);

  return (
    <div className={`w-full ${response && styles.responseTop}`}>
      <AudioErrorModal />
      {isShowCommentary
        ? (
          <div className="mx-px-8">
            <div className="pt-px-40 text-basic-100">
              <p className="mx-px-16 text-center text-24 leading-px-36">{translation}</p>
              <p
                className="mx-px-16 text-center text-18 leading-px-24"
                dangerouslySetInnerHTML={{
                  __html: meaning.replace(/\n/g, '<br/>'),
                }}
              />
              <div className='mt-px-20 text-center w-full'>
                <button
                  onClick={() => play(categories)}
                  disabled={isAudioPlaying}
                  className="disabled:opacity-50"
                >
                  <SpeakerIcon width="25" height="24" className={`text-center mx-auto`} />
                  <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                    {playBackQuestion}
                  </div>
                </button>
              </div>
            </div>
            <div className={`${styles.sampleSentence} mb-px-8 px-px-16 pt-px-16 pb-px-15 bg-basic-400 rounded`}>
              <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">例文</p>
              <p className="font-bold text-14 leading-px-24 text-basic-100 break-words">{ questionHelper.formatQuestionSentence(sentence) }</p>
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{exampleSentenceTranslation}</p>
              <div className='text-center w-full'>
                <button
                  onClick={() => playSentence()}
                  disabled={isAudioPlaying}
                  className="disabled:opacity-50"
                >
                  <SpeakerIcon width="25" height="24" className={`text-center mx-auto`} />
                  <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                    {playBackSentence}
                  </div>
                </button>
              </div>
            </div>
            <div className="mb-px-8 p-px-16 bg-basic-400 rounded">
              <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">解説</p>
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 whitespace-pre-wrap ${styles.textFormat}`}>{commentary}</p>
            </div>
            {
              pronuncationTips && (
                <div className="mb-px-27 p-px-16 bg-basic-400 rounded">
                  <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">発音のポイント</p>
                  <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{pronuncationTips}</p>
                </div>
              )
            }
          </div>
          ) : (
            <div>
              {response
              ? (
                <Fragment>
                  <QuestionnaireFeedback
                    bottomText={correctTranslation}
                    topText={translation}
                    answer={selected}
                    response={response}
                    upperTextClass={styles.responseUpperText}
                    bottomTextClass={styles.responseBottomText}
                    correctAnswer={translation}
                  />

                  <div className="my-px-20">
                    <QuestionSpeakerPlayer
                      className="w-full mb-px-5"
                      category={categories}
                      isAudioPlaying={isAudioPlaying}
                      play={play}
                      key={questionItem.id}
                      response={response}
                      withLabel
                    />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={`${styles.speakerQuestion}`}>
                    <p className="mx-px-8 font-bold text-16 leading-px-23 text-center text-primary-500">{sessionQuestion()}</p>
                    <QuestionSpeakerPlayer
                      className="mt-px-25 mb-px-16 w-full"
                      category={categories}
                      isAudioPlaying={isAudioPlaying}
                      play={play}
                      key={questionItem.id}
                      response={response}
                    />
                  </div>
                </Fragment>
                )
              }
              {
                isAudioEnded && (
                  <div className={`mx-px-8 ${response && styles.responseChoices} ${styles.choiceContainer}`}>
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
                              ? 'bg-secondary-300'
                              : 'bg-basic-400'
                          }
                          textColor={isIncorrectChoice(choice, selected) ? '#E34E42' : '#141414'}
                        />
                      ))}
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
  );
};

export default AudioWordSelectionQuestion;
