const serverErrorHelper = {
  getErrorMsg(response) {
    const responseStatus = response?.status;
    const responseData = response?.data;

    switch (responseStatus) {
      case 401:
        return '許可されていません：資格情報が無効なため、アクセスが拒否されました。';
      case 403:
        return '禁止：このサーバーにアクセスする/アクセスする権限がありません。';
      case 422:
        if (typeof responseData === 'string') return responseData;
        if (responseData?.status) return responseData.status;
        if (responseData) {
          if (responseData?.errors) {
            return Object.values(responseData.errors)[0][0];
          }

          return Object.values(responseData)[0][0] || responseStatus;
        }

        return responseStatus;
      case 500:
        return '内部サーバーエラー';
      default:
        return 'Error has occurred.';
    }
  },
};

export default serverErrorHelper;
