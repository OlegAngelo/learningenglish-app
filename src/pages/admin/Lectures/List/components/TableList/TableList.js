import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

import Paginator from '../../../../../../shared/Paginator';
import Table from '../../../../../../shared/Table/Table';
import TableItems from '../TableItems';
import ExpandMoreIcon from '../../../../../../shared/icons/ExpandMoreIcon';
import ExpandLessIcon from '../../../../../../shared/icons/ExpandLessIcon';
import {
  deleteLectureDetails,
  fetchLectureList,
  resetLecturesList,
} from '../../../../../../redux/lectures/slice';

import style from '../../List.module.css';
import ConfirmationModal from '../../../../../../shared/ConfirmationModal/ConfirmationModal';
import AlertModal from '../../../../../../shared/AlertModal/AlertModal';
import modalMessage from '../../../../../../config/modalMessage.json';

const TableList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const URLParams = new URLSearchParams();
  const {
    page = 1,
    keyword = URLParams.keyword ?? '',
    orderBy = 'desc',
    orderByColumn = 'created_at',
    perPage = URLParams.perPage ?? 10,
    category = URLParams.category ?? '',
  } = queryString.parse(useLocation().search);
  
  const { lecturesList, isFetchingLecturesList, lecturesListPaginator } = useSelector(
    (state) => state.lectures
  );
  const loading = '読み込み中...';
  const noData = '授業がまだ存在しません';
  const noDataFound = ' 該当の授業がありません';
  const [selectedId, setSelectedLectureId] = useState(null);
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] = useState(false);
  const deleteConfirmationMessage = 'この授業を削除しますか？';
  const deleteSuccessMessage = '授業を削除しました。';
  const deleteFailedMessage = modalMessage['failedMessage'];
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [alertMessage, setAlertMessage] = useState(true);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  
  const deleteLecture = (lectureId) => {
    setSelectedLectureId(lectureId);
    setIsShowConfirmDeleteModal(true);
  };

  const onConfirmDelete = () => {
    const params = {
      perPage: ['10', '30', '50'].includes(perPage) ? perPage : 10,
      page: page,
      keyword,
      orderBy,
      orderByColumn,
      category,
    };
    dispatch(deleteLectureDetails({ lectureId: selectedId }))
      .then((res) => {
        const { status } = res.payload;
        if (status == 200) {
          setAlertMessage(deleteSuccessMessage);
          setIsSuccessRequest(true);
        } else {
          setAlertMessage(deleteFailedMessage);
          setIsSuccessRequest(false);
        }
        dispatch(fetchLectureList(params));
      })
      .catch((err) => {
        console.error(err);
        setAlertMessage(deleteFailedMessage);
        setIsSuccessRequest(false);
        setIsShowAlertModal(true);
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
        setIsShowAlertModal(true);
      });
  };

  useEffect(() => {
    const params = {
      perPage: ['10', '30', '50'].includes(perPage) ? perPage : 10,
      page: page,
      keyword,
      orderBy,
      orderByColumn,
      category,
    };

    dispatch(fetchLectureList(params));
    return () => dispatch(resetLecturesList());
  }, [page, keyword, orderBy, orderByColumn, perPage, category]);

  const onPageChange = ({ selected }) => {
    URLParams.append("page", selected + 1);
    URLParams.append("keyword", keyword);
    URLParams.append("orderBy", orderBy);
    URLParams.append("orderByColumn", orderByColumn);
    URLParams.append("perPage", perPage);
    URLParams.append("category",category);
    history.push({search: URLParams.toString()})
  };

  const handleOrderOnChange = (toOrderByColumn) => {
    let toOrderBy =
      orderBy === 'desc' || orderByColumn !== toOrderByColumn ? 'asc' : 'desc';

    URLParams.append("page", page ?? 1);
    URLParams.append("keyword", keyword ?? '');
    URLParams.append("orderBy", toOrderBy);
    URLParams.append("orderByColumn", toOrderByColumn);
    URLParams.append("perPage", perPage);
    URLParams.append("category",category);
    history.push({search: URLParams.toString()})
  };

  return (
    <div className="pt-px-16">
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
      />
      <ConfirmationModal
        showConfirmationModal={isShowConfirmDeleteModal}
        setShowConfirmationModal={setIsShowConfirmDeleteModal}
        message={deleteConfirmationMessage}
        submitText="はい"
        cancelText="いいえ"
        onSubmit={() => {
          onConfirmDelete();
        }}
      />
      <Table type="paginated" className={`shadow-card w-full ${style.table}`}>
        <tbody>
          <tr className="text-left text-12">
            <th className={`py-px-11 pt-px-12 ${style.td1}`}>タイトル</th>
            <th className={`py-px-11 pt-px-12 ${style.td2}`}>ジャンル</th>
            <th
              className={`relative py-px-11 pt-px-12 ${style.td3} ${style.highlightText} cursor-pointer ${
                orderByColumn === 'status' && 'bg-primary-50'
              }`}
              onClick={() => handleOrderOnChange('status')}
            >
              ステータス
              {orderByColumn === 'status' && orderBy === 'asc' ? (
                <ExpandLessIcon
                  className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                  width="11"
                  height="11"
                />
              ) : (
                orderByColumn === 'status' &&
                orderBy === 'desc' && (
                  <ExpandMoreIcon
                    className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                    width="11"
                    height="11"
                  />
                )
              )}
            </th>
            <th
              className={`relative py-px-11 pt-px-12 ${style.td4} ${style.highlightText} cursor-pointer ${
                orderByColumn === 'updated_at' && 'bg-primary-50'
              }`}
              onClick={() => handleOrderOnChange('updated_at')}
            >
              最終更新日時
              {orderByColumn === 'updated_at' && orderBy === 'asc' ? (
                <ExpandLessIcon
                  className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                  width="11"
                  height="11"
                />
              ) : (
                orderByColumn === 'updated_at' &&
                orderBy === 'desc' && (
                  <ExpandMoreIcon
                    className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                    width="11"
                    height="11"
                  />
                )
              )}
            </th>
            <th
              className={`relative py-px-11 pt-px-12 ${style.td5} ${style.highlightText} cursor-pointer ${
                orderByColumn === 'views' && 'bg-primary-50'
              }`}
              onClick={() => handleOrderOnChange('views')}
            >
              再生回数
              {orderByColumn === 'views' && orderBy === 'asc' ? (
                <ExpandLessIcon
                  className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                  width="11"
                  height="11"
                />
              ) : (
                orderByColumn === 'views' &&
                orderBy === 'desc' && (
                  <ExpandMoreIcon
                    className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                    width="11"
                    height="11"
                  />
                )
              )}
            </th>
            <th
              className={`relative py-px-11 pt-px-12 ${style.td6} ${style.highlightText} cursor-pointer ${
                orderByColumn === 'participants' && 'bg-primary-50'
              }`}
              onClick={() => handleOrderOnChange('participants')}
            >
              参加人数
              {orderByColumn === 'participants' && orderBy === 'asc' ? (
                <ExpandLessIcon
                  className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                  width="11"
                  height="11"
                />
              ) : (
                orderByColumn === 'participants' &&
                orderBy === 'desc' && (
                  <ExpandMoreIcon
                    className="ml-px-5 absolute right-0 mr-px-10 mt-px-3"
                    width="11"
                    height="11"
                  />
                )
              )}
            </th>
            <th className={`py-px-11 pt-px-12 ${style.td7}`}>動画数</th>
            <th className={`py-px-11 pt-px-12 ${style.td8}`}></th>
          </tr>
          {isFetchingLecturesList ? (
            <tr className="m-5 text-adminGray-500">
              <td colSpan="9" className="text-center">
                {loading}
              </td>
            </tr>
          ) : (
            <Fragment>
              {lecturesList?.length ? (
                <TableItems
                  lectures={lecturesList}
                  deleteLecture={deleteLecture}
                />
              ) : (
                <tr className="m-5 text-adminGray-500">
                  <td colSpan="9" className="text-center">
                    {keyword ? noDataFound : noData}
                  </td>
                </tr>
              )}
            </Fragment>
          )}

          <tr>
            <td colSpan="9" className={style.bottom}>
              {lecturesList?.length ? (
                <Paginator
                  page={lecturesListPaginator?.current_page}
                  pageCount={lecturesListPaginator?.last_page}
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
