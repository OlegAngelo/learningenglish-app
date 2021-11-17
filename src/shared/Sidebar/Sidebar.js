import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import LectureDevicesIcon from '../../shared/icons/LectureDevicesIcon'
import FaceIcon from '../icons/FaceIcon';
import PersonIcon from '../icons/PersonIcon';
import SchoolIcon from '../icons/SchoolIcon';
import TimelineIcon from '../icons/TimelineIcon';
import NewsIcon from '../icons/NewsIcon';
import BrainIcon from '../icons/BrainIcon';
import ListenIcon from '../icons/ListenIcon';

import adminAuthApi from '../../services/AdminAuthApi';

import style from './Sidebar.module.css';

const Sidebar = () => {
  const history = useHistory();
  const { confirmBeforeLeaving, hasPressOkey } = useSelector(
    (state) => state.confirmDialog
  );

  const logoutOnClick = () => {
    // do not call logout api automatically if there is confirmation dialog used
    if (!confirmBeforeLeaving) {
      adminAuthApi.logout();
    }
  };

  const currentURL = window.location.href;
  const pathName = new URL(currentURL);
  const listeningURL = /listening/;
  const readingURL = /reading/;
  
  const onClickReading = () => {
    if (readingURL.test(currentURL)) {
      if (pathName.search === '') {
        localStorage.setItem('isReadingAscending', true);
        window.location.replace('/admin/reading');
      } else {
        localStorage.setItem('isReadingAscending', true);
        history.push('/admin/reading/');
      }
    }
  };

  const onClickListening = () => {
    if (listeningURL.test(currentURL)) {
      if (pathName.search === '') {
        localStorage.setItem('isListeningAscending', true);
        window.location.replace('/admin/listening');
      } else {
        localStorage.setItem('isListeningAscending', true);
        history.push('/admin/listening/');
      }
    }
  };

  if (!readingURL.test(currentURL)) {
    localStorage.setItem('isReadingAscending', true);
  }

  if (!listeningURL.test(currentURL)) {
    localStorage.setItem('isListeningAscending', true);
  }

  useEffect(() => {
    if (confirmBeforeLeaving && hasPressOkey) adminAuthApi.logout();
  }, [hasPressOkey]);

  return (
    <Fragment>
      <div className={style.sidebarContainer}></div>
      <div className={`h-screen bg-background-300 font-hiragino fixed top-0 left-0 ${style.sidebarContainer}`}>
        <div className="text-adminGray-50 text-18 font-theme-bold pl-px-18 pt-px-24 grid">
          <span style={{ lineHeight: '24px' }}>EDGe School</span>
          <span className="pt-px-2 leading-px-25" style={{ fontSize: '15px', letterSpacing: '8px' }}>管理画面</span>
        </div>
        <nav className="font-normal text-16 text-white leading-px-20 grid mt-px-24">
          <NavLink to='/admin' exact className={style.navLink} activeClassName={style.isActive}>
            <TimelineIcon className={`mb-px-2 ${style.icon}`}/>
            <span className="pl-px-16" >ダッシュボード</span>
          </NavLink>
          <NavLink to='/admin/administrators' className={style.navLink} activeClassName={style.isActive}>
            <FaceIcon className={`mb-px-2 ${style.icon}`}/>
            <span className="pl-px-16" >管理者</span>
          </NavLink>
          <NavLink to='/admin/users' className={style.navLink} activeClassName={style.isActive}>
            <SchoolIcon className={`mb-px-2 ${style.icon}`}/>
            <span className="pl-px-16" >学習者</span>
          </NavLink>
          <NavLink to='/admin/account' className={style.navLink} activeClassName={style.isActive}>
            <PersonIcon className={`mb-px-2 ${style.icon}`}/>
            <span className="pl-px-16" >アカウント</span>
          </NavLink>
          <NavLink to='/admin/lectures' className={style.navLink} activeClassName={style.isActive}>
            <LectureDevicesIcon
              height="18"
              width="18"
              className={`mb-px-2 ${style.icon}`}
            />
            <span className="pl-px-16" >大教室</span>
          </NavLink>
          <NavLink to='/admin/news' className={style.navLink} activeClassName={style.isActive}>
            <NewsIcon className={`mb-px-2 ${style.icon}`}/>
            <span className="pl-px-16" >ニュース</span>
          </NavLink>
          <NavLink to='/admin/reading' className={style.navLink} activeClassName={style.isActive}>
            <BrainIcon 
              height="18"
              width="18"
              color="#FFFFFF"
              className={`mb-px-2 ${style.icon}`}
            />
            <span onClick={() => onClickReading()} className="pl-px-16" >Reading</span>
          </NavLink>
          <NavLink to='/admin/listening' className={style.navLink} activeClassName={style.isActive}>
            <ListenIcon 
              height="18"
              width="18"
              color="#FFFFFF"
              className={`mb-px-2 ${style.icon}`}
            />
            <span onClick={() => onClickListening()} className="pl-px-16" >Listening</span>
          </NavLink>
          <NavLink 
            className={`text-left ${style.navLink}`} 
            onClick={logoutOnClick}
            to={'#'}
          >
            <span className="pl-px-16" >ログアウト</span>
          </NavLink>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
