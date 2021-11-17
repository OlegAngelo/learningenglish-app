import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import UnitBox from '../UnitBox';
import ChevronDownIcon from '../../../../../shared/icons/ChevronDownIcon';
import ChevronUpIcon from '../../../../../shared/icons/ChevronUpIcon';
import Loading from '../../../../../shared/Loading/Loading';

import { getLectureTitle, getLectureGenre, getLectureGenre2, getLectureLevel } from './computed';

import styles from '../../LearningLogs.module.css';

const Lectures = () => {
  const [isShown, setIsShown] = useState(false);
  const { fetchingLectureLogs, lectureLogs } = useSelector(state => state.learningLogs);

  const setOverlay = () => {
    if (lectureLogs.length === 0) return styles.overlay;
  };

  return (
    <div className="mb-px-2">
      <div
        className={`flex ${setOverlay()} justify-between bg-primary-50 h-px-64 pl-px-8 pr-px-22 text-basic-100 font-bold`}
        onClick={() => lectureLogs.length != 0 && setIsShown(!isShown)}
      >
        <div className="flex items-center">
          <div className="rounded-full w-px-48 h-px-48 bg-basic-400 flex items-center justify-center">
            <img className="w-px-32" src="/images/Classroom.svg" alt="Study Room Image"/>
          </div>
          <div className="pl-px-16 text-18">ホール</div>
        </div>
        <div className="flex items-center">
          <div className="ml-px-22">
            {isShown ? <ChevronUpIcon color="#044071"/> : <ChevronDownIcon color="#044071"/>}
          </div>
        </div>
      </div>
      <div className={`${styles.accordion} ${isShown ? styles.expand : styles.collapse}`}>
        {fetchingLectureLogs ? (
          <div className="p-px-50">
            <Loading className="relative" iconClass="bg-primary-500 text-primary-500" />
          </div>
        ) : (
          <Fragment>
            <div className="font-bold text-primary-500 text-18 mt-px-20 ml-px-20 mb-px-16">
              大教室
            </div>
            {lectureLogs.map((session, index) => (
              <div key={index}>
                <UnitBox
                  paragraphclassname={`w-11/12 mb-px-14 truncate`}
                  title={getLectureTitle(session)}
                  description={getLectureGenre(session)}
                  description2={getLectureGenre2(session)}
                  level={getLectureLevel(session)}
                  {...(session.lecture_live && { live: true })}
                  {...(session?.lecture?.lecture_phrases?.length && {
                    withMaterials: true,
                  })}
                />
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Lectures;
