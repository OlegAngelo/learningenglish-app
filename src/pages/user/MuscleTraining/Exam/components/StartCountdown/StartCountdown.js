import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { displayCountdownMessage } from './computed';

const StartCountdown = ({
  countdown,
  isFromLecture,
  isFromAdmin,
}) => {
  const trainingSetId = localStorage.getItem('training_set_id');

  const { questionType, learningType } = queryString.parse(useLocation().search);

  return (
    !isFromAdmin &&
    <div className="relative z-20 grid place-items-center h-screen w-full bg-primary-500">
      <div className="text-center text-basic-400">
        {!isFromLecture && (
          <div className="-mt-px-82 text-center text-basic-400 font-hiragino font-bold text-20 pb-px-50">{`Set ${trainingSetId}`}</div>
        )}
        <div className="h-px-188 w-px-188 mx-auto border-px-12 border-solid border-basic-400 rounded-full -mt-px-3">
          <span className="font-sarpanch text-144 leading-px-164">{countdown}</span>
        </div>
        <div style={{ minWidth: '300px' }} className="mt-px-64 font-bold font-hiragino-kaku text-24 leading-px-29">
          <div>{!isFromLecture && '筋トレ学習'}</div>
          <div className="pt-px-22">{displayCountdownMessage(questionType, learningType)}</div>
        </div>
      </div>
    </div>
  );
};

export default StartCountdown;
