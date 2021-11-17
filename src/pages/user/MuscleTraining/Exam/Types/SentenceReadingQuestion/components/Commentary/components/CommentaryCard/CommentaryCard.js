import React from 'react';

import SpeakerIcon from '../../../../../../../../../../shared/icons/SpeakerIcon';

const CommentaryCard = ({
  title,
  description,
  descriptionTop = '',
  playSentence,
  hasPlayBack,
  learningType,
  isAudioPlaying,
}) => {
  const playBackSentence = '例文を再生';

  return (
    <div className="pb-px-14 px-px-16 mx-px-8 bg-basic-400 rounded-px-4">
      <p className="pt-px-14 font-bold text-primary-500 text-16">{title}</p>
      {descriptionTop && (
        <p className="text-14 font-bold pt-px-8 leading-relaxed break-words">
          {descriptionTop}
        </p>
      )}
      <p className="text-14 font-theme-normal pb-px-34 pt-px-8 leading-relaxed break-words whitespace-pre-wrap">
        {description}
      </p>
      {hasPlayBack && learningType == 'word' && (
        <div className="text-center w-full">
          <button
            onClick={() => playSentence()}
            disabled={isAudioPlaying}
            className="disabled:opacity-50"
          >
            <SpeakerIcon width="25" height="24" className="text-center mx-auto" />
            <div className="text-8 text-center text-primary-400 font-bold mx-auto mt-px-4">
              {playBackSentence}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentaryCard;
