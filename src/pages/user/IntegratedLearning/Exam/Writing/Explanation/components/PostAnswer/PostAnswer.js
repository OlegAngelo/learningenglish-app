import React, { Fragment } from 'react';

import Circle from '../../../../../../../../shared/icons/Circle';

import styles from './PostAnswer.module.css'

const PostAnswer = ({ answer, isGreat }) => {
  return (
    <Fragment>
      <div className={`${styles.answercard} mt-1 bg-basic-400 flex items-center font-hiragino-kaku relative`}>
        <div className={ `${styles.circleIconWrapper}` } >
          { isGreat ? (
            <div>
              <Circle className="fill-white" strokeWidth="2" radius="11.5"/>
              <Circle className="fill-white -ml-6" strokeWidth="2" radius="4.5"/>
            </div>
            ) : (
              <Circle className="fill-white" strokeWidth="2" radius="11.5"/>
            )
          }
        </div>
        <p className={`${styles.answerText} text-16 text-basic-100 font-hiragino-kaku`}>{answer}</p>
      </div>
    </Fragment>
  );
};

export default PostAnswer;
