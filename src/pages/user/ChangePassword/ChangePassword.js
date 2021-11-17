import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import { rules } from '../../../config/validation/userChangePassword';
import Header from '../../../shared/Header/Header';
import PasswordApi from '../../../api/PasswordApi'
import serverErrorHelper from '../../../utils/serverErrorHelper';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  const { email, token } = queryString.parse(useLocation().search);
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const history = useHistory();

  const handleLogin = (payload) => {
    if (token) resetPassword(payload);
    else updatePassword(payload);
  };

  const resetPassword = (payload) => {
    setErrorMessage(null);
    setIsSubmittingPassword(true);

    PasswordApi.resetPassword({
      token,
      email,
      ...payload,
    })
    .then(() => {
      history.push({
        pathname: '/login',
        state: { message: 'パスワードが変更されました。' }
      });
    })
    .catch(({ response }) => {
      const errorMessage = serverErrorHelper.getErrorMsg(response);

      setErrorMessage(errorMessage);
      setIsSubmittingPassword(false);
    });
  };

  const updatePassword = async ({ password, confirmation }) => {
    setErrorMessage(null);
    setIsSubmittingPassword(true);

    await PasswordApi.updatePassword(password, confirmation)
      .then(response => {
        if (response.data[0]?.success_message) {
          setErrorMessage(null);
          window.location = '/motivation';
        } else {
          setErrorMessage(response.data[0].error_message);
        }
      })
      .catch(({ response }) => {
        const errorMessage = serverErrorHelper.getErrorMsg(response);

        setErrorMessage(errorMessage);
      });

    setIsSubmittingPassword(false);
  };

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
        <div className={`${styles.loginForm} p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                        px-px-9 pt-11 pb-4 sm:px-10 sm:py-6
                        bg-basic-400 rounded-0 shadow-md lg:shadow-lg`}
        >
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
              <div className={styles.newPassword}>
                <label htmlFor="password" className="block text-14 mb-2 font-bold text-primary-500 uppercase">新しいパスワードを入力</label>
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
              <div  className={styles.confirmation}>
                <label htmlFor="confirmation" className="block text-14 mb-2 font-bold text-primary-500 uppercase">確認</label>
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
