import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../../../../../../../shared/ProgressBar';
import KeyboardArrowRight from '../../../../../../../shared/icons/KeyboardArrowRight';
import styles from './UnitBox.module.css';

const UnitBox = ({ units, category }) => {
  const [progressBarWidth, setProgressBarWidth] = useState(165);

  const ifDone = (value) => {
    return value === 100;
  };

  const getFinalPercentage = (percentage) => {
    return (percentage > 99 && percentage < 100) ? Math.floor(percentage) : Math.round(percentage);
  };

  const handleProgressBarResponsiveness = () => {
    if (window.innerWidth <= 360) {
      setProgressBarWidth(120);
    } else if (window.innerWidth <= 375) {
      setProgressBarWidth(165);
    } else if(window.innerWidth <= 414) {
      setProgressBarWidth(185);
    } else {
      setProgressBarWidth(200);
    }
  };

  useEffect(() => {
    handleProgressBarResponsiveness();
    window.addEventListener('resize', handleProgressBarResponsiveness);
  });

  return (
    <Fragment>
      {units.map((unit, index) => {
        return (
          <Link
            key={index}
            to={`/proficiency/knowledge/${category}/${unit.id}`}
          >
            <div className={`relative bg-white rounded-px-4 ${styles.unitBox}`}>
              <div className={`text-16 font-bold ${styles.lineHeight}`}>
                {unit.name}
              </div>
              <div className="flex flex-col mt-px-6">
                <div className="flex items-center">
                  <p
                    className={`text-10 text-basic-100 pt-px-1
                      ${styles.wordTextScreenOffset}
                      ${ifDone(unit.word.master) && 'text-progressBar-orange'}
                    `}
                  >
                    単語
                  </p>
                  <div className="flex pr-px-6 pl-px-8">
                    <ProgressBar
                      done={unit.word.master}
                      progress={unit.word.in_progress}
                      width={progressBarWidth}
                      height="5"
                      color="bg-secondary-500"
                      bgColor="bg-basic-300"
                      doneBarColor="bg-progressBar-done"
                      type="rounded"
                      isMerge={!ifDone(unit.word.master)}
                    />
                  </div>
                  <p
                    className={`text-10 text-basic-200
                      ${styles.strength}
                      ${ifDone(unit.word.master) && 'text-progressBar-done font-bold'}
                    `}
                  >
                    Mastered {getFinalPercentage(unit.word.master)}%
                  </p>
                </div>
                <div className="flex items-center">
                  <p
                    className={`text-10 text-basic-100
                      ${styles.phraseTextScreenOffset} ${
                      ifDone(unit.phrase.master) && 'text-progressBar-orange'}
                    `}
                  >
                    フレーズ
                  </p>
                  <div className="flex pr-px-6 pl-px-8">
                    <ProgressBar
                      done={unit.phrase.master}
                      progress={unit.phrase.in_progress}
                      width={progressBarWidth}
                      height="5"
                      color="bg-secondary-500"
                      bgColor="bg-basic-300"
                      doneBarColor="bg-progressBar-done"
                      type="rounded"
                      isMerge={!ifDone(unit.phrase.master)}
                    />
                  </div>
                  <p
                    className={`text-10 text-basic-200
                      ${styles.strength}
                      ${ifDone(unit.phrase.master) &&
                      'text-progressBar-done font-bold'}`
                    }
                  >
                    Mastered {getFinalPercentage(unit.phrase.master)}%
                  </p>
                </div>
              </div>
              <div className="absolute right-px-16 top-px-24">
                <KeyboardArrowRight />
              </div>
            </div>
          </Link>
        );
      })}
    </Fragment>
  );
};

export default UnitBox;
