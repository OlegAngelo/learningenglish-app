import React from 'react';
import styles from './ImageBanner.module.css';

const ImageBanner = ({ imgSrc, title, subTitle, imageWidthSize = '335px', headerWidth = '305px', headerHeight = '15px', imageHeightSize = '120px', imageBgStyle, isAbsolute }) => {
  return (
    <div style={{ backgroundImage: `url('/images/${imgSrc}')`, maxWidth: imageWidthSize, height: imageHeightSize }} className={`flex flex-col items-center justify-center bg-no-repeat bg-cover shadow-2xl ${styles.imageBanner}`} >
      <div style={imageBgStyle}>
      </div>
      <div className={isAbsolute && 'absolute'}>
        <p className={`text-basic-400 text-lg ${styles.header}`} style={{ width: headerWidth, height: headerHeight }}>{title}</p>
        <p className={`text-basic-400 mt-3 text-12 ${styles.header}`}>{subTitle}</p>
      </div>
    </div>
  )
}

export default ImageBanner;
