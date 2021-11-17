import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';

import Button from '../../../../../../shared/Button/Button';
import UserListeningApi from '../../../../../../api/SelfLearning/Listening/UserListeningApi';

import style from './End.module.css';

const End = () => {
  const { id } = useParams();
  const [correctAnswers, setCorrectAnswers] = useState();
  const [status, setStatus] = useState('');
  const [currentSet, setCurrentSet] = useState();
  const [nextSet, setNextSet] = useState();
  const totalQuestions = 10;

  const result = {
    'in-progress': {
      color: 'secondary-500',
      label: 'In Progress',
    },
    mastered: {
      color: 'progressBar-done',
      label: 'Mastered!',
    },
    '': {
      color: 'secondary-500',
      label: 'In Progress',
    },
  };

  const { color, label } = result[status];

  const setResultStatus = (score) => {
    return score >= 8 ? 'mastered' : 'in-progress';
  };

  useEffect(() => {
    UserListeningApi.getResults(id).then((res) => {
      const { log_listening_phrase_sum_is_correct_dictation: score } = res.data;
      setCorrectAnswers(score);
      setStatus(setResultStatus(score));
      setCurrentSet(res.data.set);
      setNextSet(res.data.nextSet);
    });
  }, []);

  return (
    <div className="bg-primary-500 h-screen w-full text-center px-px-20">
      <div
        className={`${style.container} h-full flex flex-col justify-between`}
      >
        {status ? (
          <div>
            <div className={`font-bold text-30 text-${color}`}>{label}</div>
            <div
              className={`w-full bg-white rounded-px-4 flex align-center justify-center ${style.image}`}
            >
              <img src="/images/learning-end.svg" />
            </div>
            <div
              className={`text-white pt-px-24 font-hiragino font-bold text-30`}
            >
              <span className="text-30">{totalQuestions}</span>問中
              <span className="text-40">{correctAnswers}</span>問正解
            </div>
          </div>
        ) : (
          <div className="test-28 text-white px-14">Calculating Results</div>
        )}
        <div
          className={`flex items-center`}
        >
          {nextSet && (
            <Link
              to={`/self-learning/listening/${nextSet.id}/exercise`}
              className="w-full mr-px-8"
            >
              <Button
                innerClass={`w-full text-14 text-center cursor-pointer font-bold rounded-px-4 ${style.button}`}
                type="white-square-wide"
              >
                { nextSet.level_id == currentSet.level_id
                  ? '次のSetへ'
                  : '次のLevelへ'
                } 
              </Button>
            </Link>
          )}
          <Link
            to="/"
            className="w-full"
          >
            <Button
              innerClass={`w-full text-14 text-center cursor-pointer font-bold rounded-px-4 ${style.button}`}
              type="white-square-wide"
            >
              ダッシュボードへ戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default End;
