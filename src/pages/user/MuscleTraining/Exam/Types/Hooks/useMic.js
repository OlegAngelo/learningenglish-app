import { set } from 'lodash';
import { useEffect, useState } from 'react';

import { log } from '../../../../../../utils/loggerHelper';
import {arrayEqual, checkAnswer} from '../../../../../../utils/validationHelper';

export const useMic = (data) => {
  const [micState, setMicState] = useState('default');
  const [recorder, setRecorder] = useState();
  const [audioStream, setAudioStream] = useState();
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [recordedAudioPlaying, setRecordedAudioPlaying] = useState(false);

  const {
    sampleAnswer,
    englishQuestion,
    setIncorrectIndices,
    setResponse,
    timerProps,
    hint,
  } = data || {};

  //splitting of recording transcription and correct answer
  const checkSentence = () => {
    const incorrects = [];
    const answerSentence = sampleAnswer.split(' ');
    const correctAnswerArray = englishQuestion.split(' ');

    answerSentence.forEach((word, index) => {
      if (word !== correctAnswerArray[index]) {
        incorrects.push(index);
      }
    });

    if (hint.length > 0) {
      hint.forEach((word, index) => {
        if (word === answerSentence[index]) {
          incorrects.push(index);
        }
      });
    }

    if (incorrects.length > 0) setIncorrectIndices(incorrects);
  };

  //response validation
  const validateResponse = () => {
    if (checkAnswer(arrayEqual(sampleAnswer, englishQuestion), timerProps)) {
      if (hint.length > 0) {
        setResponse('Try again!');
      } else {
        setResponse('Excellent!!');
      }
    } else {
      setResponse('Failed...');
    }
  };

  //event for default mic in submit page
  const setDefault = () => setMicState('recording');

  //event handling for mic status for instant-utterance
  const handleMicAction = () => {
    if (micState == 'default') {
      setMicState('recording');
    }
    else if (micState == 'recording') {
      setMicState('submit');
    }
    else if (micState == 'submit') {
      setMicState('playing');
      validateResponse();
      checkSentence();
    }
  };

  //event handling for mic status for sentence-reading (same as shadowing and overlapping)
  const handleMicClick = (state = null) => {
    let currentState = state || micState;

    switch (currentState) {
      case "disabled":
        setMicState('default');
        break;
      case "default":
        recordAudio();
        break;
      case "recording":
        setMicState('playing');
        stopRecording();
        break;
      case "playing":
        playToggle();
        break;
      default: log("Invalid Mic State");
    }
  };

  const recordAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      setIsPermissionDenied(false);

      const tmpRecorder = new MediaRecorder(stream);
      setRecorder(tmpRecorder);
      // Set record to when recording will be finished
      tmpRecorder.addEventListener('dataavailable', e => {
        setAudioBlob(e.data);
        setAudioStream(new Audio(URL.createObjectURL(e.data)));
      })

      // Start recording
      tmpRecorder.start();

      if (tmpRecorder.state === 'recording') {
        // This is to delay the changing of button so that use will start speaking when button is changed
        setTimeout(() => {
          setMicState('recording');
        }, 500)
      }
    })
    .catch(function(err) {
      if (err.name == "NotAllowedError") {
        setIsPermissionDenied(true);
      }
    });
  };

  const play = () => {
    setRecordedAudioPlaying(true);
    audioStream.play();
    audioStream.onended = function () {
      setRecordedAudioPlaying(false);
    };
  };

  const playToggle = () => {
    setRecordedAudioPlaying(!recordedAudioPlaying);
    recordedAudioPlaying ? audioStream.pause() : audioStream.play();
    audioStream.onended = function () {
      setRecordedAudioPlaying(false);
    };
  };

  const stopPlayingRecord = (params) => {
    if (audioStream !== null) {
      audioStream.currentTime = 0;
      audioStream.pause();
      setRecordedAudioPlaying(false);
    }
  };

  const stopRecording = () => {
    recorder.stop();

    // Remove “recording” icon from browser tab
    recorder.stream.getTracks().forEach(i => i.stop());
  };

  const handleReRecord = () => {
    setMicState('default');
  };

  return {
    handleMicAction: handleMicAction,
    setDefault: setDefault,
    handleMicClick: handleMicClick,
    handleReRecord: handleReRecord,
    stopPlayingRecord,
    setMicState,
    micState,
    isPermissionDenied,
    audioBlob,
    recordedAudioPlaying,
  };
}

export default useMic;
