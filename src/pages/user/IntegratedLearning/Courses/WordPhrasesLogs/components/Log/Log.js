import React from 'react';
import Button from '../../../../../../../shared/Button/Button';
import LogQuestion from '../LogQuestion/LogQuestion';

import style from './Log.module.css';

const Log = () => {
  return (
    <div>
      <div className={`bg-basic-400 ${style.wordPhrasesLogCard}`}>
        <div className={style.wordPhrasesLogCardDescription}>
          <span className="text-16 text-primary-500 font-bold">
            Listening 自分の意見を言う
          </span>
        </div>
        <LogQuestion />
      </div>
      <div className={style.line}></div>
      <div className={`bg-basic-400 ${style.wordPhrasesLogCard}`}>
        <div className={`${style.wordPhrasesLogCardDescription}`}>
          <span className="text-16 text-primary-500 font-bold">
            Reading 議事録を確認する
          </span>
        </div>
        <LogQuestion />
      </div>
      <Button className={`flex justify-center ${style.wordPhrasesLogButton}`} type="white-bold">
        トレーニングを再チャレンジ
      </Button>
    </div>
  );
};

export default Log;
