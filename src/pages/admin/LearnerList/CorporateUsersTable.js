import { useState, useEffect } from 'react';

import Table from '../../../shared/Table/Table';
import dummyData from './dummyData';
import Paginator from '../../../shared/Paginator';
import styles from './CorporateUsersTable.module.css';

const CorporateUsersTable = ({ getUrl }) => {
  const lastPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [corporateUsers, setCorporateUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const message = {
    loading: '学習者を読み込んでいます...',
    noDataFound: '学習者が見つかりません',
  };

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setCorporateUsers(dummyData);
      setIsFetching(false);
    }, 1000);
  }, []);

  return (
    <Table type="paginated" className="shadow-card w-full" style={{maxWidth: '1024px'}}>
      <tbody>
        <tr className="text-left">
          <th className={styles.tableHeader} style={{width: '20%'}}>氏名</th>
          <th className={styles.tableHeader} style={{width: '20%'}}>メールアドレス</th>
          <th className={styles.tableHeader} style={{width: '20%'}}>
            <span className={`${styles.tableHeader2}`}>最終学習日</span>
          </th>
          <th className={styles.tableHeader} style={{width: '20%'}}>
            <span className={`${styles.tableHeader2}`}>ステータス</span>
          </th>
          <th className={styles.tableHeader} style={{width: '20%'}}>法人名</th>
        </tr>

        { corporateUsers?.length ? (
          corporateUsers.map((corpUser) => (
            <tr key={corpUser.corporate_id}>
              <td style={{width: '20%'}} className="text-14">
                <div
                    className="cursor-pointer text-adminPrimary-400"
                    onClick={() => getUrl(corpUser)}
                  >
                    {corpUser.name}
                </div>
              </td>
              <td style={{width: '20%'}}>{corpUser.email}</td>
              <td style={{width: '20%'}}>{corpUser.updated_at}</td>
              <td
                className={
                  corpUser.status === '利用中'? styles.status利用中 :
                  corpUser.status === '休会中'? styles.status休会中 :
                  corpUser.status === '利用済'? styles.status利用済 : ""
                }
                style={{width: '20%'}}
                >{corpUser.status}
              </td>
              <td
                className={`${styles.tableCorporateName}`}
                style={{width: '20%'}}
                >{corpUser.company}
              </td>
            </tr>
          ))
        ) : (
          <tr className="m-5 text-adminGray-500">
            <td colSpan="9" className="text-center">
              {isFetching ? message.loading : message.noDataFound}
            </td>
          </tr>
        )}
        
        <tr>
          <td colSpan="6" style={{padding: '0'}}>
            { corporateUsers?.length ? (
              <Paginator 
                page={currentPage}
                pageCount={lastPage}
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

export default CorporateUsersTable;

