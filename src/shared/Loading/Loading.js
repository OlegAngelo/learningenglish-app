import React from 'react';

import styles from './Loading.module.css';

const Loading = ({ className, iconClass, rootPosition, position, height, zIndex }) => {
  return (
    <div className={`${rootPosition} grid place-items-center ${height} w-full ${zIndex} ${className}`}>
      <div className={`${styles.loader} ${position}`}>
        <span className={iconClass}></span>
        <span className={iconClass}></span>
        <span className={iconClass}></span>
        <span className={iconClass}></span>
        <span className={iconClass}></span>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  className: 'bg-primary-500',
  iconClass: 'bg-basic-400 text-basic-400',
  rootPosition: 'fixed',
  position: 'top-1/2',
  height: 'h-full',
  zIndex: 'z-50',
};

export default Loading;
