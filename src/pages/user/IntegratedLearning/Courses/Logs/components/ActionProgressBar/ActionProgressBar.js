import React from 'react';

import ProgressBar from '../../../../../../../shared/ProgressBar/ProgressBar';

import styles from './ActionProgressBar.module.css';

const ActionProgressBar = ({ icon = '', text = '', className = '', done = '', color = '', bgColor = '', type = '', ...props }) => {
  return (
    <div
      className={`${styles.progressBox} ${className} grid grid-cols-12 gap-2 place-content-center items-center`}
      {...props}
    >
      <div>{icon}</div>
      <div
        className={`${styles.actionText} sm:col-span-2 col-span-3 text-primary-300`}
      >
        {text}
      </div>
      <div className="col-span-8">
        <ProgressBar done={done} width="100%" height="16" className="my-px-10" color={color} bgColor={bgColor} type={type} />
      </div>
    </div>
  );
};

export default ActionProgressBar;
