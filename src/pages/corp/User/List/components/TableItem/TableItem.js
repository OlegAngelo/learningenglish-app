import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router';

const TableItem = ({ list }) => {
  const location = useLocation();
  const history = useHistory();
  const onTitleClickHandler = (item) => {
    history.push({
      pathname: `/corp/users/${item?.id}`,
      state: {
        prevQuery: location.search,
      },
    });
  };

  return (
    <Fragment>
      {list.map((item) => {
        return (
          <tr>
            <td className="text-adminPrimary-400 text-14">
              <span
                className="cursor-pointer"
                onClick={() => onTitleClickHandler(item)}
              >
                {item.name || '-'}
              </span>
            </td>
            <td className="text-adminGray-700">{item.email || '-'}</td>
            <td className="text-adminGray-700">{item.registration_date || '-'}</td>
            <td className="text-adminGray-700">{item.start_date || '-'}</td>
            <td className="text-adminGray-700">{item.last_login_date || '-'}</td>
          </tr>
        );
      })}
    </Fragment>
  );
};

export default TableItem;
