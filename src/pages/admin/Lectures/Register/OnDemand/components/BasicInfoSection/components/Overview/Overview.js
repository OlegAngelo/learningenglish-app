import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import AddBoxIcon from '../../../../../../../../../shared/icons/AddBoxIcon';
import Button from '../../../../../../../../../shared/Button/Button';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import SelectInput from '../../../../../../../../../shared/SelectInput';
import LectureTags from '../../../../../components/Tags/Tags';
import UploadModal from '../../../../../../components/UploadModal';
import ImageFilterIcon from '../../../../../../../../../shared/icons/ImageFilterIcon';
import DeleteIcon from '../../../../../../../../../shared/icons/DeleteIcon';

import { genreOptions, levelOptions } from '../../../../../../components/data';

import useUploadFile from '../../../../../../components/hooks/useUploadFile';
import style from '../../../../OnDemand.module.css';

import { Hint } from 'react-autocomplete-hint';
import AdminApi from '../../../../../../../../../api/AdminApi';

import { setIsClickTab, setTabLink } from '../../../../../../../../../redux/lectures/slice';

const Overview = ({
  props,
  setIsSaveBtnDisabled,
  setIsShowAlertModal,
  setIsSuccessRequest,
  setIsFirstTabValid,
  setShowDiscardModal,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: liveId } = useParams();
  const {
    genreId,
    genre2Id,
    level,
    title,
    teacher1,
    teacher2,
    teacher3,
    description,
    image,
    tags,
    rules,
    serverErrors,
    doesTeacherHasAnyValue,
    setGenreId,
    setGenre2Id,
    setLevel,
    setTitle,
    setDescription,
    setTeacher1,
    setTeacher2,
    setTeacher3,
    setImage,
    setTags,
    setFormHookData,
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
  const { isDirty } = formState;
  const teach2 = watch('teacher2');
  const teach3 = watch('teacher3');
  const [hintData, setHintData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const {isClickTab, tabLink} = useSelector((state) => state.lectures);

  const getTeachers = async () => {
    const res = await AdminApi.getTeachers();
    var hintArray = [];
    res.data.map((a) => hintArray.push(a.name));
    setHintData(hintArray);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    if (isClickTab) {
      handleSubmit(onNextTab)();
    }
  }, [isClickTab]);

  // watch if form inputs was touch or not
  useEffect(() => {
    if (isDirty || image) setShowDiscardModal(true);
    else setShowDiscardModal(false);
  }, [isDirty, image]);

  // watch if there are validation errors
  useEffect(() => {
    if (!_.isEmpty(errors)) {
      setIsShowAlertModal(true);
      setIsSuccessRequest(false);
    }
  }, [errors]);

  // store validated form states so when go back to this page value won't disappear
  const onNextTab = (data) => {
    setShowDiscardModal(false);
    setIsSaveBtnDisabled(false);
    setGenreId(data.genreId);
    setLevel(data.level);
    setTitle(data.title);
    setTeacher1(data.teacher1);
    setTeacher2(data.teacher2);
    setTeacher3(data.teacher3);
    setDescription(data.description);
    setFormHookData(data);
    setIsFirstTabValid(true);

    // handle live on click next tab
    if (isClickTab) {
      const redirectLink = tabLink;
      dispatch(setIsClickTab(false));
      dispatch(setTabLink(''));

      history.push(redirectLink);
    }
    
    if (liveId) history.push(`/admin/lectures/register/on-demand/${liveId}/video-list`);
    else history.push('/admin/lectures/register/on-demand/video-list');
  };

  const handleOnClickUpload = (file) => {
    setImage(file);
  };

  const removeImage = () => {
    setImage('');
    setImageUrl('');
  };

  const fileType = {
    image: null,
  };

  let uploadFunction = 'uploadImageReady';

  const useUploadFileProps = {
    fileType,
    uploadFunction,
    handleOnClickUpload,
  };

  const { modalProps, showUploadModal, file, setShowUploadModal } =
    useUploadFile(useUploadFileProps);

  const tagsProps = {
    tags,
    rules,
    serverErrors,
    errors,
    setTags,
    register,
    setFormValue,
  };

  useEffect(() => {
    if (!!image) {
      if (image?.name !== '読み込み中...')
        setImageUrl(
          URL.createObjectURL(new Blob([image?.file ?? image], { type: 'image/bmp' }))
        );
    }
  }, [image]);

  useEffect(() => {
    title && setIsFirstTabValid(true);
  }, []);

  return (
    <div>
      {showUploadModal && (
        <UploadModal
          title="画像データをアップロードしてください"
          icon="image"
          file={file[showUploadModal]}
          {...modalProps}
        />
      )}

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
            required='true'
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
            required='true'
            hideDefaultOption
            errorComponent={
              <ErrorMessage 
                serverErrors={serverErrors?.level} 
                errors={errors.level} 
              />
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
          onChange={(event) => setTitle(event.target.value)}
          className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
        />
        <ErrorMessage serverErrors={serverErrors?.title} errors={errors.title} />
      </div>

      {/* # Teachers Name */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-8">
          講師の先生の名前 <span className="text-adminRed-400">*</span>
        </p>
        <Hint options={hintData} allowTabFill>
          <input
            type="text"
            name="teacher1"
            ref={register(teach2 || teach3 ? { required: false } : { ...rules.teacher })}
            onChange={(event) => setTeacher1(event.target.value)}
            className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
          />
        </Hint>
        <Hint options={hintData} allowTabFill>
          <input
            type="text"
            name="teacher2"
            defaultValue={teacher2}
            ref={register(rules.optionalTeacher)}
            onChange={(event) => setTeacher2(event.target.value)}
            className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${
              style.inputText
            }`}
          />
        </Hint>
        <Hint options={hintData} allowTabFill>
          <input
            type="text"
            name="teacher3"
            defaultValue={teacher3}
            ref={register(rules.optionalTeacher)}
            onChange={(event) => setTeacher3(event.target.value)}
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

      {/* # Tags */}
      <LectureTags {...tagsProps} />

      {/* # Thumbnail */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-16">サムネイル画像 <span className="text-adminRed-400">*</span></p>
        <div className="flex items-center mb-px-14">
          <p className="text-basic-100 text-12 mr-px-20 break-all">{image ? image.name : 'なし'}</p>
          {image && ( 
            <DeleteIcon 
              className="cursor-pointer" 
              onClick={removeImage}
            /> 
          )}
        </div>
        <div className="flex">
          {imageUrl && (
            <a href={imageUrl} target="_blank">
              <Button
                innerClass="cursor-pointer"
                className="mr-px-10"
                type="blue-square"
                icon={<ImageFilterIcon color="white" width="18" height="18" />}
                onClick={(e) => e.target.blur()}
              >
                画像をプレビュー
              </Button>
            </a>
          )}
          <Button
            innerClass="cursor-pointer"
            type="blue-square"
            icon={<AddBoxIcon width="16" height="16" />}
            onClick={() => setShowUploadModal('image')}
          >
            画像をアップロード
          </Button>
        </div>
        <input
          type="text"
          name="image"
          value={image}
          className="hidden"
          ref={register(rules.image)}
        />
        <ErrorMessage
          show={!image}
          serverErrors={serverErrors?.image}
          errors={errors.image}
        />
      </div>

      {/* # Summary / Description */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-6">概要テキスト</p>

        <textarea
          style={{ height: '504px', width: '542px' }}
          className="m-w-full text-14 leading-px-24 font-normal text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none border-px-2 border-adminGray-200 rounded-px-2"
          cols="80"
          name="description"
          ref={register(rules.description)}
        />
        <ErrorMessage
          serverErrors={serverErrors?.description}
          errors={errors.description}
        />
      </div>

      {/* <div className="my-px-40">
        <p className="text-base-dark text-18 font-bold mb-px-16">配布物</p>
        <p className="text-adminGray-400 text-12 font-bold mb-px-6">資料</p>

        <Button
          innerClass="cursor-pointer"
          type="blue-square"
          icon={<AddBoxIcon width="16" height="16" />}
          onClick={(e) => e.target.blur()}
        >
          資料をアップロード
        </Button>
      </div> */}

      <div className="mb-px-40">
        <Button
          innerClass="cursor-pointer px-px-34"
          type="blue-square"
          onClick={handleSubmit(onNextTab)}
        >
          動画の登録へ
        </Button>
      </div>
    </div>
  );
};

export default Overview;
