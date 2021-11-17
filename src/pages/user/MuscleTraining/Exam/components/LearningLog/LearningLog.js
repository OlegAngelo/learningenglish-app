import React, { useEffect } from 'react';

import TrainingLogQuestion from '../LearningLogQuestion';
import { saveUpdatedChecklist } from '../../../../../../utils/checklistHelper';

import style from './LearningLog.module.css';

const LearningLog = ({ categoryType = null, muscleTrainingResult }) => {
  useEffect(() => {
    // Call before the component is destroyed.
    return () => saveUpdatedChecklist();
  }, []);

  return (
    <div className={`bg-white ${style.learningLogCard}`}>
      {muscleTrainingResult.map((trainingLog, index) => {
        return (
          <TrainingLogQuestion
            categoryType={categoryType}
            trainingLog={trainingLog}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default LearningLog;
