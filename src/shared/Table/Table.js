import React from 'react';

import style from './Table.module.css';

const Table = ({type, className, children}) => {
  return (
    <table className={`${style[type]} ${className}`}>
      {children}
    </table>
  );
};

export default Table;
