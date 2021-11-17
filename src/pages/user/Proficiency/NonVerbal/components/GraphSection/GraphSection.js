import React, { useEffect, useState } from 'react';

import ProgressBar from '../../../../../../shared/ProgressBar';
import TriangleChart from '../../../../../../shared/TriangleChart';

import styles from './GraphSection.module.css';

const GraphSection = () => {

  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const responsiveProgressBar = () => {
    setProgressBarWidth(0);
    if (window.innerWidth <= 350) {
      setProgressBarWidth(210);
    } else if (window.innerWidth <= 375) {
      setProgressBarWidth(261);
    } else if(window.innerWidth <= 414) {
      setProgressBarWidth(299);
    } else if(window.innerWidth <= 768) {
      setProgressBarWidth(650);
    } else {
      setProgressBarWidth(900);
    }
  }

  useEffect(() => {
    responsiveProgressBar();
    window.addEventListener('resize', responsiveProgressBar);
  }, []);

  return (
    <section className="bg-primary-50 px-px-20">
      <div className={`${styles.headerTitle} header-title pt-px-17`}>
        <p className="font-semibold text-base text-primary-400">異文化・非言語コミュニケーション習熟度</p>
        <span className={`${styles.overallResult} font-semibold inline-block leading-none pt-px-4 text-3xl text-secondary-500`}>0000</span>
      </div>
      <TriangleChart
        classes="m-auto"
        reading={78}
        speaking={100}
        sizeInPercent={78}
      />
      <div>
        <p className="font-semibold mt-px-2 text-14 text-primary-400 text-sm">習得したCanan-Do</p>
        <div className="flex pb-px-24">
          <span className="font-semibold text-secondary-500 text-xl mr-px-12">1245</span>
          <div className="flex items-center">
            <ProgressBar
              color="bg-secondary-500"
              bgColor="bg-basic-300"
              type="rounded"
              done="30"
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
