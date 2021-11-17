import React from 'react';

import Button from '../../../../../shared/Button/Button';
import TimerQuickStartIcon from '../../../../../shared/icons/TimerQuickstartIcon';

import styles from './QuickstartOption.module.css';

const QuickstartOption = ({ title, subTitle, buttonText, fromPage = 'Dashboard' }) => {
  const getSpacing = () => { return (window.innerWidth <= 350) ? 'space-x-1' : 'space-x-10'; }

  return (
      <div className={`flex flex-row items-center ${getSpacing} ${styles[`container${fromPage}`]}`}>
        <div className={`flex items-center ${styles[`left${fromPage}Container`]}`}>
          <TimerQuickStartIcon />
          <div className={`text-basic-400 font-bold text-left tracking-tight leading-px-20 ml-5 ${styles[`text${fromPage}Container`]}`}>
            <span className={`text-12 ${fromPage === 'Dashboard' && 'mr-3'}`}>
              {title}
            </span>
            <span className="text-15">
              {subTitle}
            </span>
          </div>
        </div>
        <div className={`text-basic-400 font-bold text-12 ${styles.rightContainer}`}>
          <Button className="h-5" type="white-flexible" innerClass={styles[`button${fromPage}`]}>{buttonText}</Button>
        </div>
      </div>
  );
};

export default QuickstartOption;
