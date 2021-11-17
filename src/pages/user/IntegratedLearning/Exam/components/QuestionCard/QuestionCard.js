import React from 'react';

import styles from './QuestionCard.module.css';

const QuestionCard = ({ questionNumber, question, leftMargin = '', textStyle = 'text-14' }) => {
  return (
    <div>
      <div className={`bg-basic-500 ${styles.questionContainer}`}>
        <p className={`text-primary-500 text-14 text-center font-bold ${styles.questionNum}`}>Question.{questionNumber}</p>
      </div>
      <p className={`text-basic-100 font-semibold mt-0.5 ${textStyle} ${leftMargin} ${styles.letterSpace}`}>{question}</p>
    </div>
  )
}

export default QuestionCard;
