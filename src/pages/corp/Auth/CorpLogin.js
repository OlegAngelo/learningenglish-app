import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { rules } from '../../../config/validation/corpLoginRules';

const CorpLogin = () => {
  const location = useLocation();
  const { register, handleSubmit, errors, data } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  localStorage.clear();

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
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                    px-6 pt-10 pb-3 sm:px-10 sm:pt-6
                    bg-basic-400 rounded-lg shadow-md lg:shadow-lg"
        >
          <div className="service-logo">
            <img
              width="250px"
              height="250px"
              alt="service-logo"
              className="service-logo m-auto rounded"
              src="/images/service-logo.png"
            />
            <h1 className="text-center uppercase text-primary-500 text-30 my-3 font-average">
              Corporate
            </h1>
          </div>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 relative"
              role="alert"
            >
              <span className="block sm:inline">
                {errorMessage && 'IDまたはパスワードが一致しません。'}
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
          <form method="POST">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              ログインID（メールアドレス）
            </label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="ログインID（メールアドレス）"
              className="block w-full py-3 px-1 bg-primary-50 overflow-y-hidden focus:text-gray-500 focus:outline-none rounded-none"
              ref={register(rules.email)}
            />
            <p className="text-red-500 mt-px-2">
              {errors.email && errors.email.message}
            </p>
            <label
              htmlFor="password"
              className="block mt-8 text-xs font-semibold text-gray-600 uppercase"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="パスワード"
              className="block w-full py-3 px-1 bg-primary-50 overflow-y-hidden focus:text-gray-500 focus:outline-none rounded-none"
              ref={register(rules.password)}
            />
            <p className="text-red-500 mt-px-2 text-left">
              {errors.password && errors.password.message}
            </p>
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-primary-500 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:shadow-none"
            >
              ログイン
            </button>

            <Link to="/corp/forgot/password">
              <p className="w-full mt-3 text-center text-s text-primary-500 underline">
                {forgotPasswordText}
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CorpLogin;
