import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router';
import queryString from 'query-string';

import Header from '../../../shared/Header/Header';
import FeedbackMessage from './components/FeedbackMessage';

import CorpPasswordApi from '../../../api/CorpPasswordApi';
import { styleConfig, getJpTranslated, rules } from './resetPasswordConfig';

import serverErrorHelper from '../../../utils/serverErrorHelper';

const ResetPassword = () => {
  const history = useHistory();
  const { email, token } = queryString.parse(useLocation().search);
  const { register, handleSubmit, errors, watch, trigger } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState('loading');

  const handleFormSubmit = (props) => {
    setErrorMessage(null);
    setStatus('saving');
    CorpPasswordApi.adminResetPassword({
      token,
      email,
      ...props,
    })
      .then(() => {
        setStatus('success');
        history.push({
          pathname: `/corp/login`,
          state: { message: 'パスワードは正常にリセットされました。' },
        });
      })
      .catch(({ response }) => {
        if (response?.status === 419) return (window.location = '/419');
        const errorMessage = serverErrorHelper.getErrorMsg(response);
        setErrorMessage(errorMessage);
        setStatus('failed');
      });
  };

  useEffect(() => {
    CorpPasswordApi.validateToken({ email, token })
      .then(() => setStatus('default'))
      .catch((err) => {
        if (err?.response?.status === 419) window.location = '/419';
        else window.location = '/404';
      });
  }, []);

  return (
    status !== 'loading' && (
      <div className="flex flex-col h-screen bg-basic-500">
        <Header hasBack={false} title="" />
        <div className="grid place-items-center my-auto mx-px-60">
          <div className={styleConfig.container}>
            <h2 className="text-center mt-px-3 font-semibold text-16 text-primary-500">
              新しいパスワードを設定してください
            </h2>

            <FeedbackMessage flag={status} message={getJpTranslated(errorMessage)} />
            <form
              className="mt-8"
              method="POST"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="px-px-8">
                <div className="mb-px-26">
                  <label
                    htmlFor="password"
                    className="block text-14 mb-2 font-bold text-primary-500 uppercase"
                  >
                    新しいパスワードを入力
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={styleConfig.input}
                    ref={register(rules('password'))}
                    onChange={() =>
                      ['attempted-to-save', 'failed'].includes(status) &&
                      trigger('password_confirmation')
                    }
                    disabled={status === 'saving'}
                  />
                  <p className="text-red-500 mt-px-2 text-left">
                    {errors.password && errors.password.message}
                  </p>
                </div>
                <div className="mb-px-42">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-14 mb-2 font-bold text-primary-500 uppercase"
                  >
                    確認
                  </label>
                  <input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    className={styleConfig.input}
                    ref={register(rules('password_confirmation', watch('password')))}
                    disabled={status === 'saving'}
                  />
                  <p className="text-red-500 mt-px-2 text-left">
                    {errors.password_confirmation && errors.password_confirmation.message}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className={styleConfig.submitButton}
                onClick={() => setStatus('attempted-to-save')}
                disabled={status === 'success'}
              >
                決定
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ResetPassword;
