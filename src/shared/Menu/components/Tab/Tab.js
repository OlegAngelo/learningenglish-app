import React from 'react';

import styles from './Tab.module.css';

export default function Tab({ className = '', disabled = false, type, children, isActive, onClick }) {
  const base = 'grid place-items-center focus:outline-none';
  const baseRounded = `${base} rounded-px-20 text-12 ${isActive ? 'text-primary-500 bg-basic-400' : 'text-basic-400 border-basic-400 border'}`
  const baseFlat = 'grid place-items-center focus:outline-none text-primary-500';
  const tabtype = {
    rounded2: `${baseRounded} w-px-112 h-px-28`,
    rounded3: `${baseRounded} w-px-80 h-px-28`,
    rounded4: `${baseRounded} w-px-109 h-px-28`,
    flat: `${base} ${!isActive ? 'text-primary-200' : 'text-basic-400'} text-14 pt-px-8 pb-px-5 border-basic-400 w-px-100 ${isActive ? 'border-b-px-3 font-semibold' : 'font-thin'}`,
    flat2: `${baseFlat} text-18 pt-px-8 pb-px-5 w-full font-bold ${isActive ? `border-b-px-3 ${styles.flat2}` : ''}`,
  }

  return (
    <li>
      <div
        className={`${tabtype[type]} ${className}`}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
        onClick={onClick}
      >
        {children}
      </div>
    </li>
  );
}
