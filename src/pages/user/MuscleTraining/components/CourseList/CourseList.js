import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import KeyboardArrowRight from '../../../../../shared/icons/KeyboardArrowRight';
import LockIcon from '../../../../../shared/icons/LockIcon';
import ProgressBar from '../../../../../shared/ProgressBar';
import styles from './CourseList.module.css';

const CourseList = ({
  isStarted = true,
  unitTitle,
  word,
  phrase,
  unitId,
  hasRightIcon = true,
}) => {
  const location = useLocation();
  const [progressBarWidth, setProgressBarWidth] = useState(186);
  const history = useHistory();
  const isFromSL = !!location.pathname.match('/self-learning');

  const checkIfDone = (item) => {
    return item.master === 100;
  };

  const handleProgressBarResponsiveness = () => {
    if (window.innerWidth <= 320) {
      setProgressBarWidth(150);
    } else {
      setProgressBarWidth(186);
    }
  };

  const getFinalPercentage = (percentage) => {
    return (percentage > 99 && percentage < 100) ? Math.floor(percentage) : Math.round(percentage);
  };

  const redirectTo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem('course_result_prev_page', 'muscle-courses');
    history.push(`/training/muscle-courses/${unitId}/lesson-log/result`);
  }

  useEffect(() => {
    handleProgressBarResponsiveness();
    window.addEventListener('resize', handleProgressBarResponsiveness);
  });

  return (
    <Fragment>
      {isStarted
        ? (<div className={`h-px-95 mt-0.5 ${styles.courseList}`}>
            <div className="flex justify-between">
              <p className="font-hiragino-kaku text-16 leading-px-20 font-bold text-basic-100">{unitTitle}</p>
              <button onClick={(e) => redirectTo(e)}>
                <p className="font-hiragino text-11 font-bold text-primary-500 mt-px-1">単語・フレーズの習熟度</p>
              </button>
            </div>
            <div className="mt-px-21 relative">
              <div className="flex pl-px-18">
                <p className={`text-10 text-basic-100 pr-px-5 ${checkIfDone(word) && 'text-progressBar-done'}`}>単語</p>
                <div className="mt-px-4">
                  <ProgressBar
                    done={word.master}
                    progress={word.in_progress}
                    width={progressBarWidth}
                    height="5"
                    color="bg-secondary-500"
                    bgColor="bg-primary-200"
                    doneBarColor="bg-progressBar-done"
                    type="rounded"
                    isMerge={checkIfDone(word) ? false : true}
                  />
                </div>
                <p className={`text-10 text-basic-200 ${styles.strengthWord} ${checkIfDone(word) && 'text-progressBar-done font-bold'}`}>Mastered {getFinalPercentage(word.master)} %</p>
              </div>
              <div className="flex -mt-px-1 -ml-px-1">
                <p className={`text-10 text-basic-100 pr-px-4 ${checkIfDone(phrase) && 'text-progressBar-done'}`}>フレーズ</p>
                <div className="mt-px-5">
                  <ProgressBar
                    done={phrase.master}
                    progress={phrase.in_progress}
                    width={progressBarWidth}
                    height="5"
                    color="bg-secondary-500"
                    bgColor="bg-primary-200"
                    doneBarColor="bg-progressBar-done"
                    type="rounded"
                    barType={checkIfDone(phrase) ? 'rounded' : 'square-right'}
                    isMerge={checkIfDone(phrase) ? false : true}
                  />
                </div>
                <p className={`text-10 text-basic-200 pl-px-3 ${styles.strength} ${checkIfDone(phrase) && 'text-progressBar-done font-bold'}`}>Mastered {getFinalPercentage(phrase.master)} %</p>
              </div>
              {
                hasRightIcon && (
                  <div className="absolute top-0 right-px-1">
                    <KeyboardArrowRight color="#044071" height="12.62"/>
                  </div>
                )
              }
            </div>
          </div>
        )
        : (
          <div className={`mt-0.5 bg-background-200 ${styles.courseListDisabled}`}>
            <p className="font-hiragino-kaku text-16 leading-px-20 font-bold text-basic-300">{unitTitle}</p>
            <div className="flex justify-center -mt-px-7">
              <LockIcon />
            </div>
          </div>
        )
      }
    </Fragment>
  );
};

export default CourseList;
