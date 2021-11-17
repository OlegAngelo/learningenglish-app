import React from 'react';

import Tag from '../../../../../../shared/Tag/Tag';

import styles from './PostQuestion.module.css';

const PostQuestion = ({ questionNumber, question }) => {
  return (
    <div className={`${styles.questionContainer} font-hiragino`}>
      <Tag
        className={`ml-1`}
        size="l"
        color="lightGray"
        width="118.27px"
        darkBlue pill weightBold
      >
        Question. {questionNumber}
      </Tag>
      <p className={`${styles.textQuestion} text-basic-100 text-16 font-bold`}>{question}</p>
    </div>
  )
}

export default PostQuestion;
