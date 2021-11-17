import React from 'react';

import Paginator from '../../../shared/Paginator';
import Table from '../../../shared/Table';

import moment from 'moment';
import Parser from 'html-react-parser';

import styles from './LearnerList.module.css'

const IndividualUsersTable = ({ 
  students,
  keyword, 
  isFetchingStudentList, 
  getUrl, 
  onPageChange }) => {
  
  const loading = "読み込み中...";
  const noData = 'ユーザーがまだ存在しません';
  const noDataFound = '該当のユーザーが見つかりません';

  const displayStatus =  {
    'active': '<span class="text-green-400 font-bold">利用中</span>',
    'stop subscription': '<span class="text-gray-400 font-bold">休会中</span>',
    'deleted': '<span class="text-red-400 font-bold">削除済</span>',
    null: '-'
  };

  return (
    <Table type="paginated" className="shadow-card w-full" style={{maxWidth: '1024px'}}>
      <tbody>
        <tr className="text-left">
          <th className={styles.tableHeader} style={{width: '191px'}}>氏名</th>
          <th className={styles.tableHeader} style={{width: '254px'}}>メールアドレス</th>
          <th className={styles.tableHeader} style={{width: '254px'}}>最終学習日</th> 
          <th className={styles.tableHeader} style={{width: '254px'}}>プラン開始日</th> 
          <th className={styles.tableHeader} style={{width: '254px'}}>プラン終了日</th> 
          <th className={styles.tableHeader} style={{width: '191px'}}>ステータス</th> 
        </tr>
        { isFetchingStudentList ? (
          <tr className="m-5 text-adminGray-500">
            <td colSpan="6" className="text-center">
              {loading}
            </td>
          </tr>
        ) : (
          students?.total ? ( 
            students.data.map((student) => {
              if (student.corporate_id == null) {
                return (
                  <tr key={student.id}>
                    <td style={{width: '191px'}} className="text-14">
                      <div
                          className="cursor-pointer text-adminPrimary-400"
                          onClick={() => getUrl(student)}
                        >
                          {student.name}
                        </div>
                    </td>
                    <td style={{width: '254px'}}>{student.email}</td>
                    <td style={{width: '254px'}}>{moment(student.created_at).format('YYYY/M/D')}</td>
                    <td style={{width: '254px'}}>{moment(student.subscriptions?.start_at).format('YYYY/M/D')}</td>
                    <td style={{width: '254px'}}>{moment(student.subscriptions?.end_at).format('YYYY/M/D')}</td>
                    <td style={{width: '191px'}}>{Parser(displayStatus[student.status])}</td> 
                  </tr>
                );
              }
            })
          ) : (
            <tr className="m-5 text-adminGray-500">
              <td colSpan="6" className="text-center">
                { keyword ? noDataFound : noData }
              </td>
            </tr>
          )
        )}
        <tr>
          <td colSpan="6" style={{padding: '0'}}>
            { students?.total ? (
              <Paginator 
                page={students?.current_page}
                pageCount={students?.last_page}
                onPageChange={onPageChange}
              />
            ) : ( 
              null
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default IndividualUsersTable;
