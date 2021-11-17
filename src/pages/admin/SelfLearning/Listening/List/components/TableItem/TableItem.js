import React, { Fragment } from 'react';

import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import { Link } from 'react-router-dom';

const TableItem = ({ list }) => {
  if (!list?.length) {
    return (
      <tr key={'empty'} className="m-5 text-adminGray-500">
        <td colSpan="7" className="text-center">
          該当のデータがありません
        </td>
      </tr>
    );
  }

  return (
    <Fragment>
      {list.map((item) => {
        return (
          <tr key={item.id}>
            <td className="text-adminGray-700">
              {item.id}
            </td>
            <td className="text-adminPrimary-400 text-14">
              <Link to={`/admin/listening/set/${item.id}`}>
                <span className="cursor-pointer">{item.title}</span>
              </Link>
            </td>
            <td className="text-adminGray-700">
              {!!item.total_count_taken_training_by_unique_user ? item.total_count_taken_training_by_unique_user : '-'}
            </td>
            <td className="text-adminGray-700">
              {!!item.total_count_taken_training_by_unique_user  ? item.total_count_taken_training : '-'}
            </td>
            <td className="text-adminGray-700">
              {!!item.total_count_taken_training_by_unique_user ? item.correct_answer_rate : '-'}
            </td>
            <td className="text-adminGray-700">
              {item.last_modified}
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
};

export default TableItem;
