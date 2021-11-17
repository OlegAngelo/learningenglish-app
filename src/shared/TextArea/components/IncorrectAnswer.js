import React from 'react';

import styles from '../TextArea.module.css';

const IncorrectAnswer = ({ sentence, incorrectIndices, textAreaPadding, borderColor='#03DAC6' }) => {

  return (
    <div className={`${styles.textArea} ${textAreaPadding}`} >
      <div className={`bg-basic-400 mx-2 flex flex-wrap content-center shadow-btn-choice text-basic-100 rounded ${styles.boxSize}`}
        style={{ border: `2px solid ${borderColor}` }}>
        <div className={`${styles.textBoxSettings} inline-block align-middle items-center focus:outline-none resize-none text-left font-hiragino font-bold text-20`}>
          <div className={`${styles.incorrectWordBoxFormat} pl-4`}>
            {sentence.split(' ').map((word, index) => (
              <span key={index} className={`inline-block leading-none pr-1 text-20 ${incorrectIndices.includes(index) ? styles.incorrectWordColor : ''}`}>
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncorrectAnswer;
