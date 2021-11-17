import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';
import Button from '../../../../../../../shared/Button/Button';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import { FormWrapperContext } from '../FormWrapper/FormWrapper';

const Header = () => {
  const { registerOnClickHandler, saveBtnText, isSaveBtnDisabled} = useContext(FormWrapperContext);
  return (
    <Fragment>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <Link to="/admin/lectures">
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3 font-bold">
            LIVE授業を登録
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex items-center">
            <Button 
              className="ml-px-15"
              innerClass={`px-px-34 ${!isSaveBtnDisabled && 'cursor-pointer'}`}
              type="blue-square"
              disabled={isSaveBtnDisabled}
              onClick={registerOnClickHandler}
            >
              {saveBtnText}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
