import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Loading from '../../../../../shared/Loading';
import ThumbsUpIcon from '../../../../../shared/icons/ThumbsUpIcon';
import ThumbsDownIcon from '../../../../../shared/icons/ThumbsDownIcon';

import learningConcentrationApi from '../../../../../api/LearningConcentrationApi';

import useDetectInterrupt from '../../../../../hooks/useDetectInterrupt';

import style from './Survey.module.css';

const Survey = () => {
  const [savingData, setSavingData] = useState(false);
  const { setDetectInterrupt } = useDetectInterrupt({});
  const { unitId } = useParams();
  const history = useHistory();

  const onClickHandler = (action) => {
    const payload = {
      value: action === 'like' ? 'thumbs-up' : 'thumbs-down',
      session_id: localStorage.getItem('log_learn_session_id'),
    };

    localStorage.removeItem('isRetry');
    setSavingData(true);

    learningConcentrationApi
      .save(payload)
      .catch((error) => console.error(error))
      .finally(() => {
        setSavingData(true);
        localStorage.setItem('course_result_prev_page', 'muscle-exam');
        history.push(`/training/muscle-result/${unitId}`);
      });
  };

  useEffect(() => {
    return () => {
      setDetectInterrupt(false);
    }
  },[]);

  if (savingData) {
    return <Loading height="h-screen" rootPosition="relative" />;
  }

  return (
    <div className="h-full w-full bg-primary-500 min-h-screen">
      <div className="text-center text-basic-400">
        <p className={`${style.title} font-bold font-hiragino text-20`}>
          今回の学習の満足度は？
        </p>
        <div className={`${style.buttonContainer}`}></div>
          <div className="flex justify-around">
            <div className="text-center ml-4">Great!</div>
            <div className="text-center ml-5">No good...</div>
          </div>
          <div className="flex justify-around mt-2">
            <div
              className="h-px-54 w-px-54 rounded-full flex items-center justify-center bg-basic-400 cursor-pointer"
              onClick={() => onClickHandler('like')}
            >
              <ThumbsUpIcon color="#044071" />
            </div>

            <div
              className="h-px-54 w-px-54 rounded-full flex items-center justify-center bg-basic-400 cursor-pointer"
              onClick={() => onClickHandler('dislike')}
            >
              <ThumbsDownIcon color="#044071" />
            </div>
          </div>
        <p className={`${style.title} font-hiragino text-15`}>
          毎回の学習内容と満足度を <br/>
          AIが学習し、より最適な学習を <br/>
          オススメできるようになります。
        </p>
      </div>
    </div>
  );
};

export default Survey;
