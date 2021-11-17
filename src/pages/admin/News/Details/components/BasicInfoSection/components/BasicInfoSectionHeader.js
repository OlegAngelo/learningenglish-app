import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';

// Redux
import { resetNewsDetails } from '../../../../../../../redux/news/slice';

const BasicInfoSectionHeader = ({deleteNews}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { newsDetails } = useSelector(state => state.news);
  const newsId = useParams().id;

  return (
    <Fragment>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <Link
            to={`/admin/news${location.state?.prevQuery ?? ''}`}
            onClick={() => dispatch(resetNewsDetails())}
          >
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
            ニュース詳細
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex">
            {/* <div className="pr-px-24">
              <Link to={`/admin/news/details/${newsId}/edit`}>
                <EditIcon />
                <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">
                  編集
                </span>
              </Link>
            </div> */}
            {newsDetails && newsDetails.status !== 'deleted' && (
              <div className="cursor-pointer" onClick={()=> deleteNews(newsId)}>
                <DeleteIcon />
                <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">
                  削除
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BasicInfoSectionHeader;
