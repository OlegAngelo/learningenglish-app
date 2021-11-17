import React from 'react';

import Button from '../../../../shared/Button';
import ImageBanner from '../../Dashboard/QuickStart/components/ImageBanner';

import styles from './Training.module.css';

const Training = (props) => {
  return (
    <div className="text-primary-500 font-hiragino" style={{ margin: '0px 20px 31px 20px' }}>
      <div className="text-24 font-bold leading-px-36" style={{ letterSpacing: '0.15px' }}>
        { props.title }
      </div>
      <div className={`${styles.description}text-14 font-normal`}>
        {props.description}
      </div>
      <div style={props.imageGapStyle}></div>
      <ImageBanner
        imgSrc={props.imgSrc}
        title={props.imageTitle}
        subTitle={props.imageSubtitle}
        imageWidthSize="100%"
        headerWidth="315px"
        headerHeight={props.headerHeight}
        imageHeightSize={props.heightSize}
        imageBgStyle={props.imageBgStyle}
        isAbsolute
      />
      { props.hasButton && (<div style={props.buttonStyle}><Button type="white-rectangle">コース一覧から選ぶ</Button></div>)}
    </div>
  );
};

export default Training;
