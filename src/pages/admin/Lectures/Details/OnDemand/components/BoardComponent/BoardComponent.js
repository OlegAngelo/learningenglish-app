import React from 'react';

import styles from './BoardComponent.module.css';

const BoardComponent = ({ children, className = 'justify-center px-8' }) => {
  return (
    <div className={`${className} flex`}>
      <div className={`w-full ${styles.boardRowContent}`}>
        <div className="font-hiragino">
          <div className="mt-px-40">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardComponent;
