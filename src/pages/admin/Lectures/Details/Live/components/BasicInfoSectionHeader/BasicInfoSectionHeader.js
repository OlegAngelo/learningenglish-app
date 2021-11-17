import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';

import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';
import Button from '../../../../../../../shared/Button';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';

import { FormWrapperContext } from '../FormWrapper/FormWrapper';

const BasicInfoSectionHeader = ({ onClickSubmit, isLoading = false, isSubmittedToApi }) => {
  const { deleteLecture } = useContext(FormWrapperContext);
  const id = useParams().id;
  const location = useLocation();

  return (
    <Fragment>
      <div
        className="flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54"
      >
        <div className="flex">
          <Link to={`/admin/lectures${location.state?.prevQuery ?? ''}`}>
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
          LIVE授業編集
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex items-center">
            {(!isLoading) && (
              <div className="cursor-pointer" onClick={() => deleteLecture(id)}>
                <DeleteIcon />
                <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">
                  削除
                </span>
              </div>
            )}
            <Button 
              className="ml-px-15"
              innerClass={`px-px-34 ${!isSubmittedToApi && 'cursor-pointer'}`}
              type="blue-square"
              disabled={isSubmittedToApi ? true : false}
              onClick={onClickSubmit}
            >
              {isSubmittedToApi ? '登録中...' : '登録'}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BasicInfoSectionHeader;
