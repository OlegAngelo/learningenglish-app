import React from 'react';

import UnitCard from '../UnitCard';

const Listening = ({ logs }) => {

  return (
    <div>
      <div className={`${logs.length === 0 && 'text-opacity-50'} font-bold text-18 text-primary-500 mt-px-20 ml-px-20 mb-px-16`}>Listening</div>
      {logs?.map((log, index) => (
        <UnitCard key={index} log={log} />
      ))}
    </div>
  );
};

export default Listening;
