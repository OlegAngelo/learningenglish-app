import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

import Table from '../../../../../../../shared/Table';
import TableItem from '../TableItem';
import Paginator from '../../../../../../../shared/Paginator';
import ExpandLessIcon from '../../../../../../../shared/icons/ExpandLessIcon';
import ExpandMoreIcon from '../../../../../../../shared/icons/ExpandMoreIcon';

import { listeningListSelector } from '../../../../../../../redux/selfLearning/listening/admin/selectors';
import {
  fetchList,
  resetListeningList,
} from '../../../../../../../redux/selfLearning/listening/admin/slice.js';

import style from '../../List.module.css';

const TableList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const URLParams = new URLSearchParams();
  const {
    page = URLParams.page ?? 1,
    level = URLParams.level ?? 1,
    perPage = URLParams.perPage ?? 10,
    keyword = URLParams.keyword ?? '',
  } = queryString.parse(useLocation().search);
  const { isFetchingList, listPaginator } = useSelector(
    (state) => state.adminSLListening
  );
  const listeningList = useSelector(listeningListSelector);
  const sortStatus = localStorage.getItem('isListeningAscending');
  const [ isAscending, setIsAscending ] = useState((
    sortStatus === null ? 
      true : sortStatus === 'false' ?
      false : true
  ));
  const message = {
    loading: '読み込み中...',
    noDataFound: 'Listeningの問題が見つかりません',
  };

  const onPageChange = ({ selected }) => {
    URLParams.append('page', selected + 1);
    URLParams.append('level', level);
    URLParams.append('perPage', perPage);
    URLParams.append("keyword", keyword);
    history.push({ search: URLParams.toString() });
  };

  useEffect(() => {
    const params = {
      page,
      level,
      perPage,
      keyword
    };
    dispatch(fetchList(params));

    return () => dispatch(resetListeningList());
  }, [page, level, perPage, keyword]);

  const onIdClickHandler = () => {
    setIsAscending(isAscending ? false : true);
  };

  useEffect(() => {
    if (sortStatus === 'true') {
      setIsAscending(true);
    }
  }, [listeningList]);

  useEffect(() => {
    localStorage.setItem('isListeningAscending', isAscending);
  }, [isAscending]);

  const arrayReverseObj = (obj) => {
    let newArray = [];
      Object.keys(obj)
      .reverse()
      .forEach(key => {
        newArray.push({
        'key': key, 
        'id': obj[key].id,
        'title': obj[key].title,
        'total_count_taken_training_by_unique_user': obj[key].total_count_taken_training_by_unique_user,
        'total_count_taken_training': obj[key].total_count_taken_training,
        'correct_answer_rate': obj[key].correct_answer_rate,
        'pronounciation_implementation_rate': obj[key].pronounciation_implementation_rate,
        'last_modified': obj[key].last_modified
        })
      })

    return newArray;
  };

  return (
    <div className="pb-px-30">
      <Table type="paginated" className={`shadow-card w-full ${style.table}`}>
        <tbody>
          <tr className="text-left text-12 cursor-pointer">
            <span onClick={() => onIdClickHandler()}>
              <th className={`relative py-px-11 pt-px-12 bg-primary-50 ${style.highlightText} ${style.td1}`}
              >Set ID
                {isAscending ?
                    <ExpandLessIcon
                      className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                      width="10"
                      height="11"
                      color="#044071"
                      opacity="1"
                    />
                    :
                    <ExpandMoreIcon
                      className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                      width="10"
                      height="11"
                      color="#044071"
                      opacity="1"
                    />
                  }
              </th>
              </span>
            <th className={`py-px-11 pt-px-12 cursor-default ${style.td2}`}>
              タイトル
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td3}`}
            >
              実施人数
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td4}`}
            >
              総回答数
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td5}`}
            >
              正答率
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td7}`}
            >
              最終更新日時
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td8}`}
            ></th>
          </tr>
          {isFetchingList ? (
            <tr className="m-5 text-adminGray-500">
              <td colSpan="9" className="text-center">
                {message.loading}
              </td>
            </tr>
          ) : (
            <TableItem list={isAscending? listeningList : arrayReverseObj(listeningList)} />
          )}
          <tr>
            <td colSpan="9" className={style.bottom}>
              {listeningList?.length ? (
                <Paginator
                  page={listPaginator?.current_page}
                  pageCount={listPaginator?.last_page}
                  onPageChange={onPageChange}
                />
              ) : null}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableList;
