import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import { rules } from '../../../config/validation/adminChangePassword';
import Header from '../../../shared/Header/Header';
import AdminAuthApi from '../../../services/AdminAuthApi';
import PasswordApi from '../../../api/PasswordApi'
import serverErrorHelper from '../../../utils/serverErrorHelper';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  const { email, token } = queryString.parse(useLocation().search);
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const handleLogin = (payload) => {
    setErrorMessage(null);
    setIsSubmittingPassword(true);

    PasswordApi.adminResetPassword({
      token,
      email,
      ...payload,
    })
    .then(() => {
      login({
        email,
        password: payload.password
      });
    })
    .catch(({ response }) => {
      const errorMessage = serverErrorHelper.getErrorMsg(response);

      setErrorMessage(errorMessage);
      setIsSubmittingPassword(false);
    });
  };

  const login = ({ email, password }) => {
    AdminAuthApi.authenticate(email, password, () => {
      if (!AdminAuthApi.isAuthenticated()) {
        setErrorMessage('Whoops! Incorrect email or password');
      }
    });
  }

  const getJpTranslated = (text) => {
    switch (text) {
      case '現在のパスワードと異なるものを入力してください。':
      case 'New password must not be similar to old password':
        return '現在のものと異なるパスワードを入力してください。';
      case 'The password confirmation does not match.':
        return 'パスワードの確認が新しいパスワードと一致しません。';
      case 'The email must be a valid email address.':
        return 'メールは有効なメールアドレスである必要があります。';
      case 'The email field is required.':
        return 'メールフィールドは必須です';
      case 'The token is invalid.':
        return 'トークンが有効ではありません。';
      case 'The token is expired.':
        return 'トークンが期限切れです。';
      default:
        return text;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <Header
        hasBack={false}
        title=""
      />
      <div className="grid place-items-center my-auto">
        <div className={`p-12 w-5/12 px-px-9 pt-11 pb-4 sm:px-10 sm:py-6 bg-basic-400 rounded-0 shadow-md lg:shadow-lg`}>
          <h2 className="text-center mt-px-3 font-semibold text-16 text-primary-500">
            新しいパスワードを設定してください
          </h2>
          {
            errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded relative" role="alert">
              <span className="block sm:inline">{getJpTranslated(errorMessage)}</span>
            </div>
          }
          <form className="mt-8" method="POST" onSubmit={handleSubmit(handleLogin)}>
            <div className ="px-px-8">
              <div className={styles.password}>
                <label htmlFor="oldPassword" className="block text-14 mb-2 font-bold text-primary-500 uppercase">現在のパスワード</label>
                <input
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  className="block w-full py-3 px-1 bg-primary-50
                            text-gray-800 appearance-none
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  ref={register(rules.oldPassword)}
                  disabled={isSubmittingPassword}
                />
                <p className="text-red-500 mt-px-2 text-left">{errors.oldPassword && errors.oldPassword.message}</p>
              </div>
              <div className={styles.password}>
                <label htmlFor="password" className="block text-14 mb-2 font-bold text-primary-500 uppercase">新しいパスワード</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="block w-full py-3 px-1 bg-primary-50
                            text-gray-800 appearance-none
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  ref={register(rules.password)}
                  disabled={isSubmittingPassword}
                />
                <p className="text-red-500 mt-px-2 text-left">{errors.password && errors.password.message}</p>
              </div>
              <div className={styles.confirmation}>
                <label htmlFor="confirmation" className="block text-14 mb-2 font-bold text-primary-500 uppercase">パスワード確認</label>
                <input
                  id="confirmation"
                  type="password"
                  name="confirmation"
                  className="block w-full py-3 px-1 bg-primary-50
                            text-gray-800 appearance-none
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  ref={register(rules.confirmation)}
                  disabled={isSubmittingPassword}
                />
                <p className="text-red-500 mt-px-2 text-left">{errors.confirmation && errors.confirmation.message}</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-px-18 bg-primary-500 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:shadow-none disabled:bg-primary-100"
              disabled={isSubmittingPassword}
            >
              決定
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
