import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <Fragment>
      <div className={style.sidebarContainer}></div>
      <div className={`h-screen bg-background-300 font-hiragino fixed top-0 left-0 ${style.sidebarContainer}`}>
        <div className="text-adminGray-50 text-18 font-theme-bold pl-px-18 pt-px-24 grid">
          <span className="font-black" style={{ lineHeight: '24px' }}>Stripe API</span>
          <span className="pt-px-2 leading-px-25" style={{ fontSize: '15px', letterSpacing: '5px' }}>Testing Page</span>
        </div>
        <nav className="font-normal text-16 text-white leading-px-20 grid mt-px-24">
          <NavLink to='/stripe/payment-intent' exact className={style.navLink} activeClassName={style.isActive}>
            <span className="pl-px-16">Purchase</span>
          </NavLink>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
