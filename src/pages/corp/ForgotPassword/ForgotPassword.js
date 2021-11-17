import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import Header from '../../../shared/Header/Header';

import CorpPasswordApi from '../../../api/CorpPasswordApi';
import { rules, styleConfig } from './forgotPasswordConfig';

import style from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState('default');

  const handleSubmitForm = ({ email }) => {
    setErrorMessage(null);
    setStatus('saving');

    CorpPasswordApi.sendEmailVerification(email)
      .then(() => {
        setStatus('success');
        setTimeout(() => history.push('/corp/login'), 2000);
      })
      .catch((error) => {
        if (error.response.status === 422)
          setErrorMessage(error.response.data.errors.email[0]);
        setStatus('default');
      });
  };

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <Header hasBack={false} title="" />
      <div className="grid place-items-center my-auto mx-px-60">
        <div className={styleConfig.container}>
          <h2 className="text-center mt-px-3 font-semibold text-16 text-primary-500">
            メールアドレスを入力してください
          </h2>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <form className="mt-8" method="POST" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="px-px-8">
              <div className={style.emailField}>
                <label
                  htmlFor="email"
                  className="block text-14 mb-2 font-bold text-primary-500 uppercase"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  className={styleConfig.input}
                  ref={register(rules.email)}
                  disabled={status === 'saving'}
                />
                <p className="text-red-500 text-left">
                  {errors.email && errors.email.message}
                </p>

                {status === 'success' && (
                  <p className="text-secondary-400 pt-px-5 text-center">
                    入力したメールアドレスにメールを送信しました。そちらからパスワードをリセットしてください。
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={styleConfig.submitButton}
              disabled={['saving', 'success'].includes(status)}
            >
              決定
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
