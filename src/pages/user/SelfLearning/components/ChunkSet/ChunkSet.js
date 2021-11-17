import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';

import TrainingItem from '../../../../../shared/TrainingItem';
import { units } from '../data';

const ChunkSet = ({ chunkTitle, levels }) => {
  const [progressBarWidth, setProgressBarWidth] = useState(186);
  const location = useLocation();
  const type = location.pathname === '/self-learning/listening' ? 'listening' : 'reading';
  const openForTesting = true;

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
    return percentage > 99 && percentage < 100
      ? Math.floor(percentage)
      : Math.round(percentage);
  };

  const TrainingItemProps = {
    checkIfDone,
    handleProgressBarResponsiveness,
    setProgressBarWidth,
    progressBarWidth,
    getFinalPercentage,
  };

  useEffect(() => {
    handleProgressBarResponsiveness();
    window.addEventListener('resize', handleProgressBarResponsiveness);
  });

  return (
    <div>
      <h2 className="px-px-16 leading-px-25 text-18 text-primary-500 font-bold">
        {chunkTitle}
      </h2>
      <div>
        <div className="mt-px-8">
          {levels.map((level, index) => (
            <Link
              key={index}
              to={openForTesting && level.id != 4 || level.can_proceed ? `/self-learning/${type}/${level.id}/list` : '#'}
              className={`mb-px-2 ${openForTesting || !level.can_proceed && 'cursor-not-allowed'}`}
            >
              <TrainingItem
                unitId={level.id}
                unitTitle={`Level ${level.order}`}
                proficiency={level.proficiency}
                className={openForTesting || !level.can_proceed && 'opacity-50'}
                isComingSoon={level.id == 4}
                {...TrainingItemProps}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChunkSet;
