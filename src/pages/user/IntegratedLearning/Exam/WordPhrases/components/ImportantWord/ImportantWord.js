import React from 'react';
import KeyboardArrowRight from '../../../../../../../shared/icons/KeyboardArrowRight';
import CheckboxIcon from '../../../../../../../shared/icons/CheckboxIcon';
import styles from './ImportantWord.module.css';

const ImportantWord = ({ word, translation }) => {
  return (
    <div
      className={`flex justify-between bg-white w-full mb-2 shadow-btn-choice rounded-px-4 h-px-100 px-4 pb-4 ${styles.wordCard}`}
    >
      <div className="font-hiragino-kaku">
        <div className="text-basic-100 text-16 leading-px-24 font-theme-bold">{word}</div>
        <div className={`text-basic-200 text-14 font-theme-regular ${styles.wordCardText}`}>{translation}</div>
        <div className={styles.wordCardCheckboxWrapper}>
          <CheckboxIcon className={styles.wordCardCheckbox} />
          <span className={`text-12 font-hiragino text-primary-400 leading-px-14 font-theme-regular ${styles.wordCardCheckboxText}`}>CheckListに追加</span>
        </div>
      </div>
      <div className="self-center">
        <KeyboardArrowRight color="rgba(0, 0, 0, 0.54)" width="8" />
      </div>
    </div>
  );
};

export default ImportantWord;
