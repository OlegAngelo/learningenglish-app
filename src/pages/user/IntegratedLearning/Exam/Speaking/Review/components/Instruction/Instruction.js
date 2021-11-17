import React from 'react';

import styles from './Instruction.module.css';

const Instruction = ({ instruction, state }) => {
  return (
    <div className="flex justify-center">
      { 
        (state === 'review' && (
          <span className={`text-14 font-bold text-primary-500 text-center ${styles.instruction}`}>{instruction}</span>
        ))
      }
    </div>
  );
};

export default Instruction;
