import React, { Fragment, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import Breadcrumb from '../../../shared/Breadcrumb';
import Card from '../../../shared/Card';
import ArrowBackIcon from '../../../shared/icons/ArrowBackIcon';

import AdminRegisterApi from '../../../api/AdminRegisterApi';

import serverErrorHelper from '../../../utils/serverErrorHelper';

const AdministratorRegistration = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  
  const errorMessages = {
    required: {
      confirmation: 'パスワードの確認は必須項目です。',
      password: '新しいパスワードは必須項目です。',
      name: '名前は必須項目です。 ',
      email: 'メールは必須アイテムです。 ',
    },
    invalid: {
      password: 'パスワードは大文字、記号、数字を含める必要があります',
      confirmation: 'パスワードは大文字、記号、数字を含める必要があります',
      name: '有効な名前を使用してください。 ',
      email: '有効なメールアドレスを使用してください。 ',
    },
    min_8_chars: {
      confirmation: 'パスワードの確認は８文字以上で入力してください。',
      password: 'パスワードは８文字以上で入力してください。',
    },
    max_24_chars: {
      confirmation: 'パスワードの確認は２４文字以内で入力してください。',
      password: 'パスワードは２４文字以内で入力してください。',
    },
  };

  const rules = {
    password: {
      required: errorMessages.required.password,
      minLength: {
        value: 8,
        message: errorMessages.min_8_chars.password,
      },
      maxLength: {
        value: 24,
        message: errorMessages.max_24_chars.password,
      },
      pattern: {
        /**
         * (?!.* ) - does not contain " "
         * (?=.*\d) - contains at least 1 digit
         * (?=.*[a-z]) - contains at least 1 small letter
         * (?=.*[A-Z])(?=.*[a-z]) - contains at least 1 capital letter
         * (?=.*[!@#$%^&*+=?.,]) - contains at least 1 symbol
        */
        value: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=?.,])/,
        message: errorMessages.invalid.password,
      },
    },

    confirmation: {
      required: errorMessages.required.confirmation,
      minLength: {
        value: 8,
        message: errorMessages.min_8_chars.confirmation,
      },
      maxLength: {
        value: 24,
        message: errorMessages.max_24_chars.confirmation,
      },
      pattern: {
        /**
         * (?!.* ) - does not contain " "
         * (?=.*\d) - contains at least 1 digit
         * (?=.*[a-z]) - contains at least 1 small letter
         * (?=.*[A-Z])(?=.*[a-z]) - contains at least 1 capital letter
         * (?=.*[!@#$%^&*+=?.,]) - contains at least 1 symbol
        */
        value: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=?.,])/,
        message: errorMessages.invalid.confirmation,
      },
    },

    name: {
      required: errorMessages.required.name,
      pattern: {
        value: /^[a-zA-Z0-9一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤]{1,}(?: [a-zA-Z0-9一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤]+){0,2}$/,
        message: errorMessages.invalid.name,
      },
    },

    email: {
      required: errorMessages.required.email,
      pattern: {
        value: /^\S*$/, // Only non-white-space characters are allowed
        message: errorMessages.invalid.email,
      },
    },
  };

  const getJpTranslated = (text) => {
    switch (text) {
      case '現在のパスワードと異なるものを入力してください。':
      case 'The password confirmation does not match.':
        return 'パスワードの確認が新しいパスワードと一致しません。';
      case 'The email must be a valid email address.':
        return 'メールは有効なメールアドレスである必要があります。';
      case 'The email field is required.':
        return 'メールフィールドは必須です';
      case 'The email has already been taken.':
        return 'メールアドレスは既に使用されています。';
      default:
        return text;
    }
  };

  const handleAddAdmin = (data) =>{
    AdminRegisterApi.registerAdmin(data,()=>{
    }).then(() => {
      window.location = '/admin/administrators'
    })
    .catch(({ response }) => {
      const errorMessage = serverErrorHelper.getErrorMsg(response);

      setErrorMessage(errorMessage);
    });
  }
  
  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full bg-adminGray-100">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="管理者" to="/admin/administrators" />
        <Breadcrumb text="新規登録" to="#3" active last />
      </div>
      <Card>
        <div className="h-px-59 flex items-center border-b-px-1 border-adminGray-200">
          <NavLink to="/admin/administrators">
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </NavLink>
          <span className="text-base-dark font-bold leading-px-20 text-20">
            管理者登録
          </span>
        </div>
        <div className="ml-px-96">
          {
            errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded relative w-px-350" role="alert">
              <span className="block sm:inline">{getJpTranslated(errorMessage)}</span>
            </div>
          }
        </div>
        <form className="mt-8" method="POST" onSubmit={handleSubmit(handleAddAdmin)}>
          <div className="ml-px-96">
            <div className="mt-px-24">
              <p htmlFor="name" className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8">名前 <i className="text-adminRed-400">*</i></p>
              <input
                id="name"
                type="text"
                name="name"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                ref={register(rules.name)}
                placeholder="佐藤 佑樹"
                autoComplete="off"
              />
              <p className="text-red-500 mt-px-2 text-left">{errors.name && errors.name.message}</p>
            </div>
            <div className="mt-px-24">
              <p htmlFor="email" className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8">メールアドレス <i className="text-adminRed-400">*</i></p>
              <input
                id="email"
                type="text"
                name="email"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                ref={register(rules.email)}
                placeholder="yuki.sato@edgeschool.com"
              />
              <p className="text-red-500 mt-px-2 text-left">{errors.email && errors.email.message}</p>
            </div>
            <div className="mt-px-24">
              <p htmlFor="password" className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8">パスワード <i className="text-adminRed-400">*</i></p>
              <input
                id="password"
                type="password"
                name="password"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                ref={register(rules.password)}
                placeholder="半角英数字8文字以上"
              />
              <p className="text-red-500 mt-px-2 text-left">{errors.password && errors.password.message}</p>
            </div>
            <div className="mt-px-24">
              <p htmlFor="confirmation" className="font-bold text-px-12 leading-px-12 text-adminGray-400 mb-px-8">パスワード（確認） <i className="text-adminRed-400">*</i></p>
              <input
                id="confirmation"
                type="password"
                name="confirmation"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                ref={register(rules.confirmation)}
                placeholder="半角英数字8文字以上"
              />
              <p key="hint" className="text-adminGray-500 text-px-12 leading-px-12 mt-px-8">
                もう一度入力してください
              </p>
              <p className="text-red-500 mt-px-2 text-left">{errors.confirmation && errors.confirmation.message}</p>
            </div>
            <div className="pt-px-60 pb-px-40">
              <input
                type="submit"
                className="flex items-center cursor-pointer justify-center focus:outline-none cursor-auto rounded bg-adminPrimary-400 text-white text-12 font-bold h-px-36 px-px-16 leading-px-20  false focus:bg-state-active"
                value="登録"
              /> 
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdministratorRegistration;
