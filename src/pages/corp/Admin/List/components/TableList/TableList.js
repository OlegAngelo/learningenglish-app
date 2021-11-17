import React, { Fragment, useState } from 'react';

import Table from '../../../../../../shared/Table';
import Paginator from '../../../../../../shared/Paginator';
import TableItem from '../TableItem';

import style from './TableList.module.css';
import dummyData from '../../dummyData';

const TableList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className='pt-px-16'>
      <Table type='paginated' className={`shadow-card ${style.table}`}>
        <tbody>
          <tr className='text-left'>
            <th className={`text-12 ${style.th1}`}>氏名</th>
            <th className={`text-12 ${style.th2}`}>メールアドレス</th>
            <th className={`text-12 ${style.th3}`}>ステータス</th>
          </tr>
          {/* Loading Section */}
          {/* {isFetchingAdminList ? (
            <tr className='m-5 text-adminGray-500'>
              <td colSpan='6' className='text-center'>
                {loading}
              </td>
            </tr>
          ) : ( */}
          <Fragment>
            {/* {admins?.total ? ( */}
            <TableItem corpAdmin={dummyData} />
            {/* ) : (
              <tr className='m-5 text-adminGray-500'>
                <td colSpan='6' className='text-center'>
                  {keyword ? noDataFound : noData}
                </td>
              </tr>
            )} */}
          </Fragment>
          {/* )} */}
          <tr>
            <td colSpan='6' className={style.bottom}>
              {dummyData ? (
                <Paginator
                  page={currentPage}
                  pageCount={10}
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
