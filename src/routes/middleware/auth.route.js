import React, { Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';

import AuthApi from '../../services/AuthApi';
import breadcrumb from '../../utils/breadcrumb';
import useCheckNetwork from '../../hooks/useCheckNetwork';

// Shared
import Alert from '../../shared/Alert';

const AuthRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const isOnline = useCheckNetwork();

  useEffect(() => {
    breadcrumb.push(location.pathname);
  }, [Component]);

  return (
    <Fragment>
      <Alert
        show={!isOnline}
        msg={'エラーが発生しました。後ほど再度お試しください'}
        callBack={() => window.location.reload()}
      />

      <Route
        {...rest}
        render={(props) => {
          if (!AuthApi.isAuthenticated()) {
            return <Component {...props} />;
          } else {
            return <Redirect to={
              {
                pathname: '/',
                state: {
                  from: props.location
                }
              }
            } />;
          }
        }}
      />
    </Fragment>
  );
};

export default AuthRoute;
