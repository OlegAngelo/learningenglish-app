import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

import AdminAuthApi from '../../../services/AdminAuthApi';

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
        message: '有効なメールアドレスを入力してください。'
      }
    },
    password: {
      required: 'パスワードは必須項目です。',
      minLength: {
        value: 8,
        message: ' パスワードは８文字以上で入力してください。'
      },
      maxLength: {
        value: 24,
        message: 'パスワードは２４文字以内で入力してください。'
      }
    }
  }

const handleLogin = ({ email, password }) => {
    AdminAuthApi.authenticate(email, password, () => {
      if (!AdminAuthApi.isAuthenticated()) {
        setErrorMessage('Whoops! Incorrect email or password');
      }
    });
  }

  const forgotPasswordText = 'パスワードを忘れてしまったときはこちら';
  
  useEffect(() => {
    if (location.state !== undefined) {
      setSuccessMessage(location.state.message);
    }
    setTimeout(() => setSuccessMessage(null), 5000);
  },[location]);

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <div className="grid place-items-center my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                        px-6 pt-10 pb-3 sm:px-10 sm:pt-6
                        bg-basic-400 rounded-lg shadow-md lg:shadow-lg"
        >
          <div className="service-logo">
            <h1 className="text-center uppercase">Admin</h1>
          </div>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 relative" role="alert">
              <span className="block sm:inline">{errorMessage && 'IDまたはパスワードが一致しません。'}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4 relative" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <form className="mt-10" method="POST" onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">ログインID（メールアドレス）</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="ログインID（メールアドレス）"
              className="block w-full py-3 px-1
                        text-gray-800 appearance-none
                        border-b-2 border-gray-100 overflow-y-hidden
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
              ref={register(rules.email)} />
            <p className="text-red-500 mt-px-2">{errors.email && errors.email.message}</p>
            <label htmlFor="password" className="block mt-8 text-xs font-semibold text-gray-600 uppercase">パスワード</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="パスワード"
              className="block w-full py-3 px-1 mt-2
                        text-gray-800 appearance-none
                        border-b-2 border-gray-100 overflow-y-hidden
                        focus:text-gray-500 focus:outline-none focus:border-gray-200"
              ref={register(rules.password)}
            />
            <p className="text-red-500 mt-px-2 text-left">{errors.password && errors.password.message}</p>
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-primary-500 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:shadow-none"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
