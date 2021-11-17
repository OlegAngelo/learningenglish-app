import React from 'react';

import CommentaryCard from './components/CommentaryCard';
import SpeakerIcon from '../../../../../../../../shared/icons/SpeakerIcon';

import style from '../../SentenceReadingQuestion.module.css'

const Commentary = ({
  question,
  subQuestion,
  description = '',
  pronunciationPoint = '',
  exampleSentence = '',
  exampleSentenceJp = '',
  play,
  category,
  playSentence,
  isAudioPlaying,
  learningType
}) => {
  const playBackQuestion = '問題を再生';

  return (
    <div className="-mb-px-20">
      <div className={`mx-px-22 mt-px-60 ${learningType === 'word' ? 'text-center' : 'text-left'}`}>
        <p className="text-24 leading-px-35.52 text-basic-100">
          {question}
        </p>
        <p
          className={`text-18 text-basic-100 mt-px-9 ${style.subQuestion}`}
          dangerouslySetInnerHTML={{
            __html: subQuestion.replace(/\n/g, '<br/>'),
          }}
        />
        <div className='mt-px-20 text-center w-full'>
          <button
            onClick={() => play(category)}
            disabled={isAudioPlaying}
            className="disabled:opacity-50"
          >
            <SpeakerIcon width="25" height="24" className="text-center mx-auto" />
            <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
              {playBackQuestion}
            </div>
          </button>
        </div>
      </div>
      {exampleSentence && (
        <div className="mt-px-8">
          <CommentaryCard
            title="例文"
            descriptionTop={exampleSentence}
            description={exampleSentenceJp}
            hasPlayBack={true}
            isAudioPlaying={isAudioPlaying}
            playSentence={playSentence}
            learningType={learningType}
          />
        </div>
      )}
      <div className={`mt-px-8 ${pronunciationPoint ? '' : 'mb-px-100'} `}>
        <CommentaryCard
          title="解説"
          description={description}
          hasPlayBack={false}
        />
      </div>
      {pronunciationPoint && (
        <div className={`mt-px-8 mb-px-100`}>
          <CommentaryCard
            title="発音のポイント"
            description={pronunciationPoint}
            hasPlayBack={false}
          />
        </div>
      )}
    </div>
  )
};

export default Commentary;
