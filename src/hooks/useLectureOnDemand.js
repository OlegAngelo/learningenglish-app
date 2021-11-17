import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchThumbnail } from '../redux/lectures/slice';
import { removeConfirmDailog } from '../redux/confirmDialog/slice'; 

import lectureApi from '../api/LectureApi';

const useLectureOnDemand = ({ onUpdateCallback, setIsShowAlertModal, setIsSuccessRequest }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  const { lectureDetails } = useSelector((state) => state.lectures);
  const [genreId, setGenreId] = useState(lectureDetails?.genre_id ?? '');
  const [level, setLevel] = useState(lectureDetails?.level ?? '');
  const [title, setTitle] = useState(lectureDetails?.title ?? '');
  const [theme, setTheme] = useState(lectureDetails?.theme ?? '');
  const [teacher1, setTeacher1] = useState(lectureDetails?.lectures_teacher.map(data => data.teacher.name)[0] ?? '');
  const [teacher2, setTeacher2] = useState(lectureDetails?.lectures_teacher.map(data => data.teacher.name)[1] ?? '');
  const [teacher3, setTeacher3] = useState(lectureDetails?.lectures_teacher.map(data => data.teacher.name)[2] ?? '');
  const [image, setImage] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [description, setDescription] = useState(lectureDetails?.description ?? '');
  const [tags, setTags] = useState(lectureDetails?.lectures_tags.map(data => data.lecture_meta_tag.name) ?? []);
  const [initialTags, setInitialTags] = useState([]);
  const [formHookData, setFormHookData] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [lecturePhraseIds, setLecturePhraseIds] = useState([]);
  const [exerciseFilename, setExerciseFilename] = useState('');
  const [isSubmittedToApi, setIsSubmittedToApi] = useState(false);

  const rules = {
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
      required: 'タイトルは必須項目です。',
      minLength: {
        value: 3,
        message: 'タイトルは少なくとも3文字以上である必要があります。',
      },
      maxLength: {
        value: 254,
        message: 'タイトルは254文字以下である必要があります。',
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
    image: {
      required: 'サムネイルは必須項目です',
    },
    optionalTeacher: {
      minLength: {
        value: 3,
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
    tag: {
      maxLength: {
        value: 254,
        message: 'タグは254文字以下である必要があります。',
      },
    },
  };

  const doesTeacherHasAnyValue = !!teacher1 || !!teacher2 || !!teacher3;

  const getFormData = (data) => {
    let formData = new FormData();
    formData.append('genre_id', data.genreId);
    formData.append('level', data.level);
    formData.append('title', data.title);
    formData.append('theme', theme ?? '');
    if (!!teacher1) formData.append('teachers[1]', teacher1);
    if (!!teacher2) formData.append('teachers[2]', teacher2);
    if (!!teacher3) formData.append('teachers[3]', teacher3);
    
    tags.map((item, key) => {
      formData.append(`tags[${key}]`, item);
    });

    const rawImage = image?.file ?? image;
    const imageFile = rawImage instanceof File ? rawImage : new File([rawImage], image.name);
    formData.append('image', imageFile);
    formData.append('description', data?.description ?? '');
    formData.append('exercise_filename', exerciseFilename);
    videoList.map((item, key) => {
      formData.append(`videos[${key}][title]`, item.title);
      formData.append(`videos[${key}][duration]`, item.duration);
      formData.append(`videos[${key}][url]`, item.vimeoVideoId);
      formData.append(`videos[${key}][file_name]`, item.file_name);
    });
    lecturePhraseIds.map((id, index) => {
      formData.append(`phrase_ids[${index}]`, id);
    });

    return formData;
  };

  const submitToApi = async (data) => {
    dispatch(removeConfirmDailog());

    lectureApi
      .saveOnDemand(getFormData(data))
      .then(() => {
        setIsShowAlertModal(true);
        setIsSuccessRequest(true);
        localStorage.removeItem('exercise_ids');
        setTimeout(() => (window.location.href = '/admin/lectures'), 5000);
      })
      .catch((err) => {
        if (err.toJSON().message === 'Network Error') {
          setIsShowAlertModal(true);
          setIsSuccessRequest('noInternet');
        } else {
          let errors = err.response.data;
          setServerErrors(errors);
          setIsShowAlertModal(true);
          setIsSuccessRequest(false);
        }
      });
  };

  const checkIfDataHasTags = (data) => { return data?.tag1 || data?.tag2 || data?.tag3 || data?.tag4 || data?.tag5 };

  const submitToApiUpdate = async (lectureId, data, shouldRedirect=true) => {
    let tempInitialValues = {
      level: data?.level ?? initialValues.level,
      title:  data?.title ?? initialValues.title,
      description: data?.description ?? initialValues.description,
      genre_id: data?.genreId ?? initialValues.genre_id,
      genreId: data?.genreId ?? initialValues.genre_id,
      lectures_teacher: initialValues.lectures_teacher,
      teacher1: data?.teacher1 ?? null,
      teacher2: data?.teacher2 ?? null,
      teacher3: data?.teacher3 ?? null,
      lectures_tags: checkIfDataHasTags(data) ? [] : initialValues.lectures_tags,
      thumbnail: data?.image ? null : initialValues.thumbnail,
      thumbnail_name:  data?.image ? null : initialValues.thumbnail_name,
      image: data?.image ?? null,
    };
    setInitialValues(tempInitialValues);
    dispatch(removeConfirmDailog());
    setIsSubmittedToApi(true);
    lectureApi
      .updateOnDemand({ lectureId, formData: getFormData(data) })
      .then(() => {
        onUpdateCallback('success_update');
        localStorage.removeItem('exercise_ids');
        if (shouldRedirect) {
          setTimeout(() => (window.location.href = '/admin/lectures'), 5000);
        }
      })
      .catch((err) => {
        onUpdateCallback(err?.response?.status === 422 ? 'invalid_fields' : 'failed');
        if (err?.response?.data) setServerErrors(err?.response?.data);
      })
      .finally(() => {
        setIsSubmittedToApi(false);
      });
  };

  const resetOnDemandDetails = () => {
    setLevel(initialValues.level);
    setTitle(initialValues.title);
    setDescription(initialValues.description);

    initialValues.genre_id
      ? setGenreId(initialValues.genre_id)
      : setGenreId(initialValues.genreId);

    if (initialValues?.lectures_teacher?.length > 0) {
      initialValues.lectures_teacher.map((lecture_teacher, index) => {
        index == 0 && setTeacher1(lecture_teacher.teacher.name);
        index == 1 && setTeacher2(lecture_teacher.teacher.name);
        index == 2 && setTeacher3(lecture_teacher.teacher.name);
      })
    }
    if (initialValues.teacher1 || initialValues.teacher2 || initialValues.teacher3) {
      setTeacher1(initialValues.teacher1 ?? '');
      setTeacher2(initialValues.teacher2 ?? '');
      setTeacher3(initialValues.teacher3 ?? '');
    }

    if (initialValues?.lectures_tags?.length > 0) {
      let tempInitialTags = [];
      initialValues.lectures_tags.map((lectures_tag, i) => {
        tempInitialTags[i] = lectures_tag.lecture_meta_tag.name;
      })
      setInitialTags(tempInitialTags);
      setTags(tempInitialTags);
    }

    if (initialValues?.thumbnail) {
      setImage({ name: '読み込み中...' });
      dispatch(fetchThumbnail(initialValues.thumbnail)).then((res) => {
        if (res.payload !== undefined) setImage({
          file: res.payload.data,
          name: initialValues?.thumbnail_name,
        });
      });
    } else {
      setImage(oldImage);
    }
  }

  const setOnDemandDetails = (lecture) => {
    setInitialValues(lecture);
    setGenreId(lecture.genre_id);
    setLevel(lecture.level);
    setTitle(lecture.title);
    setImage({
      name: lecture.thumbnail_name
    });
    setDescription(lecture.description);

    if (lecture?.lectures_teacher?.length > 0) {
      lecture.lectures_teacher.map((lecture_teacher, index) => {
        index == 0 && setTeacher1(lecture_teacher.teacher.name)
        index == 1 && setTeacher2(lecture_teacher.teacher.name)
        index == 2 && setTeacher3(lecture_teacher.teacher.name)
      })
    }

    if (lecture?.lectures_tags?.length > 0) {
      let tempInitialTags = [];
      lecture.lectures_tags.map((lectures_tag, i) => {
        tempInitialTags[i] = lectures_tag.lecture_meta_tag.name;
      })
      setInitialTags(tempInitialTags);
    }

    if (lecture?.thumbnail) {
      setImage({ name: '読み込み中...' });
      dispatch(fetchThumbnail(lecture?.thumbnail)).then((res) => {
        if (res.payload !== undefined) setImage({
          file: res.payload.data,
          name: lecture?.thumbnail_name,
        });
      });
    }
  };

  useEffect(() => {
    //set previous image, to be used in reset initialValues when image is deleted and tab is changed
    if (image) setOldImage(image);
  }, [image])

  useEffect(() => {
    if (lectureDetails?.thumbnail) {
      setImage({ name: '読み込み中...' });
      dispatch(fetchThumbnail(lectureDetails?.thumbnail)).then((res) => {
        if (res.payload !== undefined) {
          setImage({
            file: res.payload.data,
            name: lectureDetails?.thumbnail_name,
          });
        }
      });
    }
  }, [lectureDetails]);

  return {
    genreId,
    level,
    title,
    teacher1,
    teacher2,
    teacher3,
    image,
    tags,
    initialTags,
    rules,
    description,
    videoList,
    lecturePhraseIds,
    exerciseFilename,
    formHookData,
    serverErrors,
    doesTeacherHasAnyValue,
    setGenreId,
    setLevel,
    setTitle,
    setTeacher1,
    setTeacher2,
    setTeacher3,
    setImage,
    setTags,
    setDescription,
    setVideoList,
    setLecturePhraseIds,
    setExerciseFilename,
    setServerErrors,
    setFormHookData,
    submitToApi,
    submitToApiUpdate,
    setOnDemandDetails,
    isSubmittedToApi,
    setIsSubmittedToApi,
    resetOnDemandDetails,
  };
};

export default useLectureOnDemand;
