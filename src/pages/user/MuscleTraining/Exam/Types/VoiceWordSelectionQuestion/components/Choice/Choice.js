import React from 'react';
import styles from './Choice.module.css'

const Choice = ({text, color, textColor}) => {
  return (
    <div className="mt-2">
      <p 
        style={{ backgroundColor: color, color: textColor}} 
        className={`bg-basic-400 text-basic-100 text-14 min-h-px-41 w-full text-left focus:outline-none ${styles.choice}`}
      >
        {text}
      </p>
    </div>
  );
}

export default Choice;
