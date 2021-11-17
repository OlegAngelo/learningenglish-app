import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router';

const TableItem = ({ list }) => {
  const location = useLocation();
  const history = useHistory();
  const onTitleClickHandler = (item) => {
    history.push({
      pathname: `/admin/reading/details/${item?.id}`,
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
            <td className="text-adminGray-700">
              {item.id}
            </td>
            <td className="text-adminPrimary-400 text-14">
              <span className="cursor-pointer" onClick={() => onTitleClickHandler(item)}>{item.title}</span>
            </td>
            <td className="text-adminGray-700">
              {item.unique_participants}
            </td>
            <td className="text-adminGray-700">
              {item.user_reads_paragraph}
            </td>
            <td className="text-adminGray-700">
              {item.time_clear_rate}
            </td>
            <td className="text-adminGray-700">
              {item.participants_average_correct_answer_rate}
            </td>
            <td className="text-adminGray-700">
              {item.last_modified}
            </td>
          </tr>
        )
      })}
    </Fragment>
  )
};

export default TableItem;

