import _ from 'lodash';

export const getJPTranslatedForAlert = (responseCode) => {
  const messages = {
    201: '正常に更新しました。',
    200: '正常に更新しました。',
    500: '内部サーバーエラー',
    403: 'エラーが発生しました。後ほど再度お試しください。',
  };

  return {
    response_code: responseCode,
    is_success: responseCode === 201 || responseCode === 200,
    message: messages?.[responseCode] ?? messages[500],
  };
};

export const getJPTranslatedMessages = (file) => {
  const fileTypes = ['video/mp4', 'audio/mp3', 'audio/mpeg'];

  // check for file error message
  if (!fileTypes.includes(file.type)) {
    return '無効なビデオファイルです。';
  }
};
