import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

import Button from '../../../../../shared/Button';

import { IsFromAdminHelper } from '../../../../../utils/IsFromAdminHelper';

import style from './Completion.module.css';

const Completion = () => {
  const location = useLocation();
  const isFromAdmin = IsFromAdminHelper();
  const totalQuestions = location.state.totalQuestions ?? 0;
  const correctAnswers = location.state.correctAnswers ?? 0;

  return (
    <div className=" w-full h-screen flex flex-col justify-between bg-primary-500 px-px-20">
      <div className="w-full text-center">
        <div className={`text-white font-hiragino font-bold text-14 ${style.title}`}>確認問題終了</div>
        <div className={`text-white font-hiragino font-bold text-30 ${style.score}`}>
          <span className="text-30">{totalQuestions}</span>問中<span className="text-40">{correctAnswers}</span>問正解
        </div>
        <div className={`w-full bg-white rounded-px-4 flex align-center justify-center ${style.image}`}>
          <img src="/images/learning-end.svg"/>
        </div>

        <div className={`text-white font-hiragino font-bold text-14 ${style.content}`}>
          Good effort！
        </div>
      </div>
      { !isFromAdmin &&
        <div className="w-full left-0 mb-px-50 flex justify-center">
          <Link to="/">
            <Button
              innerClass="text-14 cursor-pointer"
              type="white-square-normal-wider"
            >
              ダッシュボードへ戻る
            </Button>
          </Link>
        </div>
      }
    </div>
  );
};

export default Completion;
