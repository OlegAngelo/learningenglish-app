import React, {Fragment} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';

// Components
import ImageIcon from '../../../../../../shared/icons/ImageIcon';
import HeadsetIcon from '../../../../../../shared/icons/HeadsetIcon';

// Utils
import {
  formattedDateBy,
  formattedDate,
  formattedTime,
} from '../../../../../../utils/date';
import calculatePercentage from '../../../../../../utils/calculatePercentage';

// Config
import newsStatuses from '../../../../../../config/newsStatuses.json';
import EditIcon from '../../../../../../shared/icons/EditIcon';

import styles from './TableItems.module.css';

const TableItems = ({ news = {}, deleteNews }) => {
  const history = useHistory();
  const location = useLocation();

  const getUrl = (newsItem) => {
    history.push({
      pathname: `news/details/${newsItem?.id}`,
      state: {
        prevQuery: location.search,
      },
    });
  }

  return (
    <Fragment>
      {
        news.data.map((newsItem, key) => {
          return (
            <tr style={{ height: '48px' }} key={key}>
              <td className={`text-14 text-adminPrimary-400 break-words ${styles.tableData}`}>
                <div className="cursor-pointer" onClick={() => getUrl(newsItem)}>
                  <div className="flex flex-col">
                    <div>{Parser(newsItem.title)}</div>
                    <div className="text-12">{newsItem.title_translation}</div>
                  </div>
                </div>
              </td>
              <td className="text-12 py-px-11 break-words text-adminGray-700">
                <div className="flex flex-col">
                  {(newsItem.status === 'not published') && (
                    <Fragment>
                      <div className="font-semibold">{formattedDateBy('SQL', newsItem.scheduled_published_at)}</div>
                      <div className="font-semibold">公開予定</div>
                    </Fragment>
                  )}
                  {(newsItem.published_at && newsItem.status === 'published') && (
                    <Fragment>
                      <div className="text-basic-200">{newsStatuses[newsItem.status]}</div>
                      <div className="text-basic-200">{formattedDateBy('SQL', newsItem.published_at)}</div>
                    </Fragment>
                  )}
                  {['expired', 'deleted'].includes(newsItem.status) && (
                    <div>{newsStatuses[newsItem.status]}</div>
                  )}
                  <div className="flex mt-px-8">
                    {newsItem.thumbnail && (
                      <ImageIcon
                        width="12" 
                        height="14" 
                        className="mr-2"
                        color="#044071"
                        opacity={newsItem.thumbnail ? "1" : "0"}
                      />
                    )}
                    {newsItem.vimeo_video_id && (
                      <HeadsetIcon opacity={newsItem.video ? "1" : "0"}/>
                    )}
                  </div>
                </div>
              </td>
              {/* <td className="text-12 py-px-11 text-adminGray-700">
                <Fragment>{ newsItem.published_at ? formattedDateBy('SQL', newsItem.published_at) : '-' }</Fragment>
              </td> */}
              <td className="text-12 py-px-11 text-adminGray-700">
                <div className="flex flex-col">
                  {formattedDate(newsItem.updated_at)}
                  <br />
                  {formattedTime(newsItem.updated_at)}
                </div>
              </td>
              <td className="text-12 py-px-11 text-adminGray-700">
                {newsItem.news_pvs.length || `-`}
              </td>
              <td className="text-12 py-px-11 text-adminGray-700">
                {newsItem.user_news.length || `-`}
              </td>
              <td className="text-12 py-px-11 text-adminGray-700">
                {newsItem.user_news_finished.length || `-`}
              </td>
              <td className="text-12 py-px-11 text-adminGray-700">
                {calculatePercentage(
                  newsItem.user_news_finished.length,
                  newsItem.user_news.length
                )}
              </td>
              <td className="text-12 py-px-11 text-adminGray-700">
                {/* <Link to={`/admin/news/details/${newsItem.id}/edit`}>
                  <EditIcon className="h-px-20 w-px-20 mr-px-10 cursor-pointer" />
                </Link> */}
                {/* {newsItem.deleted_at === null && (
                  <DeleteIcon
                    className="h-px-20 w-px-20 cursor-pointer" 
                    onClick={()=> deleteNews(newsItem.id)}
                  />
                )} */}
              </td>
            </tr>
          )
        })
      }
    </Fragment>
  )
}

export default TableItems
