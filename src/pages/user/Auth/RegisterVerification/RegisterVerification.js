import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import Header from '../../../../shared/Header';
import Loading from '../../../../shared/Loading';
import Button from '../../../../shared/Button';
import Alert from '../../../../shared/Alert';

import UserApi from '../../../../api/Auth/UserApi';

const RegisterVerification = () => {
  const history = useHistory();
  const [status, setStatus] = useState({ type: 'loading' });
  const [showAlert, setShowAlert] = useState(false);
  const { email, token } = queryString.parse(useLocation().search);

  useEffect(() => {
    UserApi.verifyAccount({ email, token })
      .then((res) => {
        if (res.status === 200) {
          setStatus({
            type: 'success',
            message: 'アカウントは認証されました。',
          });
        }
      })
      .catch((error) => {
        const { status:failType, message } = error.response.data;
        setStatus({
          type: 'fail',
          failType,
          message,
        });
      });
  }, []);

  const sendVerificationLink = () => {
    UserApi.sendVerificationLink({ email }).then((res) => {
      if (res.status === 200) {
        setShowAlert(true);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <Alert
        show={showAlert}
        callBack={() => setShowAlert(false)}
        msg='Verification Email Sent'
      />
      <Header hasBack={false} title="" />
      <div className="px-px-16 mt-px-40 font-bold text-14 text-center">
        {status.type === 'loading' ? (
          <Loading
            className="relative"
            iconClass="bg-primary-500 text-primary-500"
            height="h-7"
          />
        ) : (
          <div>
            <div className={`${status.type === 'success' ? 'text-primary-300' : 'text-exam-error'} mb-px-40`}>
              {status.message}
            </div>
            {status.type === 'success' && (
              <Button
                type="darkblue-square"
                innerClass="w-full"
                onClick={() => history.push('/')}
              >
                ログインページへ
              </Button>
            )}
            
            {status.failType === 'expired' && (
              <Button
                type="darkblue-square"
                innerClass="w-full"
                onClick={sendVerificationLink}
              >
                Send Verification Link Again
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterVerification;
