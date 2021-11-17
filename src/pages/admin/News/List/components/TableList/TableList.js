import React, { useEffect, Fragment} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Paginator from '../../../../../../shared/Paginator';
import Table from '../../../../../../shared/Table/Table';
import TableItems from './TableItems';

import { fetchNewsList } from '../../../../../../redux/news/slice';

import style from '../../List.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TableList = ({ deleteNews }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    news,
    isFetchingNewsList,
  } = useSelector(state => state.news);
  const page = useQuery().get('page');
  const keyword = useQuery().get('keyword');
  const records = useQuery().get('records');
  const loading = '読み込み中...';
  const noData = 'ニュースがまだ存在しません';
  const noDataFound = '該当のニュースが見つかりません';

  useEffect(() => {
    const payload = {
      page,
      keyword,
      records,
    }
    dispatch(fetchNewsList(payload));
  }, [page, keyword, records]);

  const onPageChange = ({selected}) => {
    if (isFetchingNewsList) return;
    let keywordParam = keyword ? `&keyword=${keyword}` : '';
    let recordsParam = records ? `&records=${records}` : '';
    history.push(`/admin/news?page=${selected+1}${keywordParam}${recordsParam}`);
  }

  return (
    <div className="pt-px-16">
      <Table type="paginated" className={`shadow-card w-full ${style.table}`}>
        <tbody>
          <tr className="text-left text-12">
            <th className={`py-px-11 pt-px-12 ${style.td1}`}>タイトル</th>
            <th className={`py-px-11 pt-px-12 ${style.td2}`}>ステータス</th>
            <th className={`py-px-11 pt-px-12 ${style.td3}`}>最終更新日時</th>
            <th className={`py-px-11 pt-px-12 ${style.td4}`}>閲覧数</th>
            <th className={`py-px-11 pt-px-12 ${style.td5}`}>閲覧人数</th>
            <th className={`py-px-11 pt-px-12 ${style.td6}`}>完了人数</th>
            <th className={`py-px-11 pt-px-12 ${style.td7}`}>完了割合</th>
            <th className={`py-px-11 pt-px-12 ${style.td8}`}></th>
          </tr>
          { isFetchingNewsList
          ? (
            <tr className="m-5 text-adminGray-500">
              <td colSpan="9" className="text-center">
                {loading}
              </td>
            </tr>
          ) : (
            <Fragment>
              { news.total
                ? (
                  <TableItems
                    news={news}
                    deleteNews={deleteNews}
                  />
                ) : (
                  <tr className="m-5 text-adminGray-500">
                    <td colSpan="9" className="text-center">
                      { keyword ? noDataFound : noData }
                    </td>
                  </tr>
                )
              }
            </Fragment>
          )}
          <tr>
              <td colSpan="9" className={style.bottom}>
                { news?.total ? (
                  <Paginator
                    page={news?.current_page}
                    pageCount={news?.last_page}
                    onPageChange={onPageChange}
                  />
                ) : ( null )}
              </td>
            </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableList;
