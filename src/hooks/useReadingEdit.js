import { useState } from 'react';
import AdminReadingApi from '../api/SelfLearning/Reading/AdminReadingApi';

const useReadingEdit = ({ setIsShowAlertModal, setIsSuccessRequest }) => {
  const levelId = localStorage.getItem('levelId');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rules = {
    title: {
      required: 'タイトルは必須項目です',
      maxLength: {
        message: 'タイトルは254文字以下である必要があります。',
        value: 254
      },
      minLength: {
        message: 'タイトルは少なくとも3文字以上である必要があります。',
        value: 3
      }
    },

    /* en_title: {
      required: '英語のタイトルは必須項目です。',
      maxLength: {
        message: '英語のタイトルは254文字以下である必要があります。',
        value: 254
      },
      minLength: {
        message: '英語のタイトルは3文字以上である必要があります。',
        value: 3
      }
    },

    introductory: {
      required: '紹介文は必須項目です。',
      maxLength: {
        message: '紹介テキストは254文字以下である必要があります。',
        value: 254
      },
      minLength: {
        message: '紹介テキストは3文字以上である必要があります。',
        value: 3
      }
    }, */

    english_script: {
      required: '英文は必須項目です。',
      maxLength: {
        message: '英文は16,000,000文字以下である必要があります。',
        value: 16000000
      },
      minLength: {
        message: '英文は少なくとも3文字以上である必要があります。',
        value: 3
      }
    },

    jp_script: {
      required: '日本語訳は必須項目です。',
      maxLength: {
        message: '日本語訳は16,000,000文字以下である必要があります。',
        value: 16000000
      },
      minLength: {
        message: '日本語訳は少なくとも3文字以上である必要があります。',
        value: 3
      }
    },
  };

  const submitToApi = (data) => {
    let payload = {...data, levelId};

    AdminReadingApi.updateReading(payload)
      .then(() => {
        localStorage.removeItem('levelId');
        setIsSubmitted(true);
        setIsShowAlertModal(true);
        setIsSuccessRequest(true);
        setTimeout(() => (window.location.href = '/admin/reading'), 5000);
      })
      .catch((err) => {
        if (err.toJSON().message === 'Network Error') {
          setIsShowAlertModal(true);
          setIsSuccessRequest('noInternet');
        } else {
          setIsShowAlertModal(true);
          setIsSuccessRequest(false);
        }
      });
  };

  return { rules, submitToApi, isSubmitted };
};

export default useReadingEdit;
