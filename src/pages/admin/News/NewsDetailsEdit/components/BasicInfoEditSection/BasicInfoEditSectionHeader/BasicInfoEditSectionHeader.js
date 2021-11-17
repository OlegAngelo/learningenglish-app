import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';

const BasicInfoEditSectionHeader = () => {
  const history = useHistory();
  return (
    <>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <div onClick={() => history.goBack()} className="cursor-pointer">
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </div>
          <span className="text-base-dark font-theme-bold leading-px-20 text-20 mt-px-3">
            ニュース詳細
          </span>
        </div>
      </div>
    </>
  );
};

export default BasicInfoEditSectionHeader;
