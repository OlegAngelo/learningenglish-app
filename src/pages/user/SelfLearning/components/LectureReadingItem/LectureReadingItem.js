import React, { useEffect, useState } from 'react';
import UserReadingApi from '../../../../../api/SelfLearning/Reading/UserReadingApi';

import style from './LectureReadingItem.module.css';

const LectureReadingItem = ({ item }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    UserReadingApi.fetchImage(item.thumbnail).then((res) => {
      setImage(
        URL.createObjectURL(new Blob([res.data], { type: 'image/bmp' }))
      );
    });
  }, []);

  return (
    <div className={`${style.containerHeight} flex flex-col`}>
      {image ? (
        <img className={`${style.itemCardImage} object-cover`} src={image} />
      ) : (
        <div className="w-px-128 h-px-72 bg-basic-300 animate-pulse"></div>
      )}
      <p
        className={`${style.textFormat} text-14 font-bold text-basic-100 leading-px-20 `}
      >
        {item.title}
      </p>
    </div>
  );
};

export default LectureReadingItem;
