import React from 'react';
import { Route } from 'react-router-dom';

import ConditionalWrapper from '../../shared/ConditionalWrapper';
import CorporateSidebar from '../../shared/CorporateSidebar';
import Alert from '../../shared/Alert';

import useCheckNetwork from '../../hooks/useCheckNetwork';

const CorpRoute = ({ component: Component, hasForm = false, ...rest }) => {
  const isOnline = useCheckNetwork();

  return (
    <ConditionalWrapper
      condition={hasForm}
      wrapper={(children) => (
        <div className="absolute w-full bg-adminGray-100">{children}</div>
      )}
    >
      <Alert
        show={!isOnline}
        zIndex={30}
        msg={'エラーが発生しました。後ほど再度お試しください'}
        callBack={() => window.location.reload()}
      />
      <div
        className={Component.name == 'Login' || 'flex h-full'}
        style={{ flex: '1 0' }}
      >
        {/* Sidebar */}
        <CorporateSidebar />

        {/* Content */}
        <Route {...rest} render={(props) => <Component {...props} />} />
      </div>
    </ConditionalWrapper>
  );
};

export default CorpRoute;
