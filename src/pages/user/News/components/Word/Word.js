import React from 'react';

import styles from './Word.module.css';

const Word = ({ word, translation }) => {
  return (
    <div className={`bg-white border-b-px-3 border-background-200 ${styles.card}`}>
      <div className="pt-px-11 pl-px-15 font-hiragino-kaku">
        <div className={`text-secondary-40 text-16 font-bold underline ${styles.word}`}>{word}</div>
        <div className="text-basic-200 text-14 pt-px-4">{translation}</div>
      </div>
    </div>
  );
};

export default Word;
