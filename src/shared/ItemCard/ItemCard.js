import React from 'react';

import styles from './ItemCard.module.css';

const ItemCard = ({ bgColor, children, width = '340px', height = '60px', className = 'flex-col items-center justify-center', ...props }) => {
  return (
    <div
      style={{maxWidth: width, height: height }}
      className={`
        flex
        ${bgColor}
        ${styles.itemCard}
        ${className}
      `}
      {...props}
    >
      { children }
    </div>
  );
};

export default ItemCard;
