import React, { useEffect } from 'react';

import Breadcrumb from '../../../../shared/Breadcrumb';
import TopSection from './components/TopSection';
import TableList from './components/TableList';

const List = () => {
  
  useEffect(() => {
    document.body.className = 'bg-adminGray-100';
  });

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full pb-px-20">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="大教室　授業一覧" to="#5" active last />
      </div>
      <TopSection />
      <div className="pb-12">
        <TableList />
      </div>
    </div>
  );
};

export default List;
