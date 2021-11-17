import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useComponentVisible from '../../../utils/useComponentVisible';
import Breadcrumb from '../../../shared/Breadcrumb';
import Button from '../../../shared/Button';
import Input from '../../../shared/Input';
import Paginator from '../../../shared/Paginator';
import Table from '../../../shared/Table';
import AccountBoxIcon from '../../../shared/icons/AccountBoxIcon';
import DeleteIcon from '../../../shared/icons/DeleteIcon';
import EditIcon from '../../../shared/icons/EditIcon';
import SearchIcon from '../../../shared/icons/SearchIcon';
import ConfirmationModal from '../../../shared/ConfirmationModal';
import AlertModal from '../../../shared/AlertModal';

import style from './Administrator.module.css';

import AdminApi from '../../../api/AdminApi';
import { fetchAdminList } from '../../../redux/admin/slice';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Administrator = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [searchText, setSearchText] = useState('');
  const [isUsingSearch, setIsUsingSearch] = useState(false);
  const { admins, isFetchingAdminList } = useSelector((state) => state.admin);
  const { profile: authAdmin, isFetchingAuthAdmin } = useSelector(
    (state) => state.authAdmin
  );
  const page = useQuery().get('page') ?? 1;
  const keyword = useQuery().get('keyword') ?? '';
  const records = useQuery().get('records') ?? 10;
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState(false);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const loading = '読み込み中...';
  const noData = '管理者がまだ存在しません';
  const noDataFound = '該当の管理者が見つかりません';
  const deleteConfirmationMessage = 'このユーザを削除しますか？';
  const deleteSuccessMessage = 'ユーザを削除しました。';
  const deleteFailedMessage =
    'エラーが発生しました。後ほど再度お試しください。';

  useEffect(() => {
    keyword && setSearchText(keyword);
  }, []);

  useEffect(() => {
    const payload = {
      page,
      keyword,
      records,
    };
    dispatch(fetchAdminList(payload));
  }, [page, keyword, records]);

  useEffect(() => {
    if (searchText.length === 0 && !isFetchingAdminList) {
      history.push(
        `/admin/administrators?page=${page}&records=${records}&keyword=${keyword}`
      );
    }
    if (searchText.length === 0 && isUsingSearch) {
      history.push(`/admin/administrators?page=1`);
    }
    setIsUsingSearch(true);
  }, [searchText]);

  useEffect(() => {
    if (admins && !admins.data.length && admins.current_page != 1) {
      let pageparam = page - 1;
      let keywordParam = keyword ? `&keyword=${keyword}` : '';
      let recordsParam = records ? `&records=${records}` : '';
      dispatch(
        fetchAdminList({
          pageparam,
          keyword,
          records,
        })
      );
      history.push(
        `/admin/administrators?page=${pageparam}${recordsParam}${keywordParam}`
      );
    }
  }, [admins]);

  const onPageChange = ({ selected }) => {
    if (isFetchingAdminList) return;
    let keywordParam = keyword ? `&keyword=${keyword}` : '';
    let recordsParam = records ? `&records=${records}` : '';
    history.push(
      `/admin/administrators?page=${selected + 1}${recordsParam}${keywordParam}`
    );
  };

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    let recordsParam = records ? `&records=${records}` : '';
    history.push(
      `/admin/administrators?page=1&keyword=${searchText}${recordsParam}`
    );
    setIsUsingSearch(true);
  };

  const deleteAdmin = (adminId) => {
    setSelectedAdminId(adminId);
    setIsShowConfirmDeleteModal(true);
  };

  const onConfirmDelete = () => {
    AdminApi.deleteAdmin(selectedAdminId)
      .then((res) => {
        setIsDeleteSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setIsDeleteSuccess(false);
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
        setIsShowAlertModal(true);
        dispatch(
          fetchAdminList({
            page,
            keyword,
            records,
          })
        );
      });
  };

  const getUrl = (admin) => {
    history.push({
      pathname: `/admin/administrators/${admin?.id}/details`,
      state: {
        prevQuery: location.search,
      },
    });
  };

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full">
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

      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isDeleteSuccess}
        message={isDeleteSuccess ? deleteSuccessMessage : deleteFailedMessage}
      />

      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="管理者" to="#2" active last />
      </div>
      <div className="pb-4">
        <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
          管理者一覧
        </span>
        <div className={`flex justify-between pt-px-12 ${style.table}`}>
          <div className="relative">
            {isComponentVisible && !searchText && (
              <SearchIcon className={`z-10 absolute ${style.searchIcon}`} />
            )}
            <div className="w-1/3">
              <input
                type="text"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={handleSearchTextSubmit}
                ref={ref}
                onFocus={() => setIsComponentVisible(false)}
              />
            </div>
          </div>
          <NavLink to="/admin/administrators/register">
            <Button
              className=""
              innerClass="cursor-pointer"
              type="blue-square"
              icon={<AccountBoxIcon color="white" width="16" height="16" />}
            >
              新規登録
            </Button>
          </NavLink>
        </div>

        <div className="pt-px-16">
          <Table type="paginated" className={`shadow-card ${style.table}`}>
            <tbody>
              <tr className="text-left">
                <th className={`text-12 ${style.td1}`}>
                  <Input
                    type="checkbox"
                    className="flex self-center mt-px-2"
                  />
                </th>
                <th className={`text-12 py-px-11 pt-px-12 ${style.th2}`}>
                  名前
                </th>
                <th className={`text-12 py-px-11 ${style.td3}`}>
                  メールアドレス
                </th>
                <th className={`text-12 py-px-11 ${style.td4}`}></th>
              </tr>
              {isFetchingAdminList ? (
                <tr className="m-5 text-adminGray-500">
                  <td colSpan="6" className="text-center">
                    {loading}
                  </td>
                </tr>
              ) : (
                <Fragment>
                  {admins?.total ? (
                    admins.data.map((admin, key) => {
                      return (
                        <tr style={{ height: '48px' }} key={key}>
                          <td className={`${style.td1}`}>
                            <Input
                              type="checkbox"
                              className="flex self-center"
                            />
                          </td>
                          <td className={`text-14 py-px-11 ${style.td2}`}>
                            <div
                              className="cursor-pointer text-adminPrimary-400"
                              onClick={() => getUrl(admin)}
                            >
                              {admin.name}
                            </div>
                          </td>
                          <td className={`text-12 py-px-11 ${style.td3}`}>
                            {admin.email}
                          </td>
                          <td className={`flex justify-end ${style.td4}`}>
                            <EditIcon className="h-px-20 w-px-20 mr-px-15 cursor-pointer" />
                            <DeleteIcon
                              className={`h-px-20 w-px-20 cursor-pointer ${
                                authAdmin?.id == admin.id ? 'invisible' : ''
                              }`}
                              onClick={() => {
                                deleteAdmin(admin.id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="m-5 text-adminGray-500">
                      <td colSpan="6" className="text-center">
                        {keyword ? noDataFound : noData}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
              <tr>
                <td colSpan="6" className={style.bottom}>
                  {admins?.total ? (
                    <Paginator
                      page={admins?.current_page}
                      pageCount={admins?.last_page}
                      onPageChange={onPageChange}
                    />
                  ) : null}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
