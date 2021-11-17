import React from 'react';

import Breadcrumb from '../../../../shared/Breadcrumb/Breadcrumb';
import TopSection from './components/TopSection/TopSection';
import TableList from './components/TableList/TableList';

const Index = () => {
  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full pb-px-20 bg-adminGray-100">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/corp" />
        <Breadcrumb text="学習者" to="#7" active last />
      </div>
      <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
        学習者一覧
      </span>
      <TopSection />
      <TableList />
    </div>
  );
};

export default Index;
