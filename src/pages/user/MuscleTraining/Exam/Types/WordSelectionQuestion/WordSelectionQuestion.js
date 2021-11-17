import React, { Fragment, useEffect, useContext }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAnswer, getSentence, removeSpecialCharacters } from '../../../../../../utils/text';
import questionHelper from '../../../../../../utils/questionHelper';

import QuestionnaireItem from '../../components/QuestionnaireItem';
import QuestionSentence from '../../components/QuestionSentence';
import QuestionSpeakerPlayer from '../../components/QuestionSpeakerPlayer';

import { setHasChoice } from '../../../../../../redux/exam/slice';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './WordSelectionQuestion.module.css';

const BlankFillingQuestion = () => {
  const {
    timerProps,
    play,
    isAudioPlaying,
    categories,
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
    learningType,
    setAnswers,
    sentence,
    setSentence
  } = useContext(QuestionWrapperContext);
  const dispatch = useDispatch();
  const {hasChoice} = useSelector(state => state.exam)
  const text = questionItem.title;
  const typing = questionItem.typing;
  const question = {
    question: '',
    answer: getAnswer(text.replace(/"/g, '')),
    sentence: getSentence(text.replace(/"/g, '')),
    choices: questionItem.choices,
    voice_utterance: removeSpecialCharacters(text),
    description: questionItem.description,
    translation: questionItem.translation,
    audioFile: questionItem.audio_file,
  };
  const sessionQuestion = '原価を削るのはどうでしょうか。';
  const instructions = '空所にあてはまる英語を選択しましょう';

  const handleAnswerOptionClick = (choice) => {
    
    if (selected) return;
    
    setSelected(choice.blank_item);
    setResponse(checkAnswer(choice.is_correct, timerProps.seconds) ? resultMessage : 'Failed...');

    setAnswers((answers) => [
      ...answers,
      questionHelper.generateQuestionResult(categories, questionItem.id, choice.id),
    ]);

    question.sentence.map(word => {
      if( word.type === "answer") {
        word.displayed = choice.blank_item
        word.correct = choice.is_correct
        word.selected = true
      }
      return word;
    });

    dispatch(setHasChoice(true))
    setSentence(question.sentence)
  };
  
  const isIncorrectChoice = (choice) => {
    return selected === choice.blank_item && !choice.is_correct;
  };

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: false,
      hasNext: response,
      hasSkip: !response,
      hasSpeaker: false,
    })
  }, [response]);

  return (
    <div className="w-full">
      <p className="mx-2 font-semibold text-16 leading-px-23 text-center text-primary-500">{!response && instructions}</p>
      <div className={`${styles.questionSentence} mx-6 mt-px-34 text-24 text-basic-100`}>
        <QuestionSentence
          onCommentaryPage={isShowCommentary}
          sentence={!response || !hasChoice ? question.sentence : sentence}
          onResponsePage={response}
          fullQuestion={questionItem.title}
          key={questionItem.id}
          isTimerEnded={timerProps.seconds == 0}
          category={categories}
          typing={typing}
        />
      </div>
      <p className={`${styles.sessionQuestion} font-normal mx-6 mt-2 text-14 text-basic-100`}>{question.translation}</p>
      {isShowCommentary && question.audioFile &&
        <QuestionSpeakerPlayer 
          className={'pt-px-21'}
          category={categories} 
          play={play} 
          key={questionItem.id}
          stopBlinking={true} 
          color={'#43596d'}
          isAudioPlaying={isAudioPlaying}
          /> 
      }
      <div className="mx-2 pt-px-65 mb-4">
        {isShowCommentary
          ? (
            question.description &&
            <div className={`mt-px-37 ${styles.commentary} p-px-16 bg-basic-400 rounded`}>
              <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">解説</p>
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{question.description}</p>
            </div>
          ) : (
            <Fragment>
              <div
                className={`text-24 leading-px-38 text-center font-black ${styles.response}`}
                style={{ color: questionHelper.getResponseColor(response) }}
              >
                &nbsp;{response}
              </div>
              {question.choices.map((choice, key) => (
                <QuestionnaireItem
                  key={key}
                  text={choice.blank_item}
                  onClick={() => handleAnswerOptionClick(choice)}
                  color={
                    selected && choice.is_correct
                      ? 'bg-secondary-500'
                      : 'bg-basic-400'
                  }
                  textColor={isIncorrectChoice(choice) ? '#E34E42' : '#141414'}
                />
              ))}
            </Fragment>
          )
        }
      </div>
    </div>
  );
};

export default BlankFillingQuestion;
