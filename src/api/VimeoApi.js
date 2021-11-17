import axios from 'axios';

const VimeoApi = {
  upload: ({uploadLink, file, onUploadProgress}) => {
    const options = {
      method: 'PATCH',
      url: uploadLink,
      headers: {
        'Tus-Resumable': '1.0.0',
        'Upload-Offset': '0',
        'Content-Type': 'application/offset+octet-stream',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
      },
      data: file,
      onUploadProgress: onUploadProgress,
    };

    return axios.request(options);
  },
  verify: ({uploadLink}) => {
    const options = {
      method: 'HEAD',
      url: uploadLink,
      headers: {
        'Tus-Resumable': '1.0.0',
        'Accept':'application/vnd.vimeo.*+json;version=3.4'
      },
    };

    return axios.request(options);
  },
};

export default VimeoApi;
