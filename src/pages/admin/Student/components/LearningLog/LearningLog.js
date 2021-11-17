import React from 'react';

import TableGroup from '../TableGroup';
import Calendar from '../../../../../shared/Calendar';

import style from './LearningLog.module.css';

const LearningLog = (props) => {
  return (
    <div className={`mt-px-60 ${style.container}`}>
      <h4 className="text-base-dark text-18 font-bold leading-px-18 mb-px-16">
        学習ログ
      </h4>

      <div className="flex justify-between">
        <Calendar
          className={`bg-adminGray-100 ${style.calendar}`}
          markExisting={[
            '2020-12-15',
            '2020-12-16',
            '2020-12-19',
            '2020-12-20',
            '2020-12-21',
          ]}
          markComplete={['2020-12-17']}
        />

        <TableGroup />
      </div>
    </div>
  );
};

export default LearningLog;
