import React, { Fragment, useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { Hint } from 'react-autocomplete-hint';

import BasicInfoSectionHeader from '../BasicInfoSectionHeader';
import CardInformationSection from '../CardInformationSection';
import ThumbnailSection from '../ThumbnailSection';

import Tags from '../../../../Register/components/Tags';
import UploadModal from '../../../../components/UploadModal';

import BoardComponent from '../../../../../../../shared/BoardComponent';
import Button from '../../../../../../../shared/Button';
import AlertModal from '../../../../../../../shared/AlertModal';
import InputDate from '../../../../../../../shared/InputDate';
import InputTime from '../../../../../../../shared/InputTime';
import SelectInput from '../../../../../../../shared/SelectInput';

import useUploadFile from '../../../../components/hooks/useUploadFile';
import style from './BasicInfoSection.module.css';

import { genreOptions, levelOptions } from '../../../../components/data';
import AdminApi from '../../../../../../../api/AdminApi';
import useLectureLiveEdit from '../../../../../../../hooks/useLectureLiveEdit';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import LectureApi from '../../../../../../../api/LectureApi';

import { FormWrapperContext } from '../FormWrapper/FormWrapper';

// Config
import { PLANNING_TO_LIVE, ON_LIVE, FINISHED_LIVE } from '../../../../../../../config/lectureTypes.json';

const BasicInfoSection = () => {
  const { 
    setIsShowConvertModal, 
    setShowDiscardModal, 
    deleteLecture,
    lectureDetails,
    setValue,
    control,
    register,
    handleSubmit,
    errors,
    watch,
    formState
  } = useContext(FormWrapperContext);

  const [hintData, setHintData] = useState([]);
  const [imageUrl, setImageUrl] = useState('#');
  const [isSubmittedToApi, setIsSubmittedToApi] = useState(false);

  const displayIconInDateFields =
    lectureDetails.type_id === PLANNING_TO_LIVE ||
    lectureDetails.type_id === null;

  const disableDateFields =
    lectureDetails.type_id === ON_LIVE ||
    lectureDetails.type_id === FINISHED_LIVE;

  const teach2 = watch('teacher2');
  const teach3 = watch('teacher3');

  const fileType = {
    image: null,
  };

  const uploadFunction = 'uploadImageReady';
  const handleOnClickUpload = (file) => {
    const { setImage } = LectureLiveHook;
    setImage(file);
    setShowDiscardModal(true);
  };

  const modalDisplayData = {
    image: {
      title: '画像データをアップロードしてください',
      icon: 'image',
    },
  };
  const useUploadFileProps = { fileType, uploadFunction, handleOnClickUpload };

  const registerLiveMessage = {
    true: 'LIVEを更新しました。',
    false: '無効な入力をされた項目があります。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };

  const {
    modalProps,
    showUploadModal,
    setShowUploadModal,
    file,
    uploadedfile,
    isSuccessRequest,
    isShowAlertModal,
    setIsShowAlertModal,
    setIsSuccessRequest,
  } = useUploadFile(useUploadFileProps);

  const getTeachers = async () => {
    const res = await AdminApi.getTeachers();
    var hintArray = [];
    res.data.map((a) => hintArray.push(a.name));
    setHintData(hintArray);
  };

  const LectureLiveHook = useLectureLiveEdit({
    setIsShowAlertModal,
    setIsSuccessRequest,
  });

  const isConvertButtonIsDisabled = () => {
    const dateEnabled = moment(lectureDetails?.lecture_lives.end_at).add(1, 'days');
    return dateEnabled.isSameOrAfter(moment());
  };

  const {
    publishedDate,
    publishedTime,
    liveDate,
    liveTimeFrom,
    liveTimeTo,
    genreId,
    genre2Id,
    level,
    tags,
    image,
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
    setTeacher1,
    setTeacher2,
    setTeacher3,
    setTags,
    setImage,
    submitToUpdateApi,
  } = LectureLiveHook;

  const tagsProps = {
    tags,
    rules,
    serverErrors,
    errors,
    setTags,
    register,
    setFormValue: setValue,
  };

  const handleSumbitToApi = (data) => {
    setIsSubmittedToApi(true);
    submitToUpdateApi(data);
  };

  const onClickAlertOk = () => {
    if (isSuccessRequest === true) window.location.href = '/admin/lectures';
    else setIsSubmittedToApi(false);
  };

  useEffect(() => {
    if (lectureDetails) {
      setPublishedDate(moment(lectureDetails?.publish_at));
      setLiveDate(moment(lectureDetails?.lecture_lives?.start_at));
      setPublishedTime(
        moment(moment(lectureDetails?.publish_at).format('HH:mm'), 'HH:mm')
      );
      setLiveTimeFrom(
        moment(moment(lectureDetails.lecture_lives.start_at).format('HH:mm'), 'HH:mm')
      );
      setLiveTimeTo(
        moment(moment(lectureDetails.lecture_lives.end_at).format('HH:mm'), 'HH:mm')
      );
    }
  }, [lectureDetails]);

  useEffect(() => {
    LectureApi.fetchImage(lectureDetails?.thumbnail).then((res) => {
      setImage(new File([res.data], lectureDetails?.thumbnail_name));
      setImageUrl(URL.createObjectURL(new Blob([res.data], { type: 'image/bmp' })));
    });
  }, [lectureDetails]);

  useEffect(() => {
    getTeachers();
  }, []);

  // pop out a modal if there are validation error upon submission
  useEffect(() => {
    if (!_.isEmpty(errors)) {
      setIsShowAlertModal(true);
      setIsSuccessRequest(false);
    }
  }, [errors]);

  return (
    <Fragment>
      {showUploadModal && (
        <UploadModal
          title={modalDisplayData[showUploadModal].title}
          icon={modalDisplayData[showUploadModal].icon}
          file={file[showUploadModal]}
          {...modalProps}
        />
      )}

      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest === true ?? false}
        message={registerLiveMessage[isSuccessRequest]}
        onClickOutsideClose={false}
        handleOnClickOk={onClickAlertOk}
      />
      <BasicInfoSectionHeader
        deleteLecture={deleteLecture}
        onClickSubmit={handleSubmit(handleSumbitToApi)}
        isSubmittedToApi={isSubmittedToApi}
      />
      <hr />
      <BoardComponent>
        <div>
          <CardInformationSection data={lectureDetails} />
          {/* # Disclosure date & time */}
          <div className="mb-px-40 pt-px-40">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              情報公開日時 <span className="text-adminRed-400">*</span>
            </p>
            <Controller
              control={control}
              name="publishedDate"
              rules={rules.publishedDate}
              render={({ onChange }) => (
                <InputDate
                  placeholder="-"
                  className="mb-px-8"
                  onChange={(value) => {
                    setPublishedDate(moment(value));
                    onChange(value);
                  }}
                  minDate={new Date(lectureDetails?.publish_at)}
                  value={new Date(lectureDetails?.publish_at)}
                  showIcon={displayIconInDateFields}
                  disabled={disableDateFields}
                />
              )}
            />
            <ErrorMessage
              serverErrors={serverErrors?.published_date}
              errors={errors.publishedDate}
            />

            <Controller
              control={control}
              name="publishedTime"
              rules={rules.publishedTime}
              render={({ onChange }) => (
                <InputTime
                  placeholder="-"
                  value={moment(
                    moment(lectureDetails?.publish_at).format('HH:mm'),
                    'HH:mm'
                  )}
                  onChange={(value) => {
                    setPublishedTime(value);
                    onChange(moment(value).format('HH:mm'));
                  }}
                  showIcon={displayIconInDateFields}
                  disabled={disableDateFields}
                />
              )}
            />
            <ErrorMessage errors={errors.publishedTime} />
          </div>

          <div className="mb-px-40">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              LIVE実施日時 <span className="text-adminRed-400">*</span>
            </p>
            <Controller
              control={control}
              name="liveDate"
              rules={rules.liveDate}
              render={({ onChange }) => (
                <InputDate
                  placeholder="-"
                  className="mb-px-8"
                  onChange={(value) => {
                    setLiveDate(moment(value));
                    onChange(value);
                  }}
                  minDate={new Date(publishedDate ? moment(publishedDate) : null)}
                  value={new Date(lectureDetails?.lecture_lives?.start_at)}
                  showIcon={displayIconInDateFields}
                  disabled={disableDateFields}
                />
              )}
            />
            <ErrorMessage
              serverErrors={!!serverErrors?.live_date && rules.liveDate.after}
              errors={errors.liveDate}
            />
            <div className="flex">
              <div className={style.liveTime}>
                <Controller
                  control={control}
                  name="liveTimeFrom"
                  rules={rules.liveTimeFrom}
                  render={({ onChange }) => (
                    <InputTime
                      placeholder="-"
                      value={moment(
                        moment(lectureDetails?.lecture_lives?.start_at).format('HH:mm'),
                        'HH:mm'
                      )}
                      onChange={(value) => {
                        setLiveTimeFrom(value);
                        onChange(moment(value).format('HH:mm'));
                      }}
                      showIcon={displayIconInDateFields}
                      disabled={disableDateFields}
                    />
                  )}
                />
                <ErrorMessage
                  serverErrors={serverErrors?.live_time_from}
                  errors={errors.liveTimeFrom}
                />
              </div>
              <p className="text-12 text-adminGray-700 font-semibold mx-px-8 mt-px-11">〜</p>
              <div className={style.liveTime}>
                <Controller
                  control={control}
                  name="liveTimeTo"
                  rules={rules.liveTimeTo}
                  render={({ onChange }) => (
                    <InputTime
                      placeholder="-"
                      value={moment(
                        moment(lectureDetails?.lecture_lives?.end_at).format('HH:mm'),
                        'HH:mm'
                      )}
                      onChange={(value) => {
                        setLiveTimeTo(value);
                        onChange(moment(value).format('HH:mm'));
                      }}
                      showIcon={displayIconInDateFields}
                      disabled={disableDateFields}
                    />
                  )}
                />
                <ErrorMessage
                  serverErrors={!!serverErrors?.live_time_to && rules.liveTimeTo.after}
                  errors={errors.liveTimeTo}
                />
              </div>
            </div>
          </div>

          {/* # Genre */}
          <Controller
            control={control}
            name="genreId"
            rules={rules.genreId}
            onChange={(event) => setGenreId(event.target.value)}
            render={({ onChange, value }) => (
              <SelectInput
                className="mb-px-40"
                innerClass={`border-px-2 border-adminGray-200 ${style.select}`}
                label="ジャンル"
                onChange={(event) => onChange(parseInt(event.target.value))}
                options={genreOptions}
                value={8}
                required
                disabled={true}
                changeCursor ='default'
                errorComponent={
                  <ErrorMessage
                    serverErrors={serverErrors?.genre_id}
                    errors={errors.genreId}
                  />
                }
              />
            )}
          />

          {/* # Genre2 */}
          <Controller
            control={control}
            name="genre2Id"
            rules={rules.genre2Id}
            onChange={(event) => setGenre2Id(event.target.value)}
            render={({ onChange, value }) => (
              <SelectInput
                className="mb-px-40"
                innerClass={`border-px-2 border-adminGray-200 ${style.select}`}
                label="ジャンル2"
                onChange={(event) => onChange(parseInt(event.target.value))}
                options={genreOptions.filter(option => option.value !== 8)}
                value={value}
                errorComponent={
                  <ErrorMessage
                    serverErrors={serverErrors?.genre2_id}
                    errors={errors.genre2Id}
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
                key="level"
                name="level"
                onChange={(event) => onChange(parseInt(event.target.value))}
                value={value}
                options={levelOptions}
                required
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
        </div>

        {/* # Title */}
        <div className="mb-px-40">
          <p className="text-adminGray-400 text-12 font-bold mb-px-8">
            タイトル <span className="text-adminRed-400">*</span>
          </p>
          <input
            type="text"
            name="title"
            ref={register(rules.title)}
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
          />
          <ErrorMessage serverErrors={serverErrors?.title} errors={errors.title} />
        </div>

        {/* # Theme */}
        <div className="mb-px-40">
          <p className="text-adminGray-400 text-12 font-bold mb-px-8">小テーマ</p>
          <input
            type="text"
            name="subtopic"
            ref={register(rules.subtopic)}
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
          />
          <ErrorMessage serverErrors={serverErrors?.subtopic} errors={errors.subtopic} />
        </div>

        {/* # Teachers Name */}
        <div>
          <p className="text-adminGray-400 text-12 font-bold mb-px-8">
            講師の先生の名前 <span className="text-adminRed-400">*</span>
          </p>
          <div className="flex flex-col">
            <Hint options={hintData} allowTabFill>
              <input
                type="text"
                name="teacher1"
                ref={register(
                  teach2 || teach3 ? { required: false } : { ...rules.teacher }
                )}
                onChange={(event) => {
                  setValue('teacher1', event.target.value ?? '');
                  setTeacher1(event.target.value);
                }}
                onChange={(event) => setTeacher1(event.target.value)}
                className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
              />
            </Hint>
            <Hint options={hintData} allowTabFill>
              <input
                type="text"
                name="teacher2"
                ref={register(rules.optionalTeacher)}
                onChange={(event) => {
                  setValue('teacher2', event.target.value ?? '');
                  setTeacher2(event.target.value);
                }}
                className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
              />
            </Hint>
            <Hint options={hintData} allowTabFill>
              <input
                type="text"
                name="teacher3"
                ref={register(rules.optionalTeacher)}
                onChange={(event) => {
                  setValue('teacher3', event.target.value ?? '');
                  setTeacher3(event.target.value);
                }}
                className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
              />
            </Hint>
            <ErrorMessage
              show={!doesTeacherHasAnyValue}
              serverErrors={serverErrors?.teachers}
              errors={errors.teacher1}
            />
          </div>
        </div>

        {/* # Tags */}
        <Tags
          defaultValues={lectureDetails.lectures_tags.map(
            (data) => data.lecture_meta_tag.name
          )}
          {...tagsProps}
        />

        {/* # Thumbnail */}
        <ThumbnailSection
          file={image}
          lectureDetails={lectureDetails}
          onClick={(e) => {
            e.preventDefault();
            setShowUploadModal('image');
          }}
          setImage={setImage}
          setValue={setValue}
          setShowDiscardModal={setShowDiscardModal}
        />
        <input
          type="text"
          name="image"
          defaultValue={image}
          className="hidden"
          ref={register(rules.image)}
        />
        <ErrorMessage
          show={!image}
          serverErrors={serverErrors?.image}
          errors={errors.image}
        />
        {/* # Summary */}
        <div className="my-px-40">
          <p className="text-adminGray-400 text-12 font-bold mb-px-6">概要テキスト</p>

          <textarea
            style={{ height: '504px', width: '582px' }}
            className={`m-w-full text-14 leading-px-24 rounded-px-2 font-normal border-px-2 border-adminGray-200 text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none`}
            cols="80"
            name="content"
            id="content"
            defaultValue={lectureDetails?.description}
            name="description"
            ref={register(rules.description)}
          />
          <ErrorMessage
            serverErrors={serverErrors?.description}
            errors={errors.description}
          />
        </div>

        {/* # URL */}
        <div className="mb-px-40">
          <p className="text-adminGray-400 text-12 font-bold mb-px-8">
            URL <span className="text-adminRed-400">*</span>
          </p>
          <input
            type="text"
            name="url"
            ref={register(rules.url)}
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
          />
          <ErrorMessage serverErrors={serverErrors?.url} errors={errors.url} />
        </div>
        <div className="mb-px-80">
          <Button
            innerClass={`${!isSubmittedToApi && 'cursor-pointer'} ${style.button}`}
            type="blue-square"
            disabled={isSubmittedToApi ? true : false}
            onClick={handleSubmit(handleSumbitToApi)}
          >
            {isSubmittedToApi ? '登録中...' : '登録'}
          </Button>
        </div>

        <div className="mb-px-40">
          <Button
            innerClass={`bg-primary-500 ${style.convertButton} ${
              isConvertButtonIsDisabled() ? style.cursorDefault : 'cursor-pointer'
            }`}
            type="blue-square"
            disabled={isConvertButtonIsDisabled()}
            onClick={() => setIsShowConvertModal(true)}
          >
            オンデマンド授業に変更
          </Button>
        </div>
      </BoardComponent>
      <div className="pb-px-40"></div>
    </Fragment>
  );
};

export default BasicInfoSection;
