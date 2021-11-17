import React, { Fragment, useEffect, useMemo, useContext } from 'react';

import QuestionnaireInputBox from '../../components/QuestionnaireInputBox';
import LetterHint from '../../components/Hint/LetterHint';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import questionHelper from '../../../../../../utils/questionHelper';
import {
  getTagValues,
  getTagIdentifier,
  getAnswerAndSentenceForWord,
} from '../../../../../../utils/text';
import { QuestionWrapperContext } from '../../components/QuestionWrapper/QuestionWrapper.js';

import styles from './TextTypingQuestion.module.css';

const TextTypingQuestion = () => {
  const {
    timerProps,
    response,
    setResponse,
    footerProps,
    setFooterProps,
    isShowCommentary,
    questionItem,
    setAnswers,
    checkAnswer,
    resultMessage,
    setIsShowfooter,
    setSelected,
    categories,
    hint,
    isAudioPlaying,
    AudioErrorModal,
    play,
    playSentence,
    learningType,
  } = useContext(QuestionWrapperContext);
  const {
    example_sentence,
    example_sentence_jp,
    choices,
    title,
    description,
    typing,
    meaning,
  } = questionItem;
  const wordsCount = title.split(' ').length;
  const sentence = example_sentence;
  const exampleSentence = questionHelper.formatQuestionSentence(sentence);
  const exampleSentenceTranslation = example_sentence_jp;
  const correctTranslation = choices.filter(item => item.is_correct)[0].jp_item;
  const sessionQuestion = '日本語にあてはまる単語を入力しましょう';
  const playBackQuestion = '問題を再生';
  const playBackSentence = '例文を再生';

  const questionInfo = useMemo(
    () => ({
      data: getAnswerAndSentenceForWord(typing)
    }),
    [questionItem]
  );

  const correctAnswer = wordsCount > 1
  ? questionInfo.data.answer
  : choices.filter((item) => item.is_correct)[0].en_item;
  const wordLength = correctAnswer.length;
  const tagIdentifier = getTagIdentifier(questionInfo.data.words);
  const tagValues = getTagValues(tagIdentifier, questionInfo.data.answer.split(''));

  useEffect(() => {
    setFooterProps({
      ...footerProps,
      hasLightBulb: !response,
      hasNext: response && true,
      hasSkip: !response,
      hasSpeaker: false,
    });
  }, [response]);

  return (
    <div className={`w-full ${response && 'pb-px-47'}`}>
      <AudioErrorModal />
      {isShowCommentary ? (
        <div className="mx-px-8">
          <div className="pt-px-48 text-basic-100">
            <p className="mx-px-16 text-center text-24 leading-px-36">{title}</p>
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
                <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                  {playBackQuestion}
                </div>
              </button>
            </div>
          </div>
          <div className="mt-px-50 mb-px-8 px-px-16 pt-px-16 pb-px-15 bg-basic-400 rounded">
            <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
              例文
            </p>
            <p className="font-bold text-14 leading-px-24 text-basic-100">
              {exampleSentence}
            </p>
            <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>
              {exampleSentenceTranslation}
            </p>
            <div className='text-center w-full'>
              <button
                onClick={() => playSentence()}
                disabled={isAudioPlaying}
                className="disabled:opacity-50"
              >
                <SpeakerIcon width="25" height="24" className={`text-center mx-auto ${styles.speakerIcon}`} />
                <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
                  {playBackSentence}
                </div>
              </button>
            </div>
          </div>
          <div className="mb-px-8 p-px-16 bg-basic-400 rounded">
            <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
              解説
            </p>
            <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${styles.textFormat}`}>{description}</p>
          </div>
        </div>
      ) : (
        <div>
          {!response && (
            <Fragment>
              <p className="h-px-23 mx-px-8 font-bold text-16 leading-px-23 text-center text-primary-500">
                {sessionQuestion}
              </p>
              <p className="h-px-64 mx-px-20 mb-px-34 mt-px-34 pt-px-9 text-24 leading-px-36 text-basic-100 text-center">
                {correctTranslation}
              </p>
            </Fragment>
          )}
          {!response && hint && (
            <LetterHint
              className="pt-px-16 -mb-px-23"
              hint={hint}
              wordLength={wordLength}
              typing={questionInfo.data.typingFinal}
              correctAnswer={correctAnswer}
              learningType={learningType}
            />
          )}
          <QuestionnaireInputBox
            className={response && 'mt-px-54'}
            color="bg-basic-400"
            textColor="#141414"
            wordLength={wordLength}
            correctAnswer={correctAnswer}
            response={response}
            setResponse={setResponse}
            correctTranslation={correctTranslation}
            key={questionItem.id}
            questionId={questionItem.id}
            setAnswers={setAnswers}
            correctTranslationClass="text-16"
            withFeedback
            checkAnswer={checkAnswer}
            resultMessage={resultMessage}
            timerProps={timerProps}
            setIsShowfooter={setIsShowfooter}
            setSelected={setSelected}
            categories={categories}
            hint={hint}
            typing={questionInfo.data.typingFinal}
            learningType={learningType}
            tagIdentifier={tagIdentifier}
            tagValues={tagValues}
          />
        </div>
      )}
    </div>
  );
};

export default TextTypingQuestion;
