import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import MuscleTraining from './components/MuscleTraining';
import Reading from './components/Reading';
import Listening from './components/Listening';
import ChevronDownIcon from '../../../../../shared/icons/ChevronDownIcon';
import ChevronUpIcon from '../../../../../shared/icons/ChevronUpIcon';
import Loading from '../../../../../shared/Loading';

import { formatListeningProps, formatReadingProps } from './computed';

import styles from '../../LearningLogs.module.css';

const StudyRoom = () => {
  const [isShown, setIsShown] = useState(false);
  const {
    fetchingTrainingLogs,
    muscleTrainingLogs,
    readingLogs,
    listeningLogs,
  } = useSelector((state) => state.learningLogs);
  let condition =
    muscleTrainingLogs[0]?.log_learn_sessions == null ||
    muscleTrainingLogs[0]?.log_learn_sessions == undefined;

  const setOverlay = () => {
    if (isSomeLogEmpty()) return styles.overlay;
  };

  const isEmpty = (data) => {
    return data?.length === 0;
  };

  const isSomeLogEmpty = () => {
    return  ((isEmpty(muscleTrainingLogs[0]?.log_learn_sessions) || condition) &&
    isEmpty(readingLogs) &&
    isEmpty(listeningLogs))
  }

  return (
    <div className="mb-px-2">
      <div
        className={`flex ${setOverlay()} justify-between bg-primary-50 h-px-64 pl-px-8 pr-px-22 text-basic-100 font-bold`}
        onClick={() =>  !isSomeLogEmpty() && setIsShown(!isShown)}
      >
        <div className="flex items-center">
          <div className="rounded-full w-px-48 h-px-48 bg-basic-400 flex items-center justify-center">
            <img className="w-px-32" src="/images/StudyRoom.svg" alt="Study Room Image"/>
          </div>
          <div className="pl-px-16 text-18">自習室</div>
        </div>
        <div className="flex items-center">
          <div className="ml-px-22">
            {isShown ? <ChevronUpIcon color="#044071"/> : <ChevronDownIcon color="#044071"/>}
          </div>
        </div>
      </div>
      <div className={`${styles.accordion} ${isShown ? styles.expand : styles.collapse}`}>
        {fetchingTrainingLogs ? (
          <div className="p-px-50">
            <Loading
              className="relative"
              iconClass="bg-primary-500 text-primary-500"
            />
          </div>
        ) : (
          <Fragment>
            <MuscleTraining logs={muscleTrainingLogs} />
            <Reading logs={formatReadingProps(readingLogs)} />
            <Listening logs={formatListeningProps(listeningLogs)} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default StudyRoom;
