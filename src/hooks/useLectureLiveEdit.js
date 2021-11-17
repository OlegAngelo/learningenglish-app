import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router';

import { removeConfirmDailog } from '../redux/confirmDialog/slice';
import { isDateAfterTo, isTimeSameOrAfterTo } from '../utils/validationHelper';

import lectureApi from '../api/LectureApi';

const useLectureLiveEdit = ({ setIsShowAlertModal, setIsSuccessRequest }) => {
  const dispatch = useDispatch();
  const lecture_id = useParams().id;
  const [publishedDate, setPublishedDate] = useState('');
  const [publishedTime, setPublishedTime] = useState('');
  const [liveDate, setLiveDate] = useState('');
  const [liveTimeFrom, setLiveTimeFrom] = useState('');
  const [liveTimeTo, setLiveTimeTo] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genre2Id, setGenre2Id] = useState('');
  const [level, setLevel] = useState('');
  const [title, setTitle] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [teacher1, setTeacher1] = useState('');
  const [teacher2, setTeacher2] = useState('');
  const [teacher3, setTeacher3] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [attachments, setAttachments] = useState([
    'attachment1.mp4',
    'attachment2.xlsx',
  ]);
  const [serverErrors, setServerErrors] = useState(null);

  const rules = {
    publishedDate: {
      required: '情報公開日は必須項目です。',
    },
    publishedTime: {
      required: '情報公開時間は必須項目です。',
    },
    liveDate: {
      required: 'Live実施日は必須項目です。',
      validate: () =>
        isDateAfterTo({
          date1: {
            value: publishedDate,
            label: '情報公開日',
          },
          date2: {
            value: liveDate,
            label: 'Live実施日',
          },
          formatDate: true,
        }),
    },
    liveTimeFrom: {
      required: 'Live開始時間は必須項目です。',
    },
    liveTimeTo: {
      required: 'Live終了時間は必須項目です。',
      validate: () =>
        isTimeSameOrAfterTo({
          date1: {
            value: liveTimeFrom,
            label: 'Live開始時間',
          },
          date2: {
            value: liveTimeTo,
            label: 'Live終了時間',
          },
          formatDate: true,
        }),
    },
    genreId: {
      required: 'ジャンルは必須項目です。',
      min: {
        value: 1,
        message: 'ジャンルの選択された値は無効です。',
      },
      max: {
        value: 8,
        message: 'ジャンルの選択された値は無効です。',
      },
    },
    genreId: {
      min: {
        value: 1,
        message: 'ジャンルの選択された値は無効です。',
      },
      max: {
        value: 8,
        message: 'ジャンルの選択された値は無効です。',
      },
    },
    level: {
      required: '難易度は必須項目です。',
      min: {
        value: 1,
        message: '難易度の選択された値は無効です。',
      },
      max: {
        value: 3,
        message: '難易度の選択された値は無効です。',
      },
    },
    title: {
      minLength: {
        value: 3,
        message: 'タイトルは少なくとも3文字以上である必要があります。',
      },
      required: 'タイトルは必須項目です。',
      maxLength: {
        value: 254,
        message: 'タイトルは254文字以下である必要があります。',
      },
    },
    subtopic: {
      minLength: {
        value: 3,
        message: '小テーマは少なくとも3文字以上である必要があります。',
      },
      maxLength: {
        value: 254,
        message: '小テーマは254文字以下である必要があります。',
      },
    },
    tags: {
      required: 'タグは必須項目です。',
    },
    tag: {
      maxLength: {
        value: 254,
        message: 'タグは254文字以下である必要があります。',
      },
    },
    teacher: {
      required: '先生は必須項目です。',
      minLength: {
        value: 3,
        message: 'タイトルは少なくとも3文字以上である必要があります。',
      },
      maxLength: {
        value: 254,
        message: 'タイトルは254文字以下である必要があります。',
      },
    },
    optionalTeacher: {
      minLength: {
        message: 'タイトルは少なくとも3文字以上である必要があります。',
      },
      maxLength: {
        value: 254,
        message: 'タイトルは254文字以下である必要があります。',
      },
    },
    description: {
      minLength: {
        value: 3,
        message: '概要テキストは少なくとも3文字以上である必要があります。',
      },
      maxLength: {
        value: 60000,
        message: '概要テキストは254文字以下である必要があります。',
      },
    },
    image: {
      required: 'サムネイルは必須項目です',
    },
    url: {
      required: 'URLは必須項目です。',
      minLength: {
        value: 3,
        message: 'URLは少なくとも3文字以上である必要があります。',
      },
      maxLength: {
        value: 254,
        message: 'URLは254文字以下である必要があります。',
      },
      pattern: {
        value:
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        message: 'URLが無効です。',
      },
    },
  };

  const doesTeacherHasAnyValue = !!teacher1 || !!teacher2 || !!teacher3;

  const getFormData = (data) => {
    let formData = new FormData();
    formData.append('description', data.description);
    formData.append('genre_id', parseInt(data.genreId));
    if (data.genre2Id)
      formData.append('genre2_id', parseInt(data.genre2Id));
    formData.append('level', data.level);
    formData.append('live_date', moment(liveDate).format('YYYY-MM-DD'));
    formData.append('live_time_from', liveTimeFrom.format('H:mm'));
    formData.append('live_time_to', liveTimeTo.format('H:mm'));
    formData.append('published_date', moment(publishedDate).format('YYYY-MM-DD'));
    formData.append('published_time', publishedTime.format('H:mm'));
    formData.append('subtopic', data.subtopic);
    if (!!data.teacher1) formData.append('teachers[0]', data.teacher1);
    if (!!data.teacher2) formData.append('teachers[1]', data.teacher2);
    if (!!data.teacher3) formData.append('teachers[2]', data.teacher3);
    tags.map((item, key) => {
      formData.append(`tags[${key}]`, item);
    });
    formData.append('image', image);
    formData.append('title', data.title);
    formData.append('url', data.url);

    return formData;
  };

  const submitToUpdateApi = (data) => {
    dispatch(removeConfirmDailog());

    lectureApi
      .updateLive({ lecture_id, formData: getFormData(data) })
      .then((res) => {
        setIsShowAlertModal(true);
        setIsSuccessRequest(res?.status === 201);
        setTimeout(() => (window.location.href = '/admin/lectures'), 5000);
      })
      .catch((err) => {
        setIsSuccessRequest(false);
        if (err.toJSON().message === 'Network Error') {
          setIsShowAlertModal(true);
          setIsSuccessRequest('noInternet');
        } else {
          let errors = err.response.data;
          setServerErrors(errors);
          setIsShowAlertModal(true);
        }
      });
  };

  return {
    publishedDate,
    publishedTime,
    liveDate,
    liveTimeFrom,
    liveTimeTo,
    genreId,
    genre2Id,
    level,
    title,
    subtopic,
    teacher1,
    teacher2,
    teacher3,
    image,
    tags,
    thumbnail,
    description,
    url,
    attachments,
    serverErrors,
    rules,
    doesTeacherHasAnyValue,
    setPublishedDate,
    setPublishedTime,
    setLiveDate,
    setLiveTimeFrom,
    setLiveTimeTo,
    setGenreId,
    setGenre2Id,
    setLevel,
    setTitle,
    setSubtopic,
    setTeacher1,
    setTeacher2,
    setTeacher3,
    setImage,
    setTags,
    setThumbnail,
    setDescription,
    setUrl,
    setAttachments,
    setServerErrors,
    submitToUpdateApi,
  };
};

export default useLectureLiveEdit;
