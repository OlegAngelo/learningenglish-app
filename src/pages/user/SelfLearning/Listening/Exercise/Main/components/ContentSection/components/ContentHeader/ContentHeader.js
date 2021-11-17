import React, { useContext, useEffect } from 'react';

import SpeakerIcon from '../../../../../../../../../../shared/icons/SpeakerIcon';
import exerciseConstants from '../../exerciseConstants';

import useSLListeningExercise from '../../../useSLListeningExercise';

import style from '../../ContentSection.module.css';
import AudioContext from '../../audioContext';

const ContentHeader = () => {
  const {
    currentState,
    playedAudio,
    playingAudio,
    playAudio,
    micState,
    showKeyboard,
    sticky,
    setSticky
  } = useContext(AudioContext);

  const { questionPageNumber } = useSLListeningExercise();

  const questionPageNumberHandler = () => {
    if (questionPageNumber.length === 4) {
      localStorage.setItem('totalQuestionNumber', questionPageNumber.slice(2));
      localStorage.setItem('currentQuestionNumber', questionPageNumber.charAt(0));
    }
    if (questionPageNumber.length > 4) {
      const char1 = questionPageNumber.charAt(0);
      const char2 = questionPageNumber.charAt(1);
      const currentQuestionNumber = char1 + char2;
      localStorage.setItem('totalQuestionNumber', questionPageNumber.slice(3));
      localStorage.setItem('currentQuestionNumber', currentQuestionNumber);
    }
    if (questionPageNumber.length === 3) {
      localStorage.setItem('totalQuestionNumber', questionPageNumber.slice(2));
      localStorage.setItem('currentQuestionNumber', questionPageNumber.charAt(0));
    }
  };

  const handleScroll = (e) => {
    // only check if scrolling down
    if (e.target.scrollTop > 0) {
      if (e.target.scrollTop >= 110 || e.target.scrollTop === undefined) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const SpeakerBtn = () => {
    return (
      <button
        className={`disabled:opacity-50 focus:outline-none ${(!playedAudio && !playingAudio) && style.blink}`}
        disabled={playingAudio ? true : false}
        onClick={playAudio}
      >
        <SpeakerIcon />
        <p className="text-8 text-primary-400 leading-px-12 font-bold mt-px-4">
          問題を再生
        </p>
      </button>
    );
  }

  return (
    <div className="mt-px-64 pt-px-30">
      <p className="h-px-20 font-bold text-14 leading-px-20 text-primary-500 text-center">
        {questionPageNumber}
        {questionPageNumberHandler()}
      </p>
      {/* # Instruction */}
      <p className='mt-px-27 font-bold text-16 leading-px-23 text-center text-primary-500 mx-px-8'>
        {micState === 'playing'
          ? exerciseConstants.pageStates['resultAfterRecording']
          : exerciseConstants.pageStates[currentState]}
      </p>
      {/* # Audio Speaker */}
      {!exerciseConstants.isResultStates.includes(currentState) && (
        <>
          { (sticky && showKeyboard) && (
            <div className="w-full text-center z-50 fixed top-px-64 bg-basic-500 border-b border-primary-100 py-px-14">
              <SpeakerBtn />
            </div>
          )}
          <div
            className={`w-full text-center mt-px-10 py-px-14 ${ 
              exerciseConstants.isTypingStates.includes(currentState) && 'bg-basic-500 border-b border-primary-100'
            }`}
          >
            <SpeakerBtn/>
          </div>
        </>
      )}

      {currentState === 'shadowing' && (
        <div className="text-exam-error text-14 font-bold pt-px-14 text-center">うまく発音できるまで繰り返しましょう</div>
      )}
    </div>
  );
};

export default ContentHeader;
