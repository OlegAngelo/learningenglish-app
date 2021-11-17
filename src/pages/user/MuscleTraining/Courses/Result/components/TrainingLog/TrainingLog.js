import React from 'react';
import TrainingLogQuestion from '../TrainingLogQuestion';

import style from './TrainingLog.module.css';

const TrainingLog = () => {
  return (
    <div>
      <div className={ `bg-background-200 ${style.trainingLogCard}` }>
        <TrainingLogQuestion
          title="What do you think about cutting the cost?"
          isCompleted={false}
        />
        <TrainingLogQuestion
          title="What do you think about cutting the cost?"
          isCompleted={false}
        />
        <TrainingLogQuestion
          title="What do you think about cutting the cost?"
          isCompleted={true}
        />
        <TrainingLogQuestion
          title="What do you think about cutting the cost?"
          isCompleted={false}
        />
        <TrainingLogQuestion
          title="What do you think about cutting the cost?"
          isCompleted={true}
        />
        <TrainingLogQuestion
          title="What do you think about cutting the cost?"
          isCompleted={false}
        />
      </div>
    </div>
  );
};

export default TrainingLog;
