export const styleConfig = {
  container: `w-full p-12 px-px-9 pt-11 pb-4 sm:px-10 sm:py-6 bg-basic-400 rounded-0 shadow-md lg:shadow-lg`,
  input: `block w-full p-3 bg-primary-50 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200`,
  submitButton: `w-full py-px-18 bg-primary-500 rounded-sm font-medium text-white uppercase focus:outline-none hover:shadow-none disabled:bg-primary-100 rounded-px-4 font-bold`,
};

export const getJpTranslated = (text) => {
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

export const rules = (field, compareTo) => {
  const rules = {
    password: {
      required: '新しいパスワードは必須項目です。',
      minLength: {
        value: 8,
        message: 'パスワードは８文字以上で入力してください。',
      },
      maxLength: {
        value: 24,
        message: 'パスワードは２４文字以内で入力してください。',
      },
      pattern: {
        value: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=?.,_])/,
        message: 'パスワードは大文字、記号、数字を含める必要があります',
      },
    },
    password_confirmation: {
      required: 'パスワードの確認は必須項目です。',
      minLength: {
        value: 8,
        message: 'パスワードの確認は８文字以上で入力してください。',
      },
      maxLength: {
        value: 24,
        message: 'パスワードの確認は２４文字以内で入力してください。',
      },
      validate: (value) =>
        compareTo === value || 'パスワードの確認が新しいパスワードと一致しません。',
    },
  };

  return rules[field];
};
