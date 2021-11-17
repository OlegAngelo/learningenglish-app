import React from 'react'
import exerciseConstants from '../../exerciseConstants';

const RecorderIconText = ({micState, recordedAudioPlaying}) => {
  const recordingStates = exerciseConstants.recordingStates;

  return (
    <span className={recordingStates[micState].textClassname}>
      { micState === 'playing' ?
        recordedAudioPlaying ? 
          recordingStates[micState].text.pause : recordingStates[micState].text.play
        : recordingStates[micState].text
      }
    </span>
  )
}

export default RecorderIconText
