import React, { useEffect, Fragment } from 'react';

import AuthApi from '../../../services/AuthApi';

const Logout = () => {
  const userLogout = () => {
    AuthApi.logout();
  }

  useEffect(() => {
    userLogout();
  }, []);

  return (
    <Fragment>
    </Fragment>
  );
}

export default Logout;
