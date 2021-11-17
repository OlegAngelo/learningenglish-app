import React, { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import style from './TableItem.module.css';

const TableItem = ({ corpAdmin }) => {
  const history = useHistory();
  const location = useLocation();

  const getUrl = (corpAdminItem) => {
    history.push({
      pathname: `/corp/admins/${corpAdminItem?.id}/details`,
      state: {
        prevQuery: location.search,
      },
    });
  };

  return (
    <Fragment>
      {corpAdmin.map((corpAdminItem, key) => {
        return (
          <tr style={{ height: '71px' }} key={key}>
            <td className={style.td1}>
              <div
                className='cursor-pointer text-adminPrimary-400 text-14 font-normal'
                onClick={() => getUrl(corpAdminItem)}
              >
                {corpAdminItem.fullName}
              </div>
            </td>
            <td className='text-12 font-normal tracking-wide'>
              {corpAdminItem.emailAdd}
            </td>
            <td
              className={`text-12 font-bold ${
                corpAdminItem.status === '利用中'
                  ? 'text-secondary-40'
                  : 'text-exam-error'
              }`}
            >
              {corpAdminItem.status}
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
};

export default TableItem;
