import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Hint } from 'react-autocomplete-hint';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import SelectInput from '../../../../../../../shared/SelectInput/SelectInput';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import UploadSection from '../../components/UploadSection';

import { genreOptions, levelOptions } from '../../../../components/data';
import style from '../../Details.module.css';

import AdminApi from '../../../../../../../api/AdminApi';
import { setIsClickSave } from '../../../../../../../redux/lectures/slice';

const Overview = ({
  props,
  setIsSaveBtnDisabled,
  setIsShowAlertModal,
  setIsSuccessRequest,
  setIsFirstTabValid,
  setAlertMessage,
  setShowDiscardModal,
}) => {
  const lectureId = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { adminLectureDetail, isClickSave } = useSelector((state) => state.lectures);
  const {
    rules,
    serverErrors,
    doesTeacherHasAnyValue,
    genreId,
    level,
    title,
    initialTags,
    tags,
    image,
    description,
    teacher1,
    teacher2,
    teacher3,
    setGenreId,
    setLevel,
    setTitle,
    setTeacher1,
    setTeacher2,
    setTeacher3,
    setTags,
    setDescription,
    setImage,
    setFormHookData,
    submitToApiUpdate,
    isSubmittedToApi,
  } = props;

  const {
    control,
    register,
    handleSubmit,
    errors,
    watch,
    formState,
    setValue: setFormValue,
  } = useForm({
    defaultValues: {
      genreId: genreId,
      level: level,
      title: title,
      teacher1: teacher1,
      teacher2: teacher2,
      teacher3: teacher3,
      description: description,
      image: image,
      tag1: tags[0] ?? '',
      tag2: tags[1] ?? '',
      tag3: tags[2] ?? '',
      tag4: tags[3] ?? '',
      tag5: tags[4] ?? '',
    },
    shouldUnregister: false,
  });
  const teach2 = watch('teacher2');
  const teach3 = watch('teacher3');
  const [hintData, setHintData] = useState([]);
  const [rawFile, setRawFile] = useState('default');
  const { isDirty } = formState;

  const onSubmit = (data) => {
    setIsSaveBtnDisabled(false);
    setGenreId(data.genreId);
    setLevel(data.level);
    setTitle(data.title);
    setDescription(data.description);
    setFormHookData(data);
    setIsFirstTabValid(true);
    let shouldRedirect = false;
    submitToApiUpdate(lectureId, data, shouldRedirect);
  };

  const getTeachers = async () => {
    const res = await AdminApi.getTeachers();
    var hintArray = [];
    res.data.map((a) => hintArray.push(a.name));
    setHintData(hintArray);
  };

  const uploadSectionProps = {
    rules,
    serverErrors,
    initialTags,
    tags,
    description,
    image,
    setTags,
    setDescription,
    setIsSaveBtnDisabled,
    setImage,
    isSubmittedToApi,
    setRawFile,
    register,
    errors,
    setValue: setFormValue,
    onSubmit,
    handleSubmit,
  };

  // watch if there are validation errors
  useEffect(() => {
    if (!_.isEmpty(errors)) {
      setIsShowAlertModal(true);
      setIsSuccessRequest(false);
      setAlertMessage('無効な入力をされた項目があります。');
    }
  }, [errors]);

  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    if (isClickSave) {
      handleSubmit(onSubmit)();
      dispatch(setIsClickSave(false));
    }
  }, [isClickSave]);

  useEffect(() => {
    if (isDirty || rawFile !== 'default') setShowDiscardModal(true);
  }, [isDirty, rawFile]);

  return (
    <Fragment>
      {/* # Genre */}
      <Controller
        control={control}
        name="genreId"
        rules={rules.genreId}
        onChange={(event) => setGenreId(event.target.value)}
        render={({ value, onChange }) => (
          <SelectInput
            className="my-px-40"
            innerClass={`border-px-2 border-adminGray-200 ${style.select}`}
            label="ジャンル"
            onChange={onChange}
            options={genreOptions}
            value={value}
            required
            hideDefaultOption
            errorComponent={
              <ErrorMessage
                serverErrors={serverErrors?.genre_id}
                errors={errors.genreId}
              />
            }
          />
        )}
      />

      {/* # Level of difficulty */}
      <Controller
        control={control}
        name="level"
        rules={rules.level}
        onChange={(event) => setLevel(event.target.value)}
        render={({ value, onChange }) => (
          <SelectInput
            className="mb-px-40"
            innerClass={`border-px-2 border-adminGray-200 ${style.select}`}
            label="難易度"
            value={value}
            onChange={onChange}
            options={levelOptions}
            required
            hideDefaultOption
            errorComponent={
              <ErrorMessage serverErrors={serverErrors?.level} errors={errors.level} />
            }
          />
        )}
      />

      {/* # Title */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-8">
          タイトル <span className="text-adminRed-400">*</span>
        </p>
        <input
          type="text"
          name="title"
          ref={register(rules.title)}
          defaultValue={title}
          className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
        />
        <ErrorMessage serverErrors={serverErrors?.title} errors={errors.title} />
      </div>

      {/* # Teachers Name */}
      <div className="flex flex-col mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-8">
          講師の先生の名前<span className="text-adminRed-400">*</span>
        </p>
        <Hint options={hintData} allowTabFill>
          <input
            type="text"
            name="teacher1"
            ref={register(
              teach2 || teach3
                ? { required: false }
                : { ...rules.teacher }
            )}
            onChange={(event) => {
              setFormValue('teacher1', event.target.value || '');
              setTeacher1(event.target.value);
            }}
            className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
          />
        </Hint>
        <Hint options={hintData} allowTabFill>
          <input
            type="text"
            name="teacher2"
            ref={register(rules.optionalTeacher)}
            onChange={(event) => {
              setFormValue('teacher2', event.target.value || '');
              setTeacher2(event.target.value);
            }}
            className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${
              style.inputText
            }`}
          />
        </Hint>
        <Hint options={hintData} allowTabFill>
          <input
            type="text"
            name="teacher3"
            ref={register(rules.optionalTeacher)}
            onChange={(event) => {
              setFormValue('teacher3', event.target.value || '');
              setTeacher3(event.target.value);
            }}
            className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${
              style.inputText
            }`}
          />
        </Hint>
        <ErrorMessage
          show={!doesTeacherHasAnyValue}
          serverErrors={serverErrors?.teachers}
          errors={errors.teacher1}
        />
      </div>

      <UploadSection 
        props={uploadSectionProps}
        setIsSaveBtnDisabled={setIsSaveBtnDisabled}
      />
    </Fragment>
  );
};

export default Overview;
