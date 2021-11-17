import React from 'react';

import Card from '../../../../../../shared/Card';
import style from './MainContent.module.css'

const MainContent = () => {
  return (
    <div className='ml-px-97 mt-px-23 mr-10'>
      <div className='mb-10'>
        <div className='text-12 leading-px-12 text-adminGray-400 pb-4 font-theme-bolder'>
          名前
        </div>
        <div className='text-14 text-adminGray-900 leading-px-14 font-theme-normal'>
          佐藤 佑樹
        </div>
      </div>
      <div className='mb-10'>
        <div className='text-12 leading-px-12 text-adminGray-400 pb-4 font-theme-bolder'>
          メールアドレス
        </div>
        <div className='text-14 text-adminGray-900 leading-px-14 font-theme-normal tracking-wide'>
          yuki.sato@edgeschool.com
        </div>
      </div>
      <div className={`${style.paddingBottom}`}>
        <div className='text-base-dark font-bold leading-px-20 text-18 pb-px-16'>
          情報
        </div>
        <div className='grid gap-x-4 grid-cols-4'>
          <Card className='p-4'>
            <div className='text-adminGray-400 font-theme-bolder text-12 mb-px-12'>
              利用状況
            </div>
            <div className='text-adminGray-800 font-theme-normal text-16'>
              利用中
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
