import React from 'react';

import styles from './FooterButton.module.css';

function FooterButton({ className, onClick, buttonText }) {
  return (
    <div className={className}>
      <button
        className={`${styles.button} flex items-center justify-center outline-none rounded bg-basic-400 text-primary-400 text-14 font-bold shadow-btn w-px-162`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default FooterButton;
