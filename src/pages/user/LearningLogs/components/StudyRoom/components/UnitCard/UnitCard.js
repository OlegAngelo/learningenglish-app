import React from 'react';

import Tag from '../../../../../../../shared/Tag';
import CheckIcon from '../../../../../../../shared/icons/CheckIcon';

import styles from './UnitCard.module.css';

const UnitCard = ({ log }) => {

  return (
    <div 
      className={`flex bg-white relative border border-primary-100 box-border m-px-10 px-px-20 pt-px-14 pb-px-16 ${styles.unitCard}`}
    >
      <div className="flex flex-col flex-1">
        <div className={`flex items-center`}>
          <div>
            <Tag
              className={`font-theme-normal text-primary-500  px-px-8 py-px-5`}
              color="gray"
              size="xs"
              pill
              weightLight
            >
              {log.description}
            </Tag>
          </div>
          <div className="text-12 ml-px-8">{log.total_study_time}</div>
          {log.isTimeUp && <div className="text-12 ml-px-8 text-exam-error font-semibold">Time up</div>}
          {log.did_shadowing && <div className="text-12 ml-px-8 text-primary-500"><CheckIcon color="#044071" className="mr-px-4"/>発話</div>}
        </div>
        <div className="text-basic-100 font-bold text-16 pt-px-6">
          {log.title}
        </div>
      </div>
      <div className="flex items-center">
        <div className={`text-center py-px-6 font-bold text-12 text-basic-400 ${styles.status} ${log.is_mastered ? 'bg-progressBar-done' : 'bg-secondary-40'}`}>
          {log.is_mastered ? 'Mastered !' : 'In Progress'}
        </div>
      </div>
    </div>
  );
};

export default UnitCard;
