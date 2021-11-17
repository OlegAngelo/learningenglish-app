import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Parser from 'html-react-parser';

import LevelStar from '../LevelStar/LevelStar';
import FavoriteBorderIcon from '../../../../../shared/icons/FavoriteBorderIcon';
import FavoriteIcon from '../../../../../shared/icons/FavoriteIcon';
import HeadsetIcon from '../../../../../shared/icons/HeadsetIcon';
import QuestionAnswerIcon from '../../../../../shared/icons/QuestionAnswerIcon';

import { fetchNewsStatus, toggleNewsBookmark, removeBookmark } from '../../../../../redux/news/slice';

import styles from './NewsItem.module.css';

const NewsItem = ({ data, key, from }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { thumbnailPreviews } = useSelector(state => state.news);
  const [isFavorite, setIsFavorite] = useState(
    from === 'bookmarks'
      ? true
      : data.news_bookmarks?.length
  );

  const getTime = () => {
    let publishedAt = DateTime.fromFormat(
      data.scheduled_published_at,
      'yyyy-LL-dd HH:mm:ss'
    );
    let now = DateTime.now('yyyy-LL-dd HH:mm:ss').setZone('Asia/Tokyo');
    let difference = now.diff(publishedAt, ['hours', 'minutes', 'seconds']).toObject();

    return difference.hours > 24
      ? DateTime.fromFormat(data.scheduled_published_at, 'yyyy-LL-dd HH:mm:ss').toFormat(
          'yyyy/MM/dd'
        )
      : `${Math.floor(difference.hours)}時間前`;
  };

  const getStatus = () => {
    let status = null;
    let commonStyle = 'text-basic-500 h-px-20 w-px-66 text-center text-11 rounded py-px-3 mb-px-8';
    switch (data.news_status) {
      case 'Finish':
        status = <div className={`bg-secondary-40 ${commonStyle}`}>Finished</div>;
        break;
      case 'New':
        status = <div className={`bg-progressBar-done ${commonStyle}`}>NEW!</div>;
        break;
      default:
        break;
    }
    return status;
  };

  const setStatus = () => {
    const status = ['deleted', 'expired'];

    dispatch(fetchNewsStatus(data.id)).then((res) => {
      if (!status.includes(res.payload.data)) {
        localStorage.setItem('news_status', data.news_status);
        history.push(`/news/${data.id}/details`);
      }
    });
  };

  const isGrayText = () => {
    return data.news_status === 'Reading' || data.news_status === 'Finish';
  };
  
  const favoriteOnClickHandler = (value) => {
    dispatch(toggleNewsBookmark(data.id)).then(res => {
      if (from === 'bookmarks') {
        dispatch(removeBookmark(data.id));
      } else {
        setIsFavorite(value);
      }
    });
  };

  return (
    <div
      key={key}
      className={`mt-4 -mb-px-7 mx-2 p-px-16 ${styles.NewsItemCard}`}
    >
      {getStatus()}

      <Link to="#" onClick={() => setStatus()}>
        <div className="flex justify-between">
          <div className="w-2/3 pr-px-12">
            <h1 className={`font-bold text-base font-hiragino ${styles.LineHeight} ${isGrayText() && 'text-basic-200'}`}>
              {Parser(data.title)}
            </h1>
            <p
              className={`font-normal font-hiragino pt-px-16  ${styles.TranslationLineHeight} ${isGrayText() && 'text-basic-200'}`}
            >
              {data.title_translation}
            </p>
          </div>
          {data.thumbnail_preview && (
            <div className="flex flex-row-reverse">
              { thumbnailPreviews[data.thumbnail_preview]
                ?
                  <img className={`${styles.NewsItemCardImage} object-cover`} src={thumbnailPreviews[data.thumbnail_preview]} />
                :
                  <div className="w-px-100 h-px-100 bg-basic-300 animate-pulse"></div>
              }
            </div>
          )}
        </div>
      </Link>
      <div className="grid grid-cols-4 pt-px-14">
        <div className="flex items-end text-primary-400">
          <p className="text-12">{getTime()}</p>
        </div>
        <div className="ml-px-8 flex">
          {data.vimeo_video_id && (
            <div className="-mt-px-1">
              <HeadsetIcon />
            </div>
          )}
          {/* <div className="ml-px-11">
            <QuestionAnswerIcon />
          </div> */}
        </div>
        <div className="flex items-end">
          <LevelStar level={data.level} />
        </div>
        <div className="flex flex-row-reverse items-end">
          {isFavorite ? (
            <FavoriteIcon onClick={() => favoriteOnClickHandler(false)} />
          ) : (
            <FavoriteBorderIcon onClick={() => favoriteOnClickHandler(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
