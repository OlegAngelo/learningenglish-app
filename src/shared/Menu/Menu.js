import React from 'react';
import clsx from 'clsx';
import styles from './Menu.module.css';

export default function Menu({
  children,
  bgColor = '',
  spaceX = '',
  paddingX = '',
  paddingY = '',
  isTabFlat,
  forNews = false,
  customClassName = '',
  customInnerClass = '',
}) {
  const className = !forNews
    ? clsx(`relative bg-${bgColor} px-${paddingX} py-${paddingY} ${isTabFlat ? `h-px-37 ${styles.shadowMenu} pb-8` : 'h-px-52'}`)
    : clsx(`relative bg-${bgColor} px-${paddingX} py-${paddingY} h-px-48 ${styles.shadowMenu}`);

  return (
    <nav className={`${className} ${customClassName}`}>
      <ul className={clsx(`flex justify-center space-x-${spaceX} ${customInnerClass}`)}>
        {children}
      </ul>
    </nav>
  );
};
