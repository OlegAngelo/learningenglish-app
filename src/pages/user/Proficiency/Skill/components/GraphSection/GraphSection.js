import React, { useEffect, useState } from 'react';
import PieChart from '../../../../../../shared/PieChart';
import ProgressBar from '../../../../../../shared/ProgressBar';

import styles from './GraphSection.module.css';

import data from './data';

const GraphSection = () => {
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setProgressBarWidth(0);
      if (window.innerWidth <= 350) {
        setProgressBarWidth(210);
      }
      else if(window.innerWidth <= 375) {
        setProgressBarWidth(261);
      }
      else if(window.innerWidth <= 414) {
        setProgressBarWidth(298);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <section className="bg-primary-50 px-px-22">
      <div className={`${styles.headerTitle} header-title pt-px-17`}>
        <p className="font-semibold text-base text-primary-400">技能習熟度</p>
        <span className={`${styles.overallResult} font-semibold inline-block leading-none pt-px-4 text-3xl text-secondary-500`}>0000</span>
      </div>
      <div className={`${styles.diamondGraph}`}>
        <PieChart dataset={data['pieChart']} width="430" height="330"/>
      </div>
      <div>
        <p className={`font-semibold text-14 text-primary-400 text-sm mt-px-1`}>習得したCanan-Do</p>
        <div className="flex pb-px-24">
          <span className="font-semibold text-secondary-500 text-xl mr-px-12">1245</span>
          <div className={`flex items-center`}>
            <ProgressBar
              color="bg-secondary-500"
              bgColor="bg-basic-300"
              type="rounded"
              done="26"
              width={progressBarWidth}
              height="8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GraphSection;
