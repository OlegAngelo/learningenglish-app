import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import UnitBox from '../UnitBox';
import ChevronDownIcon from '../../../../../shared/icons/ChevronDownIcon';
import ChevronUpIcon from '../../../../../shared/icons/ChevronUpIcon';


import styles from '../../LearningLogs.module.css';

const News = () => {
  const [isShown, setIsShown] = useState(false);
  const {
    newsLogs,
  } = useSelector((state) => state.learningLogs);

  const setOverlay = () => {
    if (newsLogs.length === 0) return styles.overlay;
  };

  return (
    <div className="mb-px-4">
      <div
        className={`flex ${setOverlay()} justify-between bg-primary-50 h-px-64 pl-px-8 pr-px-22 text-basic-100 font-bold`}
        onClick={() => newsLogs.length != 0 && setIsShown(!isShown)}
      >
        <div className="flex items-center">
          <div className="rounded-full w-px-48 h-px-48 bg-basic-400 flex items-center justify-center">
            <img className="w-px-32" src="/images/Library.svg" alt="Study Room Image"/>
          </div>
          <div className="pl-px-16 text-18">図書館</div>
        </div>
        <div className="flex items-center">
          <div className="ml-px-22">
            {isShown ? <ChevronUpIcon color="#044071"/> : <ChevronDownIcon color="#044071"/>}
          </div>
        </div>
      </div>
      <div className={`${styles.accordion} ${isShown ? styles.expand : styles.collapse}`}>
      <Fragment>
            <div className="font-bold text-primary-500 text-18 mt-px-20 ml-px-20 mb-px-16">
              News
            </div>
            {newsLogs.map((session, index) => (
              <div key={index}>
                <UnitBox
                  paragraphclassname={`${styles.unitBox} mb-px-14`}
                  title={session.news.title}
                  description={session.news.genre.title}
                  session={session}
                  wpm={session?.wpm}
                  isfinished={session?.finished_at}
                  level={session.news.level}
                />
              </div>
            ))}
          </Fragment>
      </div>
    </div>
  );
};

export default News;
