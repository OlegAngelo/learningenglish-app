import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import AuthApi from '../../../services/AuthApi';

const Login = () => {
  const location = useLocation();
  const { register, handleSubmit, errors, data } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  localStorage.clear();

  const rules = {
    email: {
      required: 'メールアドレスは必須項目です。',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: '有効なメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードは必須項目です。',
      minLength: {
        value: 6,
        message: ' パスワードは6文字以上で入力してください。',
      },
      maxLength: {
        value: 32,
        message: 'パスワードは32文字以内で入力してください。',
      },
    },
  };

  const handleLogin = ({ email, password }) => {
    AuthApi.authenticate(email, password, () => {
      if (!AuthApi.isAuthenticated()) {
        setErrorMessage('Whoops! Incorrect email or password');
      }
    });
  };

  const forgotPasswordText = 'パスワードを忘れてしまったときはこちら';

  useEffect(() => {
    if (location.state !== undefined) {
      setSuccessMessage(location.state.message);
    }
    setTimeout(() => setSuccessMessage(null), 5000);
  }, [location]);

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <div className="grid place-items-center my-auto">
        <div className="service-logo mb-5">
          <img
            width="128px"
            height="124.27px"
            alt="service-logo"
            className="service-logo m-auto rounded"
            src="/images/service-logo.png"
          />
        </div>
        <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                      p-2 py-4 sm:px-2 sm:pt-6 bg-basic-400 shadow-md lg:shadow-lg"
        >
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 relative"
              role="alert"
            >
              <span className="block sm:inline">
                {errorMessage && 'IDとパスワードが一致しません。'}
              </span>
            </div>
          )}
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-px-10 relative"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <form 
            method="POST" 
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="mx-px-8">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600 uppercase mb-2"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="block w-full py-3 px-1 bg-primary-50 overflow-y-hidden focus:text-gray-500 focus:outline-none rounded-none"
                ref={register(rules.email)}
              />
              <p className="text-red-500 mt-px-2">
                {errors.email && errors.email.message}
              </p>
            </div>

            <div className="mx-px-8">
              <label
                htmlFor="password"
                className="block mt-5 text-sm font-semibold text-gray-600 uppercase mb-2"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="block w-full py-3 px-1 bg-primary-50 overflow-y-hidden focus:text-gray-500 focus:outline-none rounded-none"
                ref={register(rules.password)}
              />
              <p className="text-red-500 mt-px-2 text-left">
                {errors.password && errors.password.message}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-primary-500 font-medium text-white uppercase
                        focus:outline-none hover:shadow-none font-bold rounded shadow-btn"
            >
              ログイン
            </button>
          </form>
        </div>

        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                    px-5 py-5 sm:px-10 sm:pt-6 space-y-10 w-full px-6 text-center"
        >
          <Link to="/input-email">
            <p className="w-full text-center text-xs text-primary-500 underline">
              {forgotPasswordText}
            </p>
          </Link>

          <Link to="/register">
            <button
              type="register"
              className="w-full py-3 bg-white border border-primary-500 shadow-btn
                        border-rounded rounded font-bold text-primary-500
                        uppercase mt-10 focus:outline-none hover:shadow-none"
            >
              新規登録
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
