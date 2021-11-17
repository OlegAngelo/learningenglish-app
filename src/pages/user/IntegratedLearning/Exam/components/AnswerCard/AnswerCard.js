import React, { Fragment } from 'react';

import styles from './AnswerCard.module.css'

const AnswerCard = ({ answer, scenario, isCorrect }) => {
  return (
    <Fragment>
      <div className={scenario == 'failed' ? `bg-basic-300 ${styles.answercardFailed}` : (isCorrect ? `bg-primary-50 ${styles.answerCardCorrect}` : `bg-basic-400 ${styles.answercard}`)}>
        <p className="text-16 font-hiragino-kaku">{answer}</p>
      </div>
    </Fragment>
  )
}

export default AnswerCard;
