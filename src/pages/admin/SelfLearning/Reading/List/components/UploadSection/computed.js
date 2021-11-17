import _ from 'lodash';

import { translateToJapaneseFromExcel } from '../../../../../../../utils/validationMessage';

export const getJPTranslatedForAlert = (responseCode) => {
  const messages = {
    201: 'Readingの問題をアップロードしました',
    500: '内部サーバーエラー',
  };

  return {
    response_code: responseCode,
    is_success: responseCode === 201,
    message: messages?.[responseCode] ?? messages[500],
  };
};

const getExcelRow = (str) => {
  const arr = str.split('.');
  return arr?.length ? arr[0] : null;
};

const getExcelColumn = (str) => {
  let column = str.split('(').pop().split(')');
  return column?.length ? _.startCase(_.toLower(column[0])) : null;
};

const getValidationRule = (str) => {
  let rule = str.split('[').pop().split(']');
  return rule?.length ? _.toLower(rule[0]) : null;
};

const getValidationParam = (str) => {
  let ruleParam = str.match(/\d+/);
  return ruleParam?.length ? ruleParam[0] : '';
};

const isIndexString = (params) => {
  return !/^\d+$/.test(params);
};

export const getJPTranslatedMessages = (messages, customMessages = {}) => {
  const isFileError = messages.hasOwnProperty('file');
  let translatedMessages = [];

  // check for file error message
  if (isFileError) {
    return 'エクセルファイル(.xlsx)を読み込んでください。';
  }

  // check for excel data error messages
  Object.keys(messages).map(function (sheetKey, index) {
    const sheet = messages[sheetKey];
    Object.keys(sheet).map(function (key, index) {

      const translateProps = {
        rule: getValidationRule(sheet[key][0]),
        ruleParam: getValidationParam(sheet[key][0]),
        column: getExcelColumn(key),
        row: getExcelRow(key),
        sheet: _.startCase(_.toLower(sheetKey)),
        customMessages,
      };

      translatedMessages.push(translateToJapaneseFromExcel(translateProps));
    });
  });

  return translatedMessages;
};
