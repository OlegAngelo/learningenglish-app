import React, { Fragment } from 'react';

import style from './Explanation.module.css';

const Explanation = ({ explanationList }) => {
  return (
    <Fragment>
      {explanationList.map((data, index) => {
        return (
          <div key={index} className={`${style.container} bg-white px-4 pb-4 pt-px-18 font-hiragino mb-px-8 rounded-px-4`}>
            <div className={`${style.commentaryTitle} text-16 font-bold text-primary-500`}>
              {data.type}
            </div>
            <div className={`${style.commentaryDescription} whitespace-pre-line text-basic-100 text-14 mt-px-8`}>
              {data.description}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Explanation;
