import React from 'react';

import styles from './PostQuestion.module.css';

const PostQuestion = ({ question }) => {
  return (
    <div className={`${styles.questionContainer} font-hiragino rounded mx-4`}>
      <p className={`${styles.textQuestion} text-basic-100 text-20 font-bold p-3`}>{question}</p>
    </div>
  );
};

export default PostQuestion;
