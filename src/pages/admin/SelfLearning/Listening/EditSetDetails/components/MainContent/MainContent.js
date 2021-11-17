import React from 'react';

import styles from './MainContent.module.css';

const MainContent = ({children}) => {
  return (
    <div className={`flex justify-center px-8`}>
      <div className={`w-full ${styles.boardRowContent}`}>
        <div className="font-hiragino">
          <div className="mt-px-40">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default MainContent;
