import React, { Fragment, useEffect, useState } from 'react';

import BigSpeakerIcon from '../../../../../../shared/icons/BigSpeakerIcon';
import SpeakerIcon from '../../../../../../shared/icons/SpeakerIcon';

import style from './QuestionSpeakerPlayer.module.css';

const QuestionSpeakerPlayer = ({
  category,
  className = '',
  isAudioPlaying,
  play,
  iconHeight = '24',
  iconWidth = '25',
  stopBlinking = false,
  color='#0C5F8D',
  disableSpeaker = false,
  setCanRecord = () => {},
  withLabel = true,
  response,
}) => {
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(stopBlinking);

  const speakerOnClickHandler = () => {
    setIsSpeakerClicked(true);
    play(category);
  };

  useEffect(() => {
    stopBlinking && setIsSpeakerClicked(true);
  }, [stopBlinking]);

  useEffect(() => {
    if (!isAudioPlaying && isSpeakerClicked) {
      setCanRecord(true);
    }
  }, [isAudioPlaying]);

  return (
    <Fragment>
      <div className={`${className} mx-auto grid place-items-center`}>
        <button
          onClick={speakerOnClickHandler}
          disabled={isAudioPlaying || disableSpeaker}
          className="disabled:opacity-50"
        >
          <SpeakerIcon
            className={isSpeakerClicked || response ? '' : style.blink}
            width={iconWidth}
            height={iconHeight}
            color={color}
          />
          {withLabel && (
            <p
              className={`text-primary-400 text-center text-8 leading-px-12 ${
                isSpeakerClicked || response ? '' : style.blink
              } ${disableSpeaker && 'opacity-50'}`}
            >
              問題を再生
            </p>
          )}
        </button>
      </div>
    </Fragment>
  );
};

export default QuestionSpeakerPlayer;
