import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import ConditionalWrapper from '../../shared/ConditionalWrapper';
import Sidebar from '../../shared/Sidebar';
import Alert from '../../shared/Alert';

import AdminAuthApi from '../../services/AdminAuthApi';
import newsApi from '../../api/NewsApi';
import { fetchAuthAdmin } from '../../redux/authAdmin/slice';
import useCheckNetwork from '../../hooks/useCheckNetwork';

const AdminRoutes = ({ component: Component, hasForm = false, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const routesRegex = [
    /^\/admin\/news\/\d+\/preview$/,
    /^\/admin\/news\/details\/\d+\/preview$/,
    /^\/admin\/lectures\/exercise-preview$/,
    /^\/admin\/training\/muscle-exam\/\d+$/,
    /^\/admin\/training\/muscle-exam\/\d+\/end$/,
    /^\/admin\/lectures\/\d+\/video\/\d+\/preview$/,
    /^\/admin\/lectures\/\d+\/video\/\d+\/preview\/raw$/,
    /^\/admin\/training\/lecture-exam\/end$/,
  ];
  const currentUrl = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
  const urlArray = location.pathname.split('/');
  const [isLoading, setIsLoading] = useState(true);

  const goToNotFound = (redirect) => {
    history.push({
      pathname: '/404',
      state: redirect,
    });
  };

  const isOnline = useCheckNetwork();

  useEffect(() => {
    if (currentUrl === '/admin/news/details') {
      setIsLoading(true);
      const param = urlArray[urlArray.length - 1];
      newsApi
        .verifyNewsIfExist(param, 'admin')
        .then(() => setIsLoading(false))
        .catch(() => {
          goToNotFound({
            route: '/admin/news',
            text: 'Go back to News List Page',
          });
        });
    } else {
      setIsLoading(false);
    }

    dispatch(fetchAuthAdmin());
    document.body.setAttribute('style', `background-color: #F3F4F6`);
  }, []);
  
  if (isLoading) return <div className="bg-basic-400 h-full text-transparent">vvv</div>;

  return (
    <ConditionalWrapper
      condition={hasForm}
      wrapper={(children) => <div className="absolute w-full bg-adminGray-100">{children}</div>}
    >
      <Alert
        show={!isOnline}
        zIndex={30}
        msg={'エラーが発生しました。後ほど再度お試しください'}
        callBack={() => window.location.reload()}
      />
      <div className={Component.name == 'Login' || 'flex h-full'} style={{ flex: '1 0' }}>
        {/* Sidebar */}
        {!routesRegex.some((regex) => regex.test(location.pathname)) && <Sidebar />}

        {/* Content */}
        <Route
          {...rest}
          render={(props) => {
            if (AdminAuthApi.isAuthenticated()) {
              return <Component {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: '/admin/login',
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }
          }}
        />
      </div>
    </ConditionalWrapper>
  );
}

export default AdminRoutes;
