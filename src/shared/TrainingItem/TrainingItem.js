import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import KeyboardArrowRight from '../icons/KeyboardArrowRight';
import LockIcon from '../icons/LockIcon';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './TrainingItem.module.css';

const TrainingItem = ({
  isStarted = true,
  unitTitle,
  proficiency = null,
  unitId,
  hasRightIcon = true,
  checkIfDone,
  getFinalPercentage,
  progressBarWidth,
  className = '',
  isComingSoon = false,
}) => {
  const comingSoonText = 'Coming Soon...';

  return (
    <Fragment>
      {isStarted ? (
        <div className={`h-px-95 mt-0.5 ${styles.traningItem} ${className} relative`}>
          <div className="flex justify-between">
            <p className="font-hiragino-kaku text-16 leading-px-20 font-bold text-basic-100">
              {unitTitle}
            </p>
          </div>
          {isComingSoon &&
            <Fragment>
              <div className={`absolute cursor-not-allowed opacity-60 bg-white z-10 top-0 left-0 w-full h-full`}></div>
              <div className={`absolute self-center text-primary-300 z-20 text-center left-0 right-0`}>
                {isComingSoon && comingSoonText}
              </div>
            </Fragment>
          }
          <div className={`mt-px-21 relative`}>
            <div className="flex pt-1 -mt-px-1 -ml-px-1">
              <p
                className={`text-10 text-basic-100 pr-px-4 ${
                  checkIfDone(proficiency) && 'text-progressBar-done'
                }`}
              >
                達成度
              </p>
              <div className="mt-px-5">
                <ProgressBar
                  done={proficiency.master}
                  progress={proficiency.in_progress}
                  width={progressBarWidth}
                  height="5"
                  color="bg-secondary-500"
                  bgColor="bg-primary-200"
                  doneBarColor="bg-progressBar-done"
                  type="rounded"
                  barType={checkIfDone(proficiency) ? 'rounded' : 'square-right'}
                  isMerge={checkIfDone(proficiency) ? false : true}
                />
              </div>
              <p
                className={`text-10 text-basic-200 pl-px-3 ${styles.strength} ${
                  checkIfDone(proficiency) && 'text-progressBar-done font-bold'
                }`}
              >
                Mastered {getFinalPercentage(proficiency.master)} %
              </p>
            </div>
            {hasRightIcon && (
              <div className="absolute top-0 right-px-1">
                <KeyboardArrowRight color="#044071" height="12.62" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`mt-0.5 bg-background-200 ${styles.traningItemDisabled}`}
        >
          <p className="font-hiragino-kaku text-16 leading-px-20 font-bold text-basic-300">
            {unitTitle}
          </p>
          <div className="flex justify-center -mt-px-7">
            <LockIcon />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TrainingItem;
