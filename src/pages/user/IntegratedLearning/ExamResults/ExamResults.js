import React, { useEffect, useState } from 'react';
import { upperCaseFirst } from '../../../../utils/text.js';

import Header from '../../../../shared/Header/Header';
import ResultCard from './components/ResultCard'
import Player from '../../../../shared/Header/Player.js';

import styles from './ExamResult.module.css';

const ExamResults = ({ match }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const category = match.params.category;
  const data = [
    {
      id: 1,
      question: 'What are they discussing ?',
      itemCorrect: true
    },
    {
      id: 2,
      question: 'What are they discussing ?',
      itemCorrect: true
    },
    {
      id: 3,
      question: 'What are they discussing ?',
      itemCorrect: true
    }
  ];

  const checkAllCorrect = () => {
    const isAllCorrect = data.every(item => item.itemCorrect === true);
    setIsAllCorrect(isAllCorrect);
  }

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    checkAllCorrect();
  }, [data])

  return (
    <div className={styles.examcontainer}>
      <Header
        hasBack={false}
        titleClass="font-semibold"
        title={`${upperCaseFirst(category)} ${category === 'reading' ? '検討事項を確認する' : '自分の意見を言う'}`}
      >
        <Player
          isPlaying={isPlaying}
          onClick={toggle}
          action="PLAY"
        />
      </Header>
      <div className="mt-px-24 text-center">
        <p className={`text-18 font-bold ${isAllCorrect ? 'text-secondary-200' : 'text-primary-500'}`}>
          {isAllCorrect ? '素晴らしい！' : 'もう少しです！'}
        </p>
        {isAllCorrect ? <div>
          <p className="text-basic-100 text-14 mt-px-15">全問正解です！</p>
          <p className="text-basic-100 text-14">問題をクリックして解説を確認しましょう</p>
        </div>
          : <div>
            <p className="text-basic-100 text-14 mt-px-15">間違えた問題に</p>
            <p className="text-basic-100 text-14 mt-px-3">もう一度チャレンジしましょう。</p>
          </div>}
      </div>
      <div className="mt-px-15">
        {
          data.map(key =>
            <div className="mt-2">
              <ResultCard questionNumber={key.id} question={key.question} itemCorrect={key.itemCorrect} />
            </div>
          )
        }
      </div>
      <div className={`mx-auto text-center ${styles.buttonContainer}`}>
        <button className={`bg-basic-400 text-primary-400 text-center font-bold text-14 ${styles.button}`} style={{ padding: isAllCorrect ?? '0px' }}>
          {
            isAllCorrect ? '単語・フレーズに進む' : '解答結果に戻る'
          }
        </button>
      </div>
    </div>
  )
}

export default ExamResults;
