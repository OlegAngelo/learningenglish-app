import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import moment from 'moment';

import EditIcon from '../../../../../../shared/icons/EditIcon';
import DeleteIcon from '../../../../../../shared/icons/DeleteIcon';

import {
  formattedDateBy,
  formattedDate,
  formattedTime,
} from '../../../../../../utils/date';

import styles from './TableItems.module.css';

const TableItems = ({ lectures = {}, deleteLecture }) => {
  const history = useHistory();
  const location = useLocation();

  const getUrl = (item) => {
    const baseUrl = item.is_live
      ? `/admin/lectures/${item.id}/details`
      : `/admin/lectures/on-demand/details/${item.id}/overview`;

    history.push({
      pathname: baseUrl,
      state: {
        prevQuery: location.search,
      },
    });
  };

  const getStatus = (lecture) =>
    lecture.is_live ? lecture.live_status : lecture.publish_status;

  const statusJpTranslation = {
    planning: '配信予定',
    live: '配信中',
    finished: '配信済み',
    published: '公開済み',
    transcoding: '準備中',
    transcoded: '準備完了（未公開）',
  };

  const showDate = (lecture) => {
    if (lecture.is_live) {
      switch (getStatus(lecture)) {
        case 'live':
        case 'planning':
          return formattedDateBy('SQL', lecture.lecture_lives.start_at);
        case 'published':
        case 'finished':
          return formattedDateBy('SQL', lecture.lecture_lives.end_at);
      }
    }
    if (!lecture.is_live) {
      switch (getStatus(lecture)) {
        case 'transcoding':
        case 'transcoded':
          return `${formattedDate(lecture.updated_at)} ${formattedTime(
            lecture.updated_at
            )}`;
        case 'published':
          return `${moment(lecture.publish_at).format('YYYY/M/DD')} ${moment(lecture.publish_at).format('HH:mm')}`;
      }
    }
  };

  return (
    <Fragment>
      {lectures.map((item, key) => {
        return (
          <tr style={{ height: '48px' }} key={key}>
            <td
              className={`text-14 text-adminPrimary-400 break-words ${styles.tableData}`}
            >
              <div>
                <div className="flex flex-col">
                  {item.is_live ? (
                    <div className="pb-px-4">
                      <span
                        className={`text-11 text-white py-px-4 px-px-20 rounded-px-2 ${
                          getStatus(item) === 'live'
                            ? 'bg-progress-red'
                            : 'bg-basic-200'
                        }`}
                      >
                        {item.live_status === 'live' ? 'LIVE中' : 'LIVE'}
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                  <div
                    className={`cursor-pointer break-words ${styles.fitContent}`}
                    onClick={() => getUrl(item)}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                  </div>
                </div>
              </div>
            </td>
            <td>{ (item.is_live && item.genre2) ? `${item.genre}, ${item.genre2}` : item.genre}</td>
            <td>
              <div
                className={`flex flex-col ${
                  getStatus(item) === 'finished' ||
                  getStatus(item) === 'published'
                    ? 'text-basic-200'
                    : 'font-semibold'
                } ${
                  getStatus(item) === 'transcoded' && 'text-exam-error' 
                }`}
              >
                {(getStatus(item) === 'finished' ||
                  getStatus(item) === 'published') && (
                  <div>{statusJpTranslation[getStatus(item)]}</div>
                )}
                <div>{showDate(item)}</div>
                {getStatus(item) !== 'finished' &&
                  getStatus(item) !== 'published' && (
                    <div>{statusJpTranslation[getStatus(item)]}</div>
                  )}
              </div>
            </td>
            <td className="flex flex-col">
              <div>{formattedDate(item.updated_at)}</div>

              {/* updated time */}
              <div>{formattedTime(item.updated_at)}</div>
            </td>
            <td>{!!item.views ? item.views : '-'}</td>
            <td>{!!item.participants ? item.participants : '-'}</td>
            <td>{!!item.videos ? item.videos : '-'}</td>
            {/* <td className="text-12 py-px-11 text-adminGray-700">
              <DeleteIcon 
                className="h-px-20 w-px-20 cursor-pointer" 
                onClick={()=> deleteLecture(item.id)}
              />
            </td> */}
          </tr>
        );
      })}
    </Fragment>
  );
};

export default TableItems;
