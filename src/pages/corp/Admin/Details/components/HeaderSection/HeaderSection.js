import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ArrowBackIcon from '../../../../../../shared/icons/ArrowBackIcon';
import EditIcon from '../../../../../../shared/icons/EditIcon';
import DeleteIcon from '../../../../../../shared/icons/DeleteIcon';

const HeaderSection = () => {
  const location = useLocation();
  
  return (
    <div className='h-px-59 flex items-center justify-between border-b-px-1 border-adminGray-200'>
      <div className='flex'>
        <Link to={`/corp/admins/${location.state?.prevQuery ?? ''}`}>
          <ArrowBackIcon
            className='mx-px-16'
            color='#9CA3AF'
            width='24px'
            height='24px'
          />
        </Link>
        <span className='text-base-dark font-bold leading-px-20 text-20 mt-px-3'>
          管理者詳細
        </span>
      </div>
      <div className='pr-6 flex'>
        <div className='cursor-pointer'>
          <EditIcon />
          <span className='text-adminGray-500 font-theme-normal leading-px-14 text-14 mr-4 ml-1'>
            編集
          </span>
        </div>
        <div className='cursor-pointer'>
          <DeleteIcon />
          <span className='text-adminGray-500 font-theme-normal leading-px-14 text-14 ml-1'>
            削除
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
