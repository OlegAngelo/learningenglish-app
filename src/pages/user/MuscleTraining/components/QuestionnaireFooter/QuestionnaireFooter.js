import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import LightBulbIcon from '../../../../../shared/icons/LightBulb';
import NextIcon from '../../../../../shared/icons/NextIcon';
import QuestionnaireBackIcon from '../../../../../shared/icons/QuestionnaireBackIcon';
import SkipIcon from '../../../../../shared/icons/SkipIcon';
import SpeakerIcon from '../../../../../shared/icons/SpeakerIcon';

import { setHasChoice } from '../../../../../redux/exam/slice';

import styles from './QuestionnaireFooter.module.css';

const Footer = ({
  children,
  hasBack,
  hasSpeaker,
  hasSkip,
  hasNext,
  hasLightBulb,
  nextQuestion,
  hintQuestion,
  play,
  isAudioEnded,
  isAudioPlaying,
  correctAnswer,
  category,
  blinkSpeaker,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false);
  const back = 'back';
  const playback = '再生';
  const skip = 'skip';
  const next = 'next';
  const hint = 'ヒント';

  const hintOnClickHandler = (hint) => {
    setSelected(hint);
    hintQuestion(correctAnswer, category);
  };

  const checkToShowBlinkEffect = (button) => {
    if (button === 'next') return correctAnswer !== undefined;
    else if (button === 'speaker') return (blinkSpeaker && isAudioEnded) || (!isSpeakerClicked && (category != 'listening' || category != 'phrase-voice-listening'));
  };

  const nextQuestionHandler = () => {
    setIsSpeakerClicked(false);
    nextQuestion();
    dispatch(setHasChoice(false));
  }

  return (
    <footer className={`${styles.footerLayout} pb-px-10 fixed bottom-0 w-full flex flex-col justify-end z-10`} >

      {children}

      <div className={`grid grid-cols-3 gap-2 text-center ${styles.footerIcons}`}>
        <div className="col-span-1">
          {
            hasLightBulb && (
              <button
                className={`w-1/2 ${styles.footerIcon}`}
                onClick={() => hintOnClickHandler(hint)}
              >
                <LightBulbIcon
                  isActive={selected}
                  width="13"
                  height="18"
                  className={`text-center mx-auto ${styles.footerIcon} ${styles.list}`}
                />
                <div
                  style={{ color: selected === hint ? '#0C5F8D' : '#43596D' }}
                  className="text-8 text-center font-bold mx-auto mt-px-4"
                >
                  ヒント
                </div>
              </button>
            )
          }
          {
            hasBack && (
              <button
                className="w-1/2"
                onClick={() => setSelected(back)}
              >
                <QuestionnaireBackIcon
                  isActive={selected}
                  className={`text-center mx-auto ${styles.footerIcon} ${styles.list}`}
                />
                <div
                  style={{ color: selected === back ? '#0C5F8D' : '#43596D' }}
                  className="text-8 text-center font-bold mx-auto mt-px-4"
                >
                  BACK
                </div>
              </button>
            )
          }
        </div>

        <div className="col-span-1">
          {
            hasSpeaker && (
              <button
                onClick={() => {
                  play(category);
                  setIsSpeakerClicked(true);
                }}
                disabled={isAudioPlaying}
                className="w-1/2 disabled:opacity-50"
              >
                <SpeakerIcon className={`text-center mx-auto ${styles.footerIcon} ${styles.list} ${checkToShowBlinkEffect('speaker') && styles.blink}`} />
                <div className={`text-8 text-center text-primary-400 font-bold mx-auto mt-px-4 ${checkToShowBlinkEffect('speaker') && styles.blink}`}>
                  {playback}
                </div>
              </button>
            )
          }
        </div>

        <div className="col-span-1">
          {
            hasSkip && (
              <button
                className="w-1/2"
                onClick={nextQuestionHandler}
              >
                <SkipIcon
                  isActive={selected}
                  className={`text-center mx-auto ${styles.footerIcon} ${styles.list}`}
                />
                <div
                  style={{ color: selected === skip ? '#0C5F8D' : '#43596D' }}
                  className="text-8 text-center font-bold mx-auto mt-px-4"
                >
                  スキップ
                </div>
              </button>
            )
          }
          {
            hasNext && (
              <button
                className="w-1/2"
                onClick={nextQuestionHandler}
              >
                <NextIcon
                  isActive={selected}
                  className={`text-center mx-auto ${styles.footerIcon} ${styles.list} ${checkToShowBlinkEffect('next') && styles.blink}`}
                />
                <div
                  style={{ color: selected === next ? '#0C5F8D' : '#43596D' }}
                  className={`text-8 text-center font-bold mx-auto mt-px-4 ${checkToShowBlinkEffect('next') && styles.blink}`}
                >
                  NEXT
                </div>
              </button>
            )
          }
        </div>
      </div>
    </footer >
  );
};

export default Footer;
