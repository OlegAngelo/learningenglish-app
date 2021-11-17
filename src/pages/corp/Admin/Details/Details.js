import React from 'react';

import Breadcrumb from '../../../../shared/Breadcrumb';
import HeaderSection from './components/HeaderSection';
import MainContent from './components/MainContent';

const Details = () => {
  return (
    <div className='px-px-32 pt-px-24 flex-1 h-full w-full bg-adminGray-100'>
      <div className='h-px-25 flex mb-px-16'>
        <Breadcrumb text='ダッシュボード' to='/corp' />
        <Breadcrumb text='管理者' to='/corp/admins' />
        <Breadcrumb text='管理者詳細' to='#3' active last />
      </div>
      <div className={`bg-white rounded-px-4 w-px-928 shadow-card`}>
        <HeaderSection />
        <MainContent />
      </div>
    </div>
  );
};

export default Details;
