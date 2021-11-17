export const rules = {
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
