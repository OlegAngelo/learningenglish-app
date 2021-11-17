import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import moment from 'moment';

import LevelStar from '../../../../../../shared/Level/LevelStar';
import FavoriteBorderIcon from '../../../../../../shared/icons/FavoriteBorderIcon';
import FavoriteIcon from '../../../../../../shared/icons/FavoriteIcon';

import { setSelectedLectureLiveId } from '../../../../../../redux/userLectures/slice';
import { getTimeAgo } from '../../../../../../utils/lectureHelper';

import style from './Item.module.css';

const LectureItem = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { thumbnailPreviews } = useSelector(state => state.userLectures);
  const statusStyles = {
    1: style.bgError,
    2: style.bgNew,
    3: style.bgGrayLive,
    4: style.bgGrayLive,
    0: 'px-px-8 text-basic-200 border border-basic-300',
  };
  const statusName = {
    1: 'LIVE中',
    2: 'NEW!',
    3: 'LIVE',
  };
  const hasVideoLogs = !!data?.lecture_ondemand_videos[0]?.log_lecture_ondemand_videos?.length;

  const showStatusTag = (data) => data.type_id < 4 && (data.type_id !== 2 || data.is_new) || !!data?.lectures_tags;

  const redirectTo = (data) => {
    if (data.is_live) {
      dispatch(setSelectedLectureLiveId(data.lecture_lives.id))
      return history.push(`/lectures/${data.id}/live`);
    }
    history.push(`/lectures/${data.id}/on-demand/overview`);
  };

  return (
    <div className={`mt-4 -mb-px-7 mx-2 p-px-16 ${style.lectureItemCard}`}>
      <Link to="#" onClick={() => redirectTo(data)}>
        <div className="flex justify-between">
          <div>
            {data.thumbnail_preview ? (
              <div className="flex flex-row-reverse">
                {thumbnailPreviews[data.thumbnail_preview]
                  ? <img className={`${style.NewsItemCardImage} object-cover`} src={thumbnailPreviews[data.thumbnail_preview]} />
                  : <div className="w-px-100 h-px-100 bg-basic-300 animate-pulse"></div>
                }
              </div>
            ) : (
              <div className="w-px-100 h-px-100"/>
            )}
          </div>
          <div className="w-2/3 pl-px-12">
            {showStatusTag(data) && (
              <div className="w-full -mt-px-4 pb-px-12">
                {data.type_id < 4 && data.is_new && (
                  <span
                    className={`py-px-2 text-11 rounded-px-2 mr-px-8 text-center inline-block ${statusStyles[2]}`}
                  >
                    {statusName[2]}
                  </span>
                )}

                {data.type_id < 4 && data.type_id !== 2 && (
                  <span
                    className={`py-px-2 text-11 rounded-px-2 mr-px-8 text-center inline-block ${
                      statusStyles[data.type_id]
                    }`}
                  >
                    {statusName[data.type_id]}
                  </span>
                )}

                {data.lectures_tags.map((data) => (
                  <span
                    className={`py-px-1 text-11 rounded-px-2 mr-px-8 text-center inline-block ${statusStyles[0]}`}
                  >
                    {data.lecture_meta_tag.name}
                  </span>
                ))}
              </div>
            )}
            <h1 className={`font-bold ${hasVideoLogs ? `text-basic-200`:`text-base`} font-hiragino  -mt-px-8 ${style.ellipsis}`}>
              <span dangerouslySetInnerHTML={{ __html: data.title }}></span>
            </h1>
          </div>
        </div>
        <p className={`font-normal ${hasVideoLogs ? `text-basic-200`:`text-base`} font-hiragino pt-px-12 text-normal whitespace-pre-wrap ${style.ellipsis}`}>
          <span dangerouslySetInnerHTML={{ __html: data.description }}></span>
        </p>
        {data.lectures_teacher.length > 0 && (
          <div className={`pt-px-16 ${hasVideoLogs ? `text-basic-200`:`text-base`}`}>
            {data.lectures_teacher.map((data) => {
              return <p className="mb-px-2 text-14">{data.teacher?.name}</p>
            })}
          </div>
        )}
      </Link>
      <div className="grid grid-flow-col grid-cols-3 pt-px-12">
        <div className="flex items-end text-primary-400 col-span-2">
          <p className="text-12">{getTimeAgo(data)}</p>
        </div>
        <div className="flex items-end px-px-10">
          <LevelStar level={data.level} />
        </div>
        <div className="flex items-end text-basic-200 pr-px-5">
          <p className="text-12">{!data.is_live && `${data.views ?? 0}回視聴`}</p>
        </div>
        {/* #tmp - lecture bookmark */}
        {/* <div className="flex flex-row-reverse items-end ">
          {isFavorite ? (
            <FavoriteIcon onClick={() => setIsFavorite(false)} />
          ) : (
            <FavoriteBorderIcon onClick={() => setIsFavorite(true)} />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default LectureItem;
