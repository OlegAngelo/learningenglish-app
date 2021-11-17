import React from 'react';

import styles from './Card.module.css'

const Card = ({ label, content }) => {
  return (
    <div className={`bg-white rounded-px-4 border rounded-r p-4 ${styles.card}`}>
      <p className="text-left font-bold font-hiragino text-12 text-adminGray-400 leading-none">{label}</p>
      <div className="pt-px-12" />
      <p className="text-left font-normal font-hiragino text-16 leading-none text-adminGray-800">{content}</p>
    </div>
  );
};

export default Card;
