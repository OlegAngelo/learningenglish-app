import React from 'react';
import { Link } from 'react-router-dom';

import { buttonShadow } from './RatingButton.module.css';

const RatingButton = ({ buttonText, navigateTo, onClick, ...props }) => {
  return (
    <div {...props}>
      <Link
        className={`w-px-202 h-px-43 flex items-center justify-center bg-basic-400 ${buttonShadow} outline-none rounded font-bold text-14 text-primary-400`}
        onClick={onClick}
        to={navigateTo}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default RatingButton;
