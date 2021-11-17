import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { disableScroll } from '../../utils/scrollableHelper';

import style from './notFound.module.css';

const NotFoundRoute = ({ location: { state } }) => {
  const location = useLocation();

  useEffect(() => {
    disableScroll(true);
  });

  return (
    <Route
      path="*"
      component={() => {
        return (
          <div
            className={`h-full grid justify-items-center place-content-center ${style.container}`}
          >
            <h1>404</h1>
            <p>We can't find the page you're looking for.</p>
            {location.state?.route && (
              <a href={location.state.route}>{location.state.text}</a>
            )}
          </div>
        );
      }}
    />
  );
};

export default NotFoundRoute;
