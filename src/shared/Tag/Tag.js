import React from 'react';

import styles from './Tag.module.css';

const Tag = ({ className, color, size, light, darkBlue, width, pill, weightBold, weightLight, ...props }) => {
  const sizes = {
    xs: styles.sizeXSmall,
    s: styles.sizeSmall,
    m: styles.sizeMedium,
    l: styles.sizeLarge,
    xl: styles.sizeXLarge,
  };

  const tagStyle = [
    className,
    sizes[size],
    styles['tag'],
    styles[`bg-${color}`],
    (pill ? styles['circle'] : styles['rounded']),
    (light ? styles['light'] : (darkBlue ? styles['darkBlue'] : styles['dark'])),
    (weightBold ? 'font-theme-bold' : (weightLight ? 'font-theme-regular' : '')),
  ];
  
  return (
    <div className="flex items-center">
      <span
        className={tagStyle.join(' ')}
        style={{ minWidth: `${width.trim()}` }}
        {...props}
      >
        {props.children}
      </span>
    </div>
  );
};

Tag.defaultProps = {
  className: '',
  color: 'gray',
  width: '0',
  size: 'm',
};

export default Tag;
