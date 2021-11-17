import React from 'react';

import ActionProgressBar from '../ActionProgressBar/ActionProgressBar';
import MicIcon from '../../../../../../../shared/icons/MicIcon';
import ListeningIcon from '../../../../../../../shared/icons/ListeningIcon';

import styles from './ResultTop.module.css';

const BodyUpper = () => {
  return (
    <div className={`${styles.body} bg-primary-50`}>
      <p className={`${styles.unit} text-primary-500 font-bold`}>Unit.1 会議</p>
      <p className={`${styles.lesson} text-primary-500 mb-2 font-bold`}>
        Lesson.1 自分の意見を言う
      </p>
      <div className={`${styles.div} grid grid-cols-1 justify-items-center`}>
        <img src="/images/learningResult.png" alt="" className={styles.img} />

        <ActionProgressBar
          color="bg-secondary-500"
          bgColor="bg-basic-300"
          type="rounded"
          done="100"
          icon={<MicIcon width="14" height="19" className={styles.icon} />}
          text="Speaking"
        ></ActionProgressBar>

        <ActionProgressBar
          className={styles.marginBottom}
          color="bg-secondary-500"
          bgColor="bg-basic-300"
          type="rounded"
          done="100"
          icon={<ListeningIcon width="24" height="24" color="#43596d" />}
          text="Listening"
        ></ActionProgressBar>
      </div>
    </div>
  );
};

export default BodyUpper;
