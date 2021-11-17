import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Header from '../../../../shared/Header';
import PasswordApi from '../../../../api/PasswordApi';
import styles from './SendPasswordResetEmail.module.css';
import { textJa, rules } from '../../../../config/validation/passwordResetRules'

const SendPasswordResetEmail = () => {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const history = useHistory();

  const handleSendEmail = ({ email }) => {
    setErrorMessage(null);
    setIsSubmittingEmail(true);

    PasswordApi.sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage('入力したメールアドレスにメールを送信しました。そちらからパスワードをリセットしてください。');
        setTimeout(() => history.push('/'), 5000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setIsSubmittingEmail(false);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-basic-500">
      <Header
        forcedUrl={'/login'}
        hasBack={true}
        title={textJa.general.reset_your_password}
      />

      <div className="grid place-items-center my-auto">
        <div
          className={`
            ${styles.passwordResetForm} p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
            px-px-9 pt-11 pb-4 sm:px-10 sm:py-6
            bg-basic-400 rounded-0 shadow-md lg:shadow-lg
          `}
        >
          <h2 className="text-center mt-px-3 font-semibold text-16 text-primary-500">
            {textJa.general.please_input_your_email_address}
          </h2>
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <form
            className="mt-8"
            method="POST"
            onSubmit={handleSubmit(handleSendEmail)}
          >
            <div className="px-px-8">
              <label
                htmlFor="email"
                className="block text-14 mb-2 font-bold text-primary-500 uppercase"
              >
                {textJa.general.email_address}
              </label>

              <input
                id="email"
                type="text"
                name="email"
                className="
                  block w-full py-3 px-1 bg-primary-50
                  appearance-none text-gray-800
                  focus:outline-none focus:text-gray-500
                "
                ref={register(rules.email)}
                disabled={isSubmittingEmail}
              />

              <p className="text-red-500 text-left">
                {errors.email && errors.email.message}
              </p>

              {successMessage && (
                <p className="text-secondary-400 pt-px-5 text-center">
                  {successMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`
                ${styles.topSpaceSubmitButton}
                w-full py-px-18 bg-primary-500 rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:shadow-none disabled:bg-primary-100
              `}
              disabled={isSubmittingEmail}
            >
              {textJa.general.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendPasswordResetEmail;
