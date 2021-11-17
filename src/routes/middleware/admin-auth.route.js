import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AdminAuthApi from '../../services/AdminAuthApi';

const AdminAuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!AdminAuthApi.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return <Redirect to={
            {
              pathname: '/admin',
              state: {
                from: props.location
              }
            }
          } />;
        }
      }}
    />
  );
};

export default AdminAuthRoute;
