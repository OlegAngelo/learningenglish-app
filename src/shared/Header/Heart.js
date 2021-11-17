import React from 'react';
import { Link } from 'react-router-dom';

import HeartIcon from '../../shared/icons/HeartIcon';

const Heart = ({link = '/news/bookmarks'}) => {
  return (
    <Link to={link}>
      <button className="-mr-px-2">
        <span className="close-icon">
          <HeartIcon />
        </span>
      </button>
    </Link>
  );
};

export default Heart;
