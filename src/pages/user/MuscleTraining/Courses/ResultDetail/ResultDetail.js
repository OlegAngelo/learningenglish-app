import React from 'react';

import Header from '../../../../../shared/Header';
import QuestionnaireFooter from '../../components/QuestionnaireFooter';

import styles from './ResultDetail.module.css';

const ResultDetail = () => {
  const title = '筋トレUnit 1 自己紹介';
  const engQuestion = 'What do you think about cutting the cost? ';
  const japQuestion = '原価を削るのはどうでしょうか？';
  const explanationAnswer = '「 原価を削るのはどうでしょうか？ 」 という妥協を表す表現です 。';

  return (
    <div className="h-full flex flex-col">
      <div className={styles.questionnaireBackground}>
        <Header
          title={title}
          hasBack={true}
        />

        <div className={styles.questionSize}>
          <p className="font-normal text-24">{engQuestion}</p>
          <p className={`font-normal text-18 pt-2 ${styles.japQuestionSize}`} >{japQuestion}</p>
        </div>

        <div className={`bg-basic-400 text-basic-100 rounded p-4 mx-2 ${styles.cardSize}`}>
          <p className="font-hiragino font-bold text-16 text-primary-500">解説</p>
          <p className={`${styles.answerFormat} font-hiragino font-normal text-14 pt-2`} >{explanationAnswer}</p>
        </div>

        <QuestionnaireFooter
          hasBack={true}
          hasSkip={false}
          hasSpeaker={true}
          hasNext={false}
        />
      </div>
    </div>
  );
};

export default ResultDetail;
