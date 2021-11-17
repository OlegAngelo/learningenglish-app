import React, { useEffect, useState } from 'react';

import Table from '../../../../../../shared/Table/Table';
import TableItem from '../TableItem/TableItem';
import Paginator from '../../../../../../shared/Paginator';

import style from '../../Index.module.css';

const TableList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 10;
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const message = {
    loading: '学習者を読み込んでいます...',
    noDataFound: '学習者が見つかりません',
  };
  const data = [
    {
      id: 1,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
    {
      id: 2,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
    {
      id: 3,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/24',
      last_login_date: '2021/5/24',
    },
    {
      id: 4,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '',
      last_login_date: '',
    },
    {
      id: 5,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '',
      last_login_date: '',
    },
    {
      id: 6,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
    {
      id: 7,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
    {
      id: 8,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
    {
      id: 9,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
    {
      id: 10,
      name: '佐藤 佑樹',
      email: 'yuki.sato@edgeschool.co.jp',
      registration_date: '2021/5/12',
      start_date: '2021/5/12',
      last_login_date: '2021/5/12',
    },
  ];

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setUsers(data);
      setIsFetching(false);
    }, 5000);
  }, []);

  return (
    <div className="pb-px-30">
      <Table type="paginated" className={`shadow-card w-full ${style.table}`}>
        <tbody>
          <tr className="text-left text-12 cursor-pointer">
            <th className={`py-px-11 pt-px-12 cursor-default ${style.td1}`}>
              氏名
            </th>
            <th className={`py-px-11 pt-px-12 cursor-default ${style.td2}`}>
              メールアドレス
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td3}`}
            >
              会員登録日
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td4}`}
            >
              利用開始日
            </th>
            <th
              className={`py-px-11 pt-px-12 ${style.highlightText} ${style.td5}`}
            >
              最終ログイン日
            </th>
          </tr>
          {users?.length ? (
            <TableItem list={users} />
          ) : (
            <tr className="m-5 text-adminGray-500">
              <td colSpan="9" className="text-center">
                {isFetching ? message.loading : message.noDataFound}
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="9" className={style.bottom}>
              {users?.length ? (
                <Paginator
                  page={currentPage}
                  pageCount={lastPage}
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
