import React from 'react';

import styles from './Commentary.module.css';

const Commentary = ({ questionWord }) => {
  const commentaryText = '「 原価を削るのはどうでしょうか？ 」 という妥協を表す表現です 。';
  const exampleSentence = {
    EN: 'We have contracted that firm for the job.',
    JP: '我々はその会社とその仕事の契約を結んだ。',
  };

  return (
    <div className="pt-px-57 pb-px-63">
      <div className="text-basic-100 text-center">
        <p className="font-sf-pro-text text-24 leading-px-19">{questionWord.EN}</p>
        <p className="mt-px-8 text-18 leading-px-27">{questionWord.JP}</p>
      </div>

      <div className="mx-px-8 mt-px-76 grid grid-cols-1 gap-px-8">
        <div className="p-px-16 bg-basic-400 rounded-px-4">
          <p className="font-bold text-16 leading-px-23 text-primary-500">例文</p>
          <div className="mt-px-8 mb-px-42 text-basic-100">
            <p className={`${styles.exampleSentenceEn} break-words font-extrabold text-14`}>{exampleSentence.EN}</p>
            <p className={`${styles.exampleSentenceJp} break-words text-14`}>{exampleSentence.JP}</p>
          </div>
        </div>

        <div className="p-px-16 bg-basic-400 rounded-px-4">
          <p className="font-bold text-16 leading-px-23 text-primary-500">解説</p>
          <p className="mt-px-8 mb-px-18 text-14 leading-px-24 text-basic-100 break-words">{commentaryText}</p>
        </div>
      </div>
    </div>
  );
};

export default Commentary;
