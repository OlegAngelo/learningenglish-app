import React from 'react';
import KeyboardArrowRight from '../../../../../../../shared/icons/KeyboardArrowRight';

import style from './ListItem.module.css';

const ListItem = ({ image, title, description }) => {
  return (
    <div className={ `bg-primary-50 bg-opacity-50 relative font-hiragino-kaku ${style.card}` }>
      <div className="flex">
        <img src={process.env.PUBLIC_URL + image} alt="person" className={ `object-cover w-32 h-20 ${style.cardImage}` } />
        <div className="mt-1 text-basic-100">
          <span className="font-theme-regular text-12">
            {title}
          </span>
          <span className={ `block font-theme-bold ${style.cardDescription}` }>
            {description}
          </span>
        </div>
      </div>
      <div className={ `absolute ${style.arrowRightIcon}` } >
        <KeyboardArrowRight />
      </div>
    </div>
  );
};

export default ListItem;
