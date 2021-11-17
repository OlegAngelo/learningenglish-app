import React from 'react';

import Breadcrumb from '../../../../shared/Breadcrumb';
import TopSection from './components/TopSection';
import TableList from './components/TableList';

const List = () => {
  return (
    <div className='px-px-32 pt-px-24 flex-1 h-full w-full bg-adminGray-100'>
      <div className='h-px-25 flex mb-px-16'>
        <Breadcrumb text='ダッシュボード' to='/corp' />
        <Breadcrumb text='管理者' to='#2' active last />
      </div>
      <span className='font-hiragino text-20 text-base-dark leading-px-20 font-bold'>
        管理者一覧
      </span>
      <TopSection />
      <TableList />
    </div>
  );
};

export default List;
