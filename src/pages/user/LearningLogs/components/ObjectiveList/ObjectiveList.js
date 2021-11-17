import React from 'react';

import CheckCircleIcon from '../../../../../shared/icons/CheckCircleIcon';

import style from './ObjectiveList.module.css';

const ObjectiveList = ({ title, data }) => {
  const getBorderStyle = (index) => {
    let classes = `${index == 0 && `border-l`} border-primary-500 border-t border-b border-r`;

    return `${classes} ${index === 0 && style.roundedFirst} ${
      index === data.length - 1 && style.roundedLast
    }`;
  };

  const renderList = () => {
    return data.map((data, index) => {
      return (
        <div className={`flex-1 ${getBorderStyle(index)} ${style.box}`} key={index}>
          {data.checked ? (
            <CheckCircleIcon
              height="30"
              width="30"
              color="#5BD1C6"
              opacity="1"
            />
          ) : (
            <div className={style.uncheck} />
          )}
          <p className={`text-primary-500 ${data.checked ? 'pt-px-10' : 'pt-px-16'} ${style.listText}`}>
            {data.text}
            <span className="block">{data?.text_next_line}</span>
          </p>
        </div>
      );
    });
  };

  return (
    <div>
      <h3 className={`text-primary-500 px-px-12 ${style.title}`}>{title}</h3>
      <div className="flex">{renderList()}</div>
    </div>
  );
};

export default ObjectiveList;
