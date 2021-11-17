import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import CheckboxInput from '../../../../shared/CheckboxInput';
import Header from '../../../../shared/Header';

import { rules } from '../../../../config/validation/userRegister';
import UserApi from '../../../../api/Auth/UserApi';
import Loading from '../../../../shared/Loading';

const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    data,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({ mode: 'onChange' });
  const [status, setStatus] = useState('default');
  const [errorMessage, setErrorMessage] = useState([]);

  const handleRegister = (data) => {
    setStatus('submitting');
    UserApi.register(data)
      .then(response => {
        const { status } = response;
        if ( status === 200) {
          setErrorMessage([]);
          setStatus('success');
        }
      })
      .catch(error => {
        const errors = error.response.data;
        const messages = Object.entries(errors).filter(([key]) => ['email', 'password'].includes(key));
        setErrorMessage(messages);
        setStatus('default');
      });
  };

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <Header hasBack={false} title="" />
      { status === 'success' && (
        <div className="px-px-16 mt-px-40 font-bold text-14 text-center text-primary-300">
          入力したメールアドレスにメールを送信しました。メールのURLから会員登録を行ってください。
        </div>
      )}
      { status === 'submitting' && (
        <div className="flex items-center h-screen">
          <Loading
            className="relative"
            iconClass="bg-primary-500 text-primary-500"
            height="h-7"
          />
        </div>
      )}
      <div className={`grid place-items-center my-auto ${status !== 'default' && 'hidden'}`}>
        <div
          className="w-11/12 pt-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                        p-2 pt-10 pb-4 sm:px-2 sm:pt-6
                        bg-basic-400 shadow-md lg:shadow-lg"
        >
          <div className="flex justify-center font-bold text-primary-500 text-20">
            新規登録
          </div>
          {errorMessage.length > 0 && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 relative"
              role="alert"
            >
              {errorMessage.map(([key, value]) => <p>{value}</p>)}
            </div>
          )}
          <form
            className="mt-px-16"
            method="POST"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="mb-px-16 mx-px-8">
              <label
                htmlFor="email"
                className="block text-14 text-primary-500 font-bold mb-px-8"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="block w-full py-3 px-1 bg-primary-50 overflow-y-hidden focus:outline-none rounded-none"
                ref={register(rules.email)}
              />
              <p className="text-red-500 mt-px-2">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="mb-px-16 mx-px-8">
              <label
                htmlFor="email"
                className="block text-14 text-primary-500 font-bold mb-px-8"
              >
                パスワード
                <span className="text-12 text-primary-200 font-normal ml-px-8">
                  6文字以上、最大文字数は32文字
                </span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                minlength="6"
                maxlength="32"
                className="block w-full py-3 px-1 bg-primary-50 overflow-y-hidden focus:outline-none rounded-none"
                ref={register(rules.password)}
              />
              <p className="text-red-500 mt-px-2 text-left">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="mb-px-16 flex items-center justify-center text-14">
              <CheckboxInput 
                name="terms" 
                register={register} 
                rules={rules}
              />
              <Link to="#" className="ml-px-16 text-primary-500 underline">
                利用規約
              </Link>
              に同意します
            </div>
            <p className="mb-px-16 text-center text-red-500 mt-px-2 text-left">
              {errors.terms && errors.terms.message}
            </p>
            <button
              disabled={!isDirty || !isValid || isSubmitting}
              type="submit"
              className={`w-full py-3 bg-primary-500 font-medium text-white uppercase
              focus:outline-none hover:shadow-none font-bold rounded shadow-btn ${(!isDirty || !isValid || isSubmitting) && 'opacity-30'}`}
            >
              登録
            </button>
          </form>
        </div>

        <Link to="/">
          <p className="w-full mt-px-16 text-center text-11 text-primary-500 underline">
            アカウントをお持ちの方はこちら
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
