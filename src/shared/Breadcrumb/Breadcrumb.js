import React from 'react';
import { NavLink } from 'react-router-dom';

import KeyboardArrowRightIcon from '../icons/KeyboardArrowRightIcon';

import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ text = '', to = '#', active, last }) => {
  return (
    <NavLink
      className={`${
        active ? 'text-adminGray-500 pointer-events-none' : 'text-adminGray-400'
      } text-14 ${styles.breadcrumbContent}`}
      to={to}
    >
      {text}
      {!last && (
        <KeyboardArrowRightIcon
          className="-mt-px-5"
          color="#6B7280"
          height="17"
          width="17"
        />
      )}
    </NavLink>
  );
};

export default Breadcrumb;
