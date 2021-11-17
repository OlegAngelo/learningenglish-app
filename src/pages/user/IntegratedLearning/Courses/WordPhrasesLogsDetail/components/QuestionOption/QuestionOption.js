import React from 'react';

import EllipseIcon from '../../../../../../../shared/icons/EllipseIcon';
import styles from './QuestionOption.module.css';

const QuestionOption = ({ text = '', active = false, className = '', last = false }) => {
  return (
    <div>
      <div className={`${styles.line} bg-basic-300`}></div>
      <div className={`${styles.option} flex items-center ${className}`}>
        <div className={`${styles.divIcon} mb-1`}>
          {active && <EllipseIcon className={styles.icon} />}
        </div>
        <h1 className={`${styles.questionText} text-14 col-start-3 col-end-13 font-normal font-hiragino-kaku`}>
          {text}
        </h1>
      </div>
      {last && <div className={`${styles.line} bg-basic-300`}></div>}
    </div>
  );
};

export default QuestionOption;
