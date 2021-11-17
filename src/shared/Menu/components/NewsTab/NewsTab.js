import React from 'react';

import styles from './NewsTab.module.css';

export default function NewsTab({ children, isActive, isNormalPadding = false }) {
  const base = `cursor-pointer whitespace-pre-wrap text-center grid place-items-center focus:outline-none ${styles.base}`;
  const style = `${base} text-14 border-basic-400 px-px-12 ${isActive ? 'text-basic-400 border-b-px-3 font-semibold' : 'text-primary-200 font-thin'} ${isNormalPadding ? styles.normalPadding : styles.smallPadding}`;

  return (
    <li>
      <div className={style}>
        {children}
      </div>
    </li>
  );
};
