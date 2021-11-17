import React from 'react';

import style from './LogCard.module.css';

const LogCard = ({ title = '', subtitle = '', children }) => {
  return (
    <div className={`h-auto ${style.logWordCard}`}>
      <div className={`flex justify-between ${style.logWordCardContent}`}>
        <div className="font-hiragino-kaku">
            <div className={`font-bold text-basic-100 text-16 ${style.logWordCardContentTitle}`}>
            {title}
          </div>
          <div className="font-normal text-basic-200 text-14">{subtitle}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LogCard;
