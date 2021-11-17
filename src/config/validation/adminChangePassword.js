export const errorMessages = {
  required: {
    confirmation: 'パスワードの確認は必須項目です。',
    password: '新しいパスワードは必須項目です。',
    oldPassword: '現在のパスワードは必須項目です。',
  },
  invalid: {
    password: 'パスワードは大文字、記号、数字を含める必要があります',
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

export const rules = {
  oldPassword: {
    required: errorMessages.required.oldPassword,
  },
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
    /**
     * (?!.* ) - does not contain " "
     * (?=.*\d) - contains at least 1 digit
     * (?=.*[a-z]) - contains at least 1 small letter
     * (?=.*[A-Z])(?=.*[a-z]) - contains at least 1 capital letter
     * (?=.*[!@#$%^&*+=?.,]) - contains at least 1 symbol
    */
    pattern: {
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
    /**
     * (?!.* ) - does not contain " "
     * (?=.*\d) - contains at least 1 digit
     * (?=.*[a-z]) - contains at least 1 small letter
     * (?=.*[A-Z])(?=.*[a-z]) - contains at least 1 capital letter
     * (?=.*[!@#$%^&*+=?.,]) - contains at least 1 symbol
    */
    pattern: {
      value: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=?.,])/,
      message: errorMessages.invalid.password,
    },
  },
};
