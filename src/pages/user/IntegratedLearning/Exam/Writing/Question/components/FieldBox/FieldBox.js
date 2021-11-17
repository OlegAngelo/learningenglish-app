import React from 'react';

import styles from './FieldBox.module.css';

const FieldBox = ({ text, divClassName }) => {
  return (
    <div className={divClassName} >
      <p>{text}</p>
      <hr className={styles.hr} />
    </div>
  )
}

export default FieldBox;
