import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import FaceIcon from '../icons/FaceIcon';
import SchoolIcon from '../icons/SchoolIcon';
import TimelineIcon from '../icons/TimelineIcon';
import ReceiptIcon from '../icons/ReceiptIcon';
import CreditCard from '../icons/CreditCard';
import SupervisedUser from '../icons/SupervisedUser';


import style from './CorporateSidebar.module.css';

const CorporateSidebar = () => {
 
  const currentURL = window.location.href;
  const pathName = new URL(currentURL);

  const corporateLinks = [
    {
      title: 'グループ',
      icon:  <SupervisedUser className={`mb-px-2 ${style.icon}`}/>,
      redirectTo: '/corp/group'
    },
    {
      title: '管理者',
      icon:  <FaceIcon className={`mb-px-2 ${style.icon}`}/>,
      redirectTo: '/corp/admins'
    },
    {
      title: '学習者',
      icon:  <SchoolIcon className={`mb-px-2 ${style.icon}`}/>,
      redirectTo: '/corp/users'
    },
    {
      title: 'プラン一覧',
      icon:  <CreditCard className={`mb-px-2 ${style.icon}`}/>,
      redirectTo: '/corp/plan'
    },
    {
      title: '請求関連',
      icon:  <ReceiptIcon className={`mb-px-2 ${style.icon}`}/>,
      redirectTo: '/corp/billing'
    },
  ];

  return (
    <Fragment>
      <div className={style.sidebarContainer}></div>
      <div className={`h-screen font-hiragino fixed top-0 left-0 ${style.sidebarContainer} ${style.bgGreen}`}>
        <div className="text-adminGray-50 text-18 font-theme-bold pl-px-18 pt-px-24 grid">
          <span style={{ lineHeight: '24px' }}>EDGe School</span>
          <span className="pt-px-2 leading-px-25" style={{ fontSize: '15px', letterSpacing: '5px' }}>法人管理画面</span>
        </div>
        <nav className="font-normal text-16 text-white leading-px-20 grid mt-px-24">
          <NavLink to='/corp' exact className={style.navLink} activeClassName={style.isActive}>
            <TimelineIcon className={`mb-px-2 ${style.icon}`}/>
            <span className="pl-px-16" >ダッシュボード</span>
          </NavLink>
          {corporateLinks.map((( linkItem, index ) => (
            <NavLink to={linkItem.redirectTo} className={style.navLink} activeClassName={style.isActive} key={index}>
              {linkItem.icon}
              <span className="pl-px-16" >{linkItem.title}</span>
            </NavLink>
          )))}
        </nav>
      </div>
    </Fragment>
  );
};

export default CorporateSidebar;
