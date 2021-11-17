import React from 'react'
import { NavLink } from 'react-router-dom';

import HomeIcon from '../icons/HomeIcon';
import ListIcon from '../icons/ListIcon';
import ChartIcon from '../icons/ChartIcon';
import InvitationIcon from '../icons/InvitationIcon';
import styles from './Footer.module.css';

const Footer = () => {

  return (
    <footer className={`${styles.footerBg}`}>
      <div className={`grid grid-cols-4 gap-2 text-center font-hiragino-kaku ${styles.footerIcons}`}>
        <NavLink 
          to="/"
          exact
          activeClassName={styles.activeNavLink}
          className="text-8 text-center font-bold mx-auto"
        >
          <HomeIcon 
            className={`text-center mx-auto ${styles.footerIcon}`} 
          />
          <p className={`text-8 mt-px-6`}>HOME</p>
        </NavLink>
        <NavLink 
          to="/training"
          isActive={(match, { pathname }) => pathname.match(/\/(training|news|lectures|self-learning)\.*/)}
          activeClassName={styles.activeNavLink}
          className="text-8 text-center font-bold mx-auto"
        >
          <ListIcon 
            className= {`text-center mx-auto -ml-px-3 mt-px-4 ${styles.footerIcon}`}
          />
          <p className={`text-8 mt-px-8 -ml-px-3`}>トレーニング</p>
        </NavLink>
        <NavLink 
          to="/proficiency/knowledge/words"
          isActive={(match, { pathname }) => pathname.match(/\/proficiency\/(skill|knowledge|non-verbal)\/\.*/)}
          activeClassName={styles.activeNavLink}
          className="text-8 text-center font-bold mx-auto"
        >
          <ChartIcon 
            className={`text-center mx-auto -ml-2 ${styles.footerIcon}`}
          />
          <p className={`text-8 mt-px-4 -ml-2`}>習熟度</p>
        </NavLink>
        <NavLink 
          to="/learning-logs"
          activeClassName={styles.activeNavLink}
          className="text-8 text-center font-bold mx-auto"
        >
          <InvitationIcon 
            className={`text-center mx-auto -ml-3 -mt-px-2 ${styles.footerIcon}`}
          /> 
          <p className={`text-8 mt-px-2 -ml-3`}>学習ログ</p>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
