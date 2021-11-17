import _ from 'lodash';

import { translateToJapaneseFromExcel } from '../../../../../../../utils/validationMessage';

export const getJPTranslatedForAlert = (responseCode) => {
  const messages = {
    201: 'Listeningの問題をアップロードしました',
    500: '内部サーバーエラー',
  };

  return {
    response_code: responseCode,
    is_success: responseCode === 201,
    message: messages?.[responseCode] ?? messages[500],
  };
};

export const getJPTranslatedMessages = (messages) => {
  const isFileError = messages.hasOwnProperty('file');
  let translatedMessages = [];

  // check for file error message
  if (isFileError) {
    return 'エクセルファイル(.xlsx)を読み込んでください。';
  }

  // check for excel data error messages
  Object.keys(messages).map(function (key, index) {
    const row = key.split('.')[0];

    let column = key.split('(').pop().split(')');
    column = column?.length ? _.startCase(_.toLower(column[0])) : null;

    let rule = messages[key][0].split('[').pop().split(']');
    rule = rule?.length ? _.toLower(rule[0]) : null;

    let ruleParam = messages[key][0].match(/\d+/);
    ruleParam = ruleParam?.length ? ruleParam[0] : '';

    const translateProps = /^\d+$/.test(key)
      ? {
          rule,
          ruleParam,
        }
      : {
          rule,
          ruleParam,
          column,
          row,
        };

    translatedMessages[index] = translateToJapaneseFromExcel(translateProps);
  });

  return translatedMessages;
};
