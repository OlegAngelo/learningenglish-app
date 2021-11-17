export const translateToJapaneseFromExcel = (params) => {
  const {
    rule = '',
    ruleParam = '',
    column = '',
    row = '',
    sheet = '',
    customMessages = {},
    defaultMessage = '内部サーバーエラー  (Internal Server Error)',
  } = params;

  const prepend = sheet ? `${sheet}シート` : '';

  switch (rule) {
    case 'required':
      return `${prepend}${row}行目の${column}は必須項目です。`;
    case 'max':
      return `${prepend}${row}行目の${column}は最大${ruleParam}文字まで入力できます。`;
    case 'unique':
      return `${prepend}${row}行目の${column}は既に使用されています。`;
    case 'filetype':
      return `${prepend}${row}行目の${column}のファイル形式が無効です。`;
    case 'distinct':
      return `${prepend}${row}行目の${column}が重複しています。`;
    case 'regex':
      return `${prepend}${row}行目の${column}の形式が無効です。`;
    case 'exists-db-excel':
      return `${prepend}${row}行目の${column}は既に使用されています。`;
    case 'numeric':
      return `${prepend}${row}行目の${column}は半角数字である必要があります。`;
    case 'sheet-required':
      return `${sheet}ートシートが空です。`;
    case 'sheet-max':
      return `エクセルファイルは${ruleParam}つのシートだけにする必要があります。`;
    default:
      return customMessages?.[rule] ?? defaultMessage;
  }
};
