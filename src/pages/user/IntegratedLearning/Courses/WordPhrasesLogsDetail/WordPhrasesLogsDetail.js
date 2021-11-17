import React from 'react';

import Button from '../../../../../shared/Button/Button';
import Header from '../../../../../shared/Header/Header';
import Tag from '../../../../../shared/Tag/Tag';
import QuestionOption from './components/QuestionOption/QuestionOption';
import styles from './WordPhrasesLogsDetail.module.css';

const WordPhrasesLogsDetails = (props) => {
  return (
    <div className={`${styles.wordphraseContainer} min-h-screen bg-background-200`}>
      <div className={`${styles.header} bg-primary-500 flex items-end`}>
        <div className="w-full">
          <Header hasBack={true} title="統合学習 Unit.1 Lesson.1" />
        </div>
      </div>

      <div className="pb-px-10">
        <div className={`rounded m-2.5 ${styles.whiteDiv}`}>
          <h4 className={`${styles.unit} text-16 text-center font-bold text-basic-100`}>
            問題解説
          </h4>

          <Tag size="l" color="lightGray" className={styles.questionTag} weightBold>
            Question.1
          </Tag>

          <p className={`${styles.question} text-16 text-basic-100 font-bold`}>
            What are they discussing?
          </p>

          <div>
            <QuestionOption className={styles.opt1} text="How to improve the sales of their product." active />
            <QuestionOption className={styles.opt2} text="How to Improve The Employees' Work Efficiency." />
            <QuestionOption className={styles.opt3} text="When to release their new product." last />
          </div>

          <div className={styles.pointDiv}>
            <h4 className={`${styles.point} text-14 font-bold text-primary-400 text-center`}>
              Point
            </h4>
            <p className={`${styles.pointTxt} text-14 font-normal text-black font-hiragino-kaku`}>
              アジェンダによると、協議項目１は Sales improvement of
              CleanBusterとある。
              『クリーン・バスター』という製品の売上回復について話し合うこと
              が読み取れる 。
            </p>

            <div className={`flex justify-center ${styles.btn}`}>
              <Button type="darkblue-square"> 本文を見る </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPhrasesLogsDetails;
