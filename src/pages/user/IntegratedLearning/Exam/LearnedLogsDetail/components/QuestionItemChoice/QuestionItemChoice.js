import React from 'react';

import Circle from '../../../../../../../shared/icons/Circle';

import styles from './QuestionItemChoice.module.css'

function QuestionnaireItem({ text, isCorrect }) {

  return (
    <div className={`h-px-63 ${styles.choice} flex`}>
      <div className="pt-px-17 pb-px-21 pl-px-1 pr-px-10" >
        {isCorrect ? (
          <Circle className="fill-white" />
        ) : (
            <Circle strokeWidth="0" className="fill-white" />
          )}
      </div>
      <div className="grid place-items-center" >
        <p className="font-hiragino font-normal text-14 leading-px-21 text-basic-100 capitalize" >
          {text}
        </p>
      </div>
    </div>
  );
};

export default QuestionnaireItem;
