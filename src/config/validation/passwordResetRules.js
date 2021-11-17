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
