import React from 'react';

import styles from './Instruction.module.css';

const Instruction = ({ instruction, subDialogue, className, state, isShowExplanation, type }) => {
  const showInstruction = () => {
    return ((state === 'feedback' && type === 'single') || isShowExplanation);
  };

  return (
    <div className={`${className} ${styles.container}`}>
      { !showInstruction() && (
        <div className={`whitespace-pre-line text-center text-14 font-bold text-primary-500 ${styles.instruction}`}>
          {instruction}
        </div>
      )}
      { subDialogue && (
        <div className={`text-center text-14 mt-px-17 text-basic-100 ${styles.subDialogue}`}>
          {subDialogue}
        </div>
      )}
    </div>
  );
};

export default Instruction;
