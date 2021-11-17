import React from 'react';
import { useSelector } from 'react-redux';

const StartCountdown = ({countdown}) => {
  const {
    sentence,
  } = useSelector(state => state.selfLearningReadingExercise)

  return (
    <div className="fixed z-30 grid place-items-center h-full w-full min-h-screen bg-primary-500">
      <div className="text-center text-basic-400">
        <div className="-mt-px-83 text-center text-basic-400 font-hiragino font-bold text-20 pb-px-50 mx-px-20">{sentence.title}</div>
        <div className="h-px-188 w-px-188 mx-auto border-px-12 border-solid border-basic-400 rounded-full -mt-px-3">
          <span className="font-sarpanch text-144 leading-px-164">{countdown}</span>
        </div>
        <div className="mt-px-63 font-bold font-hiragino-kaku text-24 leading-px-29">
          <div>チャンクリーディング</div>
          <div className="pt-px-22">スタート！</div>
        </div>
      </div>
    </div>
  );
};

export default StartCountdown;
