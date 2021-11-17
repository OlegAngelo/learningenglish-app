import React from 'react';

import styles from './BorderBoxIcon.module.css';

const BorderBoxIcon = ({ icon = '', text = '', className = '', ...props }) => {
  return (
    <div className={`${styles.body} ${className} flex`}>
      <div
        className={`${styles.icon} rounded-full flex items-center justify-center bg-primary-50`}
      >
        {icon}
      </div>
      <div className={`${styles.text}`}>{text}</div>
    </div>
  );
};

export default BorderBoxIcon;
