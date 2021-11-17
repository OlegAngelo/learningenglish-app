import React from 'react';
import { useSelector } from 'react-redux';

const ListeningCountdown = ({countdown}) => {
  const { set } = useSelector(state => state.selfLearningListeningExercise)

  return (
    <div className="z-20 grid place-items-center h-screen w-full bg-primary-500">
      <div className="text-center text-basic-400">
        <div className="-mt-px-82 text-center text-basic-400 font-hiragino font-bold text-20 pb-px-50">{`Set.${set?.order}`}</div>
        <div className="h-px-188 w-px-188 mx-auto border-px-12 border-solid border-basic-400 rounded-full -mt-px-3">
          <span className="font-sarpanch text-144 leading-px-164">
            {countdown}
          </span>
        </div>
        <div
          style={{ minWidth: '300px' }}
          className="mt-px-64 font-bold font-hiragino-kaku text-24 leading-px-29"
        >
          <div>ディクテーション</div>
          <div className="pt-px-22">スタート！</div>
        </div>
      </div>
    </div>
  );
};

export default ListeningCountdown;
