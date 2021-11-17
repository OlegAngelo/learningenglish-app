import React, { Fragment, useMemo } from 'react';

import QuestionSentence from '../../components/QuestionSentence';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import { getAnswer, getSentence, removeSpecialCharacters } from '../../../../../../utils/text';
import questionHelper from '../../../../../../utils/questionHelper';

import style from './Commentary.module.css';

const Commentary = ({
  category,
  learningType,
  isAudioPlaying,
  questionItem,
  play,
  playSentence,
  response,
}) => {
  const commentary = questionItem.description;
  const correctTranslation = questionItem.choices.filter((choice) => choice.is_correct)[0]
    .jp_item;
  const translation = questionItem.title;
  const sentence = questionItem.example_sentence;
  const exampleSentenceTranslation = questionItem.example_sentence_jp;
  const pronuncationTips = questionItem.pronunciation_point;
  const typing = questionItem.typing;
  const sessionQuestion = '空所にあてはまる英語を入力しましょう';
  const playBackQuestion = '問題を再生';
  const playBackSentence = '例文を再生';

  const questionInfo = useMemo(
    () => ({
      answer: getAnswer(translation),
      sentence: getSentence(translation),
    }),
    [questionItem]
  );

  if (learningType === 'phrase') {
    return (
      <Fragment>
        <p className={`mx-px-8 font-bold text-center text-primary-500 ${style.instructionContainer}`}>
          {!response && sessionQuestion}
        </p>
        <div className={`mx-px-24 mt-px-25 text-basic-100 ${style.questionContainer}`}>
          <div className="-mt-px-5">
            { category === 'word-typing' ? (
              <QuestionSentence
                onCommentaryPage={true}
                onResponsePage={response}
                typing={typing}
                sentence={questionInfo.sentence}
                hasTyped={response !== 'Failed...' && response}
              />
            ) : (
              removeSpecialCharacters(questionItem.title)
            )
            }
            <div className={`pt-px-8 text-14 font-hiraginotext-basic-100 font-normal ${style.translateLineHeight}`}>
              {questionItem.translation}
            </div>
          </div>
        </div>
        <p className="mx-px-25 mt-px-14 text-14 leading-px-24 text-basic-100">
          {questionItem.jp_title}
        </p>

        <div>
          <div className="pt-px-21 flex justify-center">
            <button
              onClick={() => play(category)}
              disabled={isAudioPlaying}
              className="disabled:opacity-50"
            >
              <SpeakerIcon width="25" height="24" className={`text-center`} />
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
              <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 whitespace-pre-wrap ${style.textFormat}`}>
                {commentary}
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="mx-px-8">
      <div className="pt-px-40 text-basic-100">
        <p className="mx-px-16 text-center text-24 leading-px-36">{translation}</p>
        <p className="mx-px-16 text-center text-18 leading-px-24">{correctTranslation}</p>
        <div className="mt-px-20 text-center w-full">
          <button
            onClick={() => play(category)}
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
      <div className="mt-px-50 mb-px-8 px-px-16 pt-px-16 pb-px-15 bg-basic-400 rounded">
        <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">例文</p>
        <p className="font-bold text-14 leading-px-24 text-basic-100 break-words">
          {questionHelper.formatQuestionSentence(sentence)}
        </p>
        <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${style.textFormat}`}>
          {exampleSentenceTranslation}
        </p>
        <div className="text-center w-full">
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
        <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 whitespace-pre-wrap ${style.textFormat}`}>
          {commentary}
        </p>
      </div>
      {pronuncationTips && (
        <div className="mb-px-27 p-px-16 bg-basic-400 rounded">
          <p className="mb-px-8 font-bold text-16 leading-px-23 text-primary-500">
            発音のポイント
          </p>
          <p className={`mb-px-18 text-14 leading-px-24 text-basic-100 ${style.textFormat}`}>
            {pronuncationTips}
          </p>
        </div>
      )}
    </div>
  );
};

export default Commentary;
