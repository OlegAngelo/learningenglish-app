import React from 'react';

import UnitCard from '../UnitCard';

import styles from '../../../../LearningLogs.module.css';

const Reading = ({ logs }) => {
  return (
    <div>
      <div className={`${logs.length === 0 && 'text-opacity-50'} font-bold text-18 text-primary-500 mt-px-20 ml-px-20 mb-px-16`}>Reading</div>
        {logs?.map((log, index) => (
          <UnitCard key={index} log={log} />
        ))}
      <div className="h-px-8 bg-background-200" />
    </div>
  );
};

export default Reading;
