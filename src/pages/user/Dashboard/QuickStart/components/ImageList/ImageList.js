import React from 'react';
import styles from './ImageList.module.css';

const ImageList = ({ imgSrc, title, subTitle, unitNumber }) => {
  return (
    <div
      style={{ backgroundImage: `url('/images/${imgSrc}')` }}
      className={`flex flex-col items-center justify-center bg-no-repeat bg-cover shadow-2xl ${styles.imageList}`}
    >
      <p className={`text-basic-400 text-lg ${styles.header}`}>{title}</p>
      <p className={`text-basic-400 mt-3 text-12 ${styles.header}`}>{unitNumber} <span className={`${styles.subs}`}>{subTitle}</span></p>
    </div>
  )
}

export default ImageList;
