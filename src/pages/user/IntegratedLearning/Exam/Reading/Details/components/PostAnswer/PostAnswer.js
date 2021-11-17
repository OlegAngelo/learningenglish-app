import React, { Fragment } from 'react';

import Circle from '../../../../../../shared/icons/Circle';

import styles from './PostAnswer.module.css'

const PostAnswer = ({ answer, isCorrect }) => {
  return (
    <Fragment>
      <div className={`${styles.answercard} mt-1 bg-basic-400 flex items-center font-hiragino-kaku relative`}>
        <div className={ `${styles.circleIconWrapper}`} >
          { isCorrect && <Circle className={`fill-white `} /> }
        </div>
        <p className={`${styles.answerText} text-14 text-basic-100 font-hiragino-kaku`}>{answer}</p>
      </div>
    </Fragment>
  )
}

export default PostAnswer;
