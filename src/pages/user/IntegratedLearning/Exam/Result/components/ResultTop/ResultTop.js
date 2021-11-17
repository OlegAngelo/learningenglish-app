import React from 'react';

import ActionProgressBar from '../ActionProgressBar/ActionProgressBar';
import DiamondChart from '../../../../../../../shared/DiamondChart/DiamondChart';
import MicIcon from '../../../../../../../shared/icons/MicIcon';
import ListeningIcon from '../../../../../../../shared/icons/ListeningIcon';
import styles from './ResultTop.module.css';

const ResultTop = () => {
  return (
    <div className={`${styles.body} bg-primary-50`}>
      <div className="bg-primary-50 align-top py-0 relative">
        <div className={`${styles.learningScore}`}>
          <span className={`text-primary-400 font-theme-bolder text-16`}>技能習熟度</span>
          <br/>
          <span className={`text-secondary-500 font-theme-bolder text-30`}>0000</span>
        </div>
        <div className={`flex px-4 justify-center pb-3 pt-1.5`}>
          <center>
            <DiamondChart reading={80} speaking={100} listening={60} writting={75} sizeInPercent={96} />
          </center>
        </div>
        <div className={`${styles.div} grid grid-cols-1 justify-items-center`}>
          <ActionProgressBar
            className="ml-px-5"
            color="bg-primary-500"
            bgColor="bg-primary-100"
            type="square"
            done="70"
            icon={<MicIcon width="12" height="17" className={styles.icon} />}
            text="Speaking"
          />
          <ActionProgressBar
            className="ml-px-5"
            color="bg-secondary-500"
            bgColor="bg-basic-300"
            type="square"
            done="100"
            icon={<ListeningIcon width="24" height="24" color="#43596d" />}
            text="Listening"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultTop;
