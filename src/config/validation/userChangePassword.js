export const errorMessages = {
  required: {
    confirmation: 'パスワードの確認は必須項目です。',
    password: '新しいパスワードは必須項目です。',
  },
  invalid: {
    confirmation: '有効なパスワードの確認を入力してください。',
    password: '有効なパスワードを入力してください。',
  },
  min_6_chars: {
    confirmation: 'パスワードの確認は6文字以上で入力してください。',
    password: 'パスワードは6文字以上で入力してください。',
  },
  max_32_chars: {
    confirmation: 'パスワードの確認は32文字以内で入力してください。',
    password: 'パスワードは32文字以内で入力してください。',
  },
};

export const rules = {
  password: {
    required: errorMessages.required.password,
    minLength: {
      value: 6,
      message: errorMessages.min_6_chars.password,
    },
    maxLength: {
      value: 32,
      message: errorMessages.max_32_chars.password,
    },
    pattern: {
      value: /^\S*$/, // Only non-white-space characters are allowed
      message: errorMessages.invalid.password,
    },
  },
  confirmation: {
    required: errorMessages.required.confirmation,
    minLength: {
      value: 6,
      message: errorMessages.min_6_chars.confirmation,
    },
    maxLength: {
      value: 32,
      message: errorMessages.max_32_chars.confirmation,
    },
    pattern: {
      value: /^\S*$/, // Only non-white-space characters are allowed
      message: errorMessages.invalid.confirmation,
    },
  },
};
