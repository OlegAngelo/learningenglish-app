import React, { useEffect } from 'react';

import { removeSpecialCharacters } from '../../../../../../../utils/text';

import Tag from '../../../../../../../shared/Tag';

import style from './LearnedWordsPhrase.module.css';

const LearnedWordsPhrase = ({ category, data }) => {
  const getStatus = (data) => {
    let status = 'Not Tried';

    if (data?.length) {
      status = data[0].training_vocabularies_status.name;
      if (status === 'master') {
        status = 'Mastered !';
      } else {
        status = 'In Progress';
      }
    }

    return status;
  };

  const getTagProps = ({ user_proficiency_vocabularies }) => {
    let status = getStatus(user_proficiency_vocabularies);
    let props = {
      color: 'darkGray',
      size: 'm',
      width: '115.61px',
      light: 'true',
    };

    if (status === 'Mastered !') {
      props.color = 'orange';
    } else if (status === 'In Progress') {
      props.color = 'darkGreen';
    }

    return props;
  };

  const renderList = () => {
    if (data) {
      return data.map((training) => {
        return (
          <div className="h-auto bg-basic-400 mb-px-3" key={training.id}>
            <div className="flex justify-between pt-px-15 pr-px-15 pb-px-16 pl-px-14">
              <div className="font-hiragino-kaku">
                <div className="font-bold text-basic-100 text-16 pb-1 -mt-px-2">
                  {removeSpecialCharacters(training.title)}
                </div>
                <div className="font-normal text-basic-200 text-14">
                  {category === 'words' ? training.meaning : training.translation}
                </div>
              </div>
              <div className="flex ml-3">
                <Tag {...getTagProps(training)}>
                  {getStatus(training.user_proficiency_vocabularies)}
                </Tag>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return <div className={`pt-2.5 pb-px-72 bg-background-200 ${style.container}`}>{renderList()}</div>;
};

export default LearnedWordsPhrase;
