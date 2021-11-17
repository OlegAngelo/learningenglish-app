import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';

import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import Button from '../../../../../../../shared/Button';

import style from './BasicInfoSectionHeader.module.css';

const BasicInfoSectionHeader = ({
  props,
  updateOnClick,
  deleteLecture,
  isLoading,
  headerProps,
}) => {
  const currentTab = useParams().tab;
  const lectureId = useParams().id;
  const location = useLocation();
  const [urlParams, setUrlParams] = useState();
  const { isSubmittedToApi } = props;
  const {
    publishOnClick = () => {},
    isTranscoded,
    isPublishing,
  } = headerProps;

  useEffect(() => {
    if (currentTab === 'overview') {
      setUrlParams(location.state?.prevQuery);
    }
  }, []);

  const backURL = () => {
    return currentTab === 'video-list-edit'
      ? `/admin/lectures/on-demand/details/${lectureId}/video-list`
      : `/admin/lectures${urlParams ?? ''}`;
  };

  return (
    <Fragment>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <Link to={() => backURL()}>
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark leading-px-20 text-20 mt-px-3 font-bold">
            授業編集
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex items-center">
            {!isLoading && (
              <div
                className="cursor-pointer"
                onClick={() => deleteLecture(lectureId)}
              >
                <DeleteIcon />
                <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">
                  削除
                </span>
              </div>
            )}
            <Button
              className="ml-px-24"
              innerClass={`${style.button} ${!isSubmittedToApi && 'cursor-pointer'}`}
              type="blue-square"
              disabled={isSubmittedToApi || isLoading}
              onClick={() => updateOnClick()}
            >
              {isSubmittedToApi ? '登録中...' : '登録'}
            </Button>
            
            <Button
              className="ml-px-24"
              innerClass={`${style.button} ${isTranscoded && 'cursor-pointer'}`}
              type="darkblue-square"
              disabled={isTranscoded ? false : true}
              onClick={() => publishOnClick()}
              withoutFocus
            >
              {isPublishing ? '公開中...' : '公開'}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BasicInfoSectionHeader;
