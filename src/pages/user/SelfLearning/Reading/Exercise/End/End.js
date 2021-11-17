import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Loading from '../../../../../../shared/Loading';
import Button from '../../../../../../shared/Button';
import useSLReadingProgress from '../../../../../../hooks/useSLReadingProgress';

import style from './End.module.css';

const End = () => {
  const { id: examId } = useParams();
  const data = JSON.parse(localStorage.getItem('sentence'));
  const progress = useSLReadingProgress(data, examId);
  const [isLoading, setIsLoading] = useState(true);
  const { logId } = useSelector(state => state.selfLearningReadingExercise);

  useEffect(() => {
    if (logId || localStorage.getItem('logId')) {
      setIsLoading(false);
    }

    if (!logId) return;
    localStorage.setItem('logId', logId);
  }, [logId]);

  return (
    <Fragment>
      {!isLoading ? (
        <div className="bg-primary-500 min-h-screen w-full text-center px-px-20">
          <div className={`${style.container}`}>
            <div className={`font-bold text-30 text-${progress.style?.color}`}>{progress.style?.label}</div>
            <div className={`w-full bg-white rounded-px-4 flex align-center justify-center ${style.image}`}>
              <img src="/images/learning-end.svg" />
            </div>
            <div className={`pt-px-24 pb-px-16 font-bold text-14 text-basic-400 ${style.description}`}>
              今回の理解度
            </div>
            <div className={`font-bold text-${progress.style?.color} ${style.percentage}`}>
              {progress?.percentage}<span className="text-30">%</span>
            </div>
            <div className="flex items-center justify-center px-px-12 pt-px-8">
              <div className={`h-px-5 flex-auto rounded bg-primary-200`}>
                <div
                  className={`h-full rounded bg-${progress.style?.color}`}
                  style={{ width: `${progress?.percentage}%` }}
                />
              </div>
              <div className="text-basic-400 flex-initial pl-px-16 text-14 font-hiragino">
                <span className="font-bold">{progress?.correctChunks}</span> / {progress?.chunkLength} chunks
              </div>
            </div>
            <div className={`flex flex-col items-center justify-center ${style.buttons}`}>
              <Link to={`/self-learning/reading/${examId}/result`}>
                <Button
                  innerClass="px-px-38 text-14 cursor-pointer font-bold rounded-px-4"
                  type="white-square-wide"
                >
                  英文と訳を確認する
                </Button>
              </Link>
              <Link to="/">
                <Button
                  className="pt-px-16"
                  innerClass="px-px-11 text-14 cursor-pointer font-bold rounded-px-4"
                  type="white-square-wide"
                >
                  ダッシュボードへ戻る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading
          iconClass="bg-basic-300 text-basic-300"
          zIndex="z-0"
          height="h-screen"
          rootPosition="relative"
        />
      )}
    </Fragment>
  );
};

export default End;
