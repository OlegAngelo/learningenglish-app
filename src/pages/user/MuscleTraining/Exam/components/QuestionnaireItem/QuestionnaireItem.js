import React from 'react';
import styles from './QuestionnaireItem.module.css'

function QuestionnaireItem({text, onClick, color = 'bg-basic-400', textColor}) {

  return (
    <div className="mt-2">
      <button
        style={{ color: textColor }}
        className={`${color} text-basic-100 rounded text-14 h-px-64 w-full shadow-btn-choice text-left focus:outline-none ${styles.choice}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default QuestionnaireItem;
