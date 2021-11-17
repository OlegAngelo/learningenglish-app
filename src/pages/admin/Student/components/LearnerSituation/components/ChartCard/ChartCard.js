import React from 'react';

import ProgressBar from '../../../../../../../shared/ProgressBar';

import style from './ChartCard.module.css';

const ChartCard = ({
  children: chart,
  mainScore,
  mainTitle,
  progressHead,
  progressNum,
  progressPct,
}) => {
  return (
    <div className="relative px-px-23 py-px-20 flex flex-col justify-between bg-adminGray-100">
      <div className="font-bold">
        <p className="text-14 leading-px-14 text-base-dark">{mainTitle}</p>
        <p className="mt-1 text-18 leading-px-18 text-secondary-500">{mainScore}</p>
      </div>

      {chart}

      <div className="font-bold">
        <p className="text-12 leading-px-12 text-adminPrimary-700">{progressHead}</p>
        <div className="mt-2 flex items-center">
          <span className="mr-1 text-16 leading-px-16 text-adminSecondary-300">{progressNum}</span>
          <ProgressBar
            color="bg-secondary-500"
            bgColor="bg-basic-300"
            type="rounded"
            done={progressPct}
            height="8"
            className={style.progressBar}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
