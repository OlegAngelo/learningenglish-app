import React from 'react';

import ArrowRightIcon from '../../../../../shared/icons/ArrowRightIcon';

const Breadcrumbs = ({ linkTextOne, linkTextTwo, linkTextThree }) => {
  return (
    <div className="px-8 pt-px-24">
      <p className={`font-normal text-14 text-hiragino text-adminGray-400`} >
        {linkTextOne}&nbsp;
        <ArrowRightIcon color="#6B7280" />&nbsp;
        {linkTextTwo}&nbsp;
        <ArrowRightIcon color="#6B7280" />&nbsp;
        <span className="text-adminGray-500">{linkTextThree}</span>
      </p>
    </div >
  );
};

export default Breadcrumbs;
