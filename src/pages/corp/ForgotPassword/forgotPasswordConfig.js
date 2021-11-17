export const styleConfig = {
  container: `w-full p-12 px-px-9 pt-11 pb-4 sm:px-10 sm:py-6 bg-basic-400 rounded-0 shadow-md lg:shadow-lg`,
  input: `block w-full p-3 bg-primary-50 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200`,
  submitButton: `w-full py-px-18 bg-primary-500 rounded-sm font-medium text-white uppercase focus:outline-none hover:shadow-none disabled:bg-primary-100 rounded-px-4 font-bold`,
};

export const textJa = {
  general: {
    submit: '決定',
    email_address: 'メールアドレス',
    reset_your_password: 'パスワードの再設定',
    please_input_your_email_address: 'メールアドレスを入力してください',
  },
  errorMessage: {
    email_address_is_required: 'メールアドレスは必須項目です。',
    email_address_is_invalid: '有効なメールアドレスを入力してください。',
  },
};

export const rules = {
  email: {
    required: textJa.errorMessage.email_address_is_required,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: textJa.errorMessage.email_address_is_invalid,
    },
  },
};
