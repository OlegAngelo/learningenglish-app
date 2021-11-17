import React, { Fragment, useEffect } from 'react';

import CubeGraph from '../../../../../../../shared/CubeGraph/CubeGraph';
import Cube from '../../../../../../../shared/icons/Cube';
import RecordVoice from '../../../../../../../shared/icons/RecordVoice';
import Language from '../../../../../../../shared/icons/Language';
import BubbleIcon from '../../../../../../../shared/icons/BubbleIcon';
import Progress from '../../../../../../../shared/Progress/Progress';

import styles from './ResultCubeGraph.module.css';

const ResultCubeGraph = ({ countdown, setCountdown }) => {
  useEffect(() => {
    setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown, setCountdown]);

  return (
    <Fragment>
      <div className="fixed top-0 right-0 h-full w-full bg-basic-100" />
      <div className="fixed top-0 right-0 h-full w-full flex items-center pointer-events-none">
        <div
          className={`
            ${styles.modal} relative w-full flex flex-col items-center
            pointer-events-auto shadow-modal
          `}
        >
          <div
            className={`
            bg-white rounded-t w-full text-secondary-200 ${styles.modalTitle}`}
          >
            Cubeが成長しました！
          </div>
          <div className="bg-primary-500 w-full">
            <div className="flex justify-center mt-px-15">
              <div
                className={`${styles.icon} mx-5 rounded-full flex items-center justify-center bg-primary-50`}
              >
                <Cube color="orange" size="md" />
              </div>
              <div
                className={`${styles.icon} mx-5 rounded-full flex items-center justify-center bg-primary-50`}
              >
                <Cube color="darkBlue" size="lg" />
              </div>
            </div>
            <div className={styles.cubeGraphContainer}>
              <CubeGraph
                percentage={{
                  knowledge: 25,
                  skill: 25,
                  verbal: 40,
                }}
                labels={{
                  knowledge: 150,
                  skill: 100,
                  verbal: 150,
                }}
                height="210"
              />
            </div>

            <div className="mt-1.5 border-b border-primary-100 mx-7" />

            <div className="ml-px-30 mt-3 mb-5">
              <div className={`${styles.iconWrapper} flex items-center`}>
                <BubbleIcon width="12" height="12" color="#fff" />
                <span className="text-basic-400 text-12 ml-px-8">知識</span>
              </div>
              <div className="pt-0.5 pb-1.5">
                <Progress
                  size="43"
                  progressNumber="+5"
                  base="31"
                  baseColor="#4EBFB4"
                  barHeight="h-px-12"
                  valueHeight="text-14"
                />
              </div>
              <div className={`${styles.iconWrapper} flex items-center`}>
                <RecordVoice width="14" height="14" color="#FFF" />
                <span className="text-basic-400 text-12 ml-px-8">技能</span>
              </div>
              <div className="pt-0.5 pb-1.5">
                <Progress
                  size="19"
                  progressNumber="+3"
                  base="14"
                  baseColor="#4EBFB4"
                  barHeight="h-px-12"
                  valueHeight="text-14"
                />
              </div>
              <div className={`${styles.iconWrapper} flex items-center`}>
                <Language width="14" height="14" color="#FFF" />
                <span className="text-basic-400 text-12 ml-px-8">
                  非言語・異文化
                </span>
              </div>
              <div className="pt-0.5">
                <Progress
                  size="19"
                  progressNumber="+3"
                  base="14"
                  baseColor="#4EBFB4"
                  barHeight="h-px-12"
                  valueHeight="text-14"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResultCubeGraph;
