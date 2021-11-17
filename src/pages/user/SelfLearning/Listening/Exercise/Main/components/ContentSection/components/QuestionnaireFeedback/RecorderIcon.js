import React, { Fragment } from 'react'
import Recorder from '../../../../../../../../MuscleTraining/Exam/Types/SentenceReadingQuestion/components/InstructionsModal/components/Recorder/Recorder';
import PlayArrowIcon from '../../../../../../../../../../shared/icons/PlayArrowIcon';
import PauseNewsIcon from '../../../../../../../../../../shared/icons/PauseNewsIcon';
import style from '../../ContentSection.module.css';

const RecorderIcon = ({
    micState,
    setMicState,
    handleMicClick,
    setDisablePlay,
    disablePlay,
    recordedAudioPlaying,
    isAudioEnded,
    setIsAudioEnded,
    setPlayedAudioAtSpeakingEnabled
}) => {
  switch (micState) {
    case 'default':
      return <Recorder
        className={`flex justify-center ${isAudioEnded && style.blink}`}
        type="default"
        onClick={() => {
          setIsAudioEnded(true);
          setPlayedAudioAtSpeakingEnabled(true);
          handleMicClick();
        }}
      />
    case 'recording':
      return <Recorder
        type="recording"
        onClick={() => {
          setDisablePlay(true);
          handleMicClick();
        }}
      />
    case 'playing':
      if (recordedAudioPlaying) {
        return <PauseNewsIcon
          className="ml-auto mr-auto"
          height="54"
          width="54"
          color={disablePlay ? `#d0c8c8` : `#FFFFFF`}
          onClick={() => {
            if (!disablePlay) {
              handleMicClick();
            }
          }}
        />
      } else {
        return <PlayArrowIcon
          className="ml-auto mr-auto"
          height="54"
          width="54"
          color={disablePlay ? `#d0c8c8` : `#FFFFFF`}
          onClick={() => {
            if (!disablePlay) {
              handleMicClick();
            }
          }}
        />
      }
    default:
      return <Fragment></Fragment>
  }
}

export default RecorderIcon
