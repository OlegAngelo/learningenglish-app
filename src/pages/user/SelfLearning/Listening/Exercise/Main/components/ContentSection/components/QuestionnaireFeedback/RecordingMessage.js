import React, { Fragment } from 'react';

import exerciseConstants from '../../exerciseConstants';
import Button from '../../../../../../../../../../shared/Button/Button';

import useSLListeningExercise from '../../../useSLListeningExercise';

const RecordingMessage = ({ 
  micState, 
  setIsAudioEnded, 
  setPlayedAudioAtSpeakingEnabled, 
  stopPlayingRecord, 
  setMicState, 
  stopAudio, 
  isLastPage 
}) => {
  const { nextQuestion, hasReachToMaximum, submitResultToApi } = useSLListeningExercise();
  const recordingStates = exerciseConstants.recordingStates;

  const onNextQuestionClick = () => {
    stopAudio();
    stopPlayingRecord();
    if (hasReachToMaximum()) return submitResultToApi();
    nextQuestion();
  };

  const onRecordAgainClick = (params) => {
    stopAudio();
    stopPlayingRecord();
    setMicState('default');
    setIsAudioEnded(false);
    setPlayedAudioAtSpeakingEnabled(false);
  };

  return (
    <Fragment>
      {['recording', 'errorRecording'].includes(micState) && (
        <span className={recordingStates[micState].noteClassname}>
          {recordingStates[micState].note}
        </span>
      )}
      {['submit', 'playing', 'errorRecording'].includes(micState) && (
        <div className="flex items-center justify-center mt-px-16">
          <Button type="white-square-wider" onClick={onRecordAgainClick}>
            やり直す
          </Button>
          <Button
            className="ml-px-8"
            type="white-square-wider"
            onClick={isLastPage ? () => submitResultToApi() : onNextQuestionClick}
          >            
            {hasReachToMaximum() ? '解答結果へ進む' : '次の問題へ進む'}
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default RecordingMessage;
