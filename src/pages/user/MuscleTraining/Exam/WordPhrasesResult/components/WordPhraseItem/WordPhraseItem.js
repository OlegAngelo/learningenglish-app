import React from 'react';

import Tag from '../../../../../../../shared/Tag/Tag';

import styles from './WordPhraseItem.module.css';

const WordItem = ({ title, subtitle, status }) => {
  const getColor = (status) => {
    if(status === 'master') {
      return 'orange';
    }
    else if(status === 'in-progress') {
      return 'darkGreen';
    }
    else {
      return 'darkGray';
    }
  }

  const getStatusText = (status) => {
    if(status === 'master') {
      return 'Mastered !';
    }
    else if(status === 'in-progress') {
      return 'In Progress';
    }
    else {
      return 'Not Tried';
    }
  }

  return (
    <div className={`${styles.cardWrapper} bg-white px-4 py-13 mb-0.5 flex`}>
      <div className="title-wrapper flex-1 flex flex-col mt-2 mb-2">
        <div className="title font-bold text-basic-100">
          {title}
        </div>
        <div className={`${styles.subtitle} font-normal text-basic-200 text-14`}>
          {subtitle}
        </div>
      </div>

      <div className={`${styles.status} bg-red flex flex-wrap justify-between items-center`}>
        <Tag
          color={getColor(status)}
          size="m"
          width="123.61px"
          light
        >
          {getStatusText(status)}
        </Tag>
      </div>
    </div>
  );
};

export default WordItem;
