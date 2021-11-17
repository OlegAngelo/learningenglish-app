import React from 'react';

import Breadcrumb from '../../../../../shared/Breadcrumb';
import TopSection from './components/TopSection';
import TableList from './components/TableList';

const List = () => {
  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full pb-px-20">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="Listening" to="#7" active last />
      </div>
      <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
        Listening一覧
      </span>
      <TopSection />
      <TableList />
    </div>
  );
};

export default List;
