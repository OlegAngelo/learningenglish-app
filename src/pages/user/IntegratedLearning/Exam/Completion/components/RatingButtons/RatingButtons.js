import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RatingButtons.module.css';

const LandingPageButton = ({ className, onClick, buttonText }) => {
  return (
    <div className={className}>
      <Link
        to="/training/integrated-result/1"
        className={`${styles.button} flex items-center justify-center outline-none rounded bg-basic-400 text-primary-400 text-14 font-bold shadow-btn w-px-162`}
        onClick={onClick}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default LandingPageButton;
