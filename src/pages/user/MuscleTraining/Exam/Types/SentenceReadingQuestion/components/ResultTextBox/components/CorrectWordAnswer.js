import React from 'react';

import styles from '../ResultTextBox.module.css';

const CorrectWordAnswer = ({ word, textAreaPadding }) => {

  return (
    <div className={`${styles.textArea} ${textAreaPadding}`} >
      <div className={`bg-basic-400 mx-2 flex flex-wrap content-center shadow-btn-choice text-basic-100 rounded ${styles.wordBoxSize}`}
        style={{ border: '2px solid #03DAC6' }}>
        <div className={`${styles.wordTextBoxSettings} inline-block align-middle items-center focus:outline-none resize-none text-left font-hiragino font-bold text-20`}>
          <div className={`${styles.wordBoxFormat} pl-4`}>
            <span className={`inline-block leading-none pr-1 text-20 `} >
              {word}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectWordAnswer;
