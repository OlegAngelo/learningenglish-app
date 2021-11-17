export const messages = {
  password: {
    required: 'パスワードは必須項目です。',
    min: ' パスワードは6文字以上で入力してください。',
    max: 'パスワードは32文字以内で入力してください。',
    invalid: 'パスワードは大文字、記号、数字を含める必要があります',
  },
  email: {
    required: 'メールアドレスは必須項目です。',
    invalid: '有効なメールアドレスを入力してください。',
  },
  terms: {
    required: '利用規約にチェックを入れてください。',
  }
};

export const rules = {
  email: {
    required: messages.email.required,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: messages.email.invalid,
    },
  },
  password: {
    required: messages.password.required,
    minLength: {
      value: 6,
      message: messages.password.min,
    },
    maxLength: {
      value: 32,
      message: messages.password.max,
    },
    pattern: {
      value: /^\S*$/, // Only non-white-space characters are allowed
      message: messages.password.invalid,
    },
  },
  terms: {
    required: messages.terms.required,
  }
};
