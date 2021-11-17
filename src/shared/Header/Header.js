import React from 'react';
import { useHistory } from 'react-router-dom';

import BackIcon from '../icons/BackIcon';

import './Header.css';

// Utils
import breadcrumb from '../../utils/breadcrumb';

const Header = ({
  hasBack,
  title,
  children,
  rootClass = '',
  titleClass = '',
  backIconClass = '',
  forcedUrl = null
}) => {
  const history = useHistory();

  const checkCurrentRoute = () => {
    const pathname = history.location.pathname;
    const specialRoutes = [
      // Routes with tab
      /\/training\/muscle-courses\/.*\/lesson-log\/(result|words|phrases)/,
      /\/proficiency\/knowledge\/(words|phrases)\/.*/,
      /\/proficiency\/knowledge\/check-list\/(word|phrase)/,

      // Routes with exam launch button
      /\/training\/muscle-courses/,
      /\/training\/muscle-courses\/\d\/settings/,
    ];

    return specialRoutes.some(regex => regex.test(pathname));
  };

  const goBack = () => {
    if (window.specificQuestionBackToQuestionScreen) {
      return window.specificQuestionBackToQuestionScreen();
    }

    if (forcedUrl !== null) {
      history.push(forcedUrl);
    } else {
      breadcrumb.back((route) => {
        history.push(route)
      });
    }
  };

  return (
    <header className={rootClass}>
      <div className="flex items-end w-full h-16 px-5 py-3 bg-primary-500">
        <div className="flex items-center relative w-full">
          <div className="order-first absolute left-0">
            {hasBack && (
              <button onClick={() => goBack()} className={`${backIconClass} w-5`}>
                <span className="back-icon">
                  <BackIcon />
                </span>
              </button>
            )}
          </div>

          <span className={`font-bold text-white mx-auto ${titleClass}`}>{title}</span>

          <div className="order-last absolute right-0">{children}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
