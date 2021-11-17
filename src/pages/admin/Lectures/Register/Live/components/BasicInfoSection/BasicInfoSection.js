import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import _ from 'lodash';

import SelectInput from '../../../../../../../shared/SelectInput/SelectInput.js';
import BoardComponent from '../BoardComponent';
import Button from '../../../../../../../shared/Button/Button.js';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.js';
import LectureTags from '../../../components/Tags/Tags.js';
import InputDate from '../../../../../../../shared/InputDate';
import InputTime from '../../../../../../../shared/InputTime';
import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon.js';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import ImageFilterIcon from '../../../../../../../shared/icons/ImageFilterIcon';

import useConfirmBeforeOnLeave from '../../../../../../../hooks/useConfirmBeforeOnLeave.js';

import { genreOptions, levelOptions } from '../../../../components/data';

import style from './BasicInfoSection.module.css';

import { Hint } from 'react-autocomplete-hint';
import AdminApi from '../../../../../../../api/AdminApi.js';
import { FormWrapperContext } from '../FormWrapper/FormWrapper';

const BasicInfoSection = () => {
  const { 
    props, 
    setIsShowAlertModal, 
    setIsSuccessRequest, 
    setShowUploadModal,
    control,
    register,
    handleSubmit,
    watch,
    setFormValue,
    isSaveBtnDisabled,
    saveBtnText,
    handleSubmitToApi,
    formState: { isDirty, errors }
   } = useContext(FormWrapperContext);

  const teach2 = watch('teacher2');
  const teach3 = watch('teacher3');
  const {
    publishedDate,
    publishedTime,
    liveDate,
    liveTimeFrom,
    liveTimeTo,
    image,
    tags,
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
    setImage,
    setTags
  } = props;
  const [hintData, setHintData] = useState([]);
  const [imageUrl, setImageUrl] = useState('#');
  const [prompt, setShowDiscardModal] = useConfirmBeforeOnLeave();


  const onClickUploadImage = (e) => {
    e.preventDefault();
    setShowUploadModal('image');
  };

  const getTeachers = async () => {
    const res = await AdminApi.getTeachers();
    var hintArray = [];
    res.data.map((a) => hintArray.push(a.name));
    setHintData(hintArray);
  };

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

  useEffect(() => {
    if (isDirty || image) setShowDiscardModal(true);
    else setShowDiscardModal(false);
  }, [isDirty, image]);

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
      setImageUrl(URL.createObjectURL(new Blob([image], { type: 'image/bmp' })));
    }
  }, [image]);

  return (
    <Fragment>
      <hr />
      {prompt}
      <BoardComponent>
        {/* # Published date & time */}
        <div className="mb-px-40">
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
                  setPublishedDate(value);
                  onChange(value);
                }}
                minDate={new Date()}
                value={publishedDate}
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
                value={publishedTime}
                onChange={(value) => {
                  setPublishedTime(value);
                  onChange(value);
                }}
              />
            )}
          />
          <ErrorMessage errors={errors.publishedTime} />
        </div>

        {/* # Live date & time */}
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
                className="mb-px-8"
                onChange={(value) => {
                  setLiveDate(value);
                  onChange(value);
                }}
                value={liveDate}
                minDate={new Date(publishedDate ? moment(publishedDate) : null)}
              />
            )}
          />
          <ErrorMessage
            serverErrors={!!serverErrors?.live_date && rules.liveDate.after}
            errors={errors.liveDate}
          />

          <div className="flex items-start">
            <div>
              <Controller
                control={control}
                name="liveTimeFrom"
                rules={rules.liveTimeFrom}
                render={({ onChange }) => (
                  <InputTime
                    placeholder="-"
                    value={liveTimeFrom}
                    onChange={(value) => {
                      setLiveTimeFrom(value);
                      onChange(value);
                    }}
                  />
                )}
              />
              <ErrorMessage
                serverErrors={serverErrors?.live_time_from}
                errors={errors.liveTimeFrom}
              />
            </div>
            <p className="text-12 text-adminGray-700 font-semibold mx-px-8 mt-px-10">
              〜
            </p>
            <div>
              <Controller
                control={control}
                name="liveTimeTo"
                rules={rules.liveTimeTo}
                render={({ onChange }) => (
                  <InputTime
                    placeholder="-"
                    value={liveTimeTo}
                    onChange={(value) => {
                      setLiveTimeTo(value);
                      onChange(value);
                    }}
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
          render={({ value, onChange }) => (
            <SelectInput
              className="mb-px-40"
              innerClass={`border-px-2 border-adminGray-200 ${style.select}`}
              label="ジャンル"
              onChange={onChange}
              options={genreOptions}
              value={8}
              required
              disabled
              changeCursor='default'
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
          render={({ value, onChange }) => (
            <SelectInput
              className="mb-px-40"
              innerClass={`border-px-2 border-adminGray-200 ${style.select}`}
              label="ジャンル2"
              onChange={onChange}
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
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
          />
          <ErrorMessage serverErrors={serverErrors?.title} errors={errors.title} />
        </div>

        {/* # Theme / Subtopic */}
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
        <div className="mb-px-40">
          <p className="text-adminGray-400 text-12 font-bold mb-px-8">
            講師の先生の名前 <span className="text-adminRed-400">*</span>
          </p>

          <Hint options={hintData} allowTabFill>
            <input
              type="text"
              name="teacher1"
              ref={register(
                teach2 || teach3 ? { required: false } : { ...rules.teacher }
              )}
              onChange={(event) => setTeacher1(event.target.value)}
              className={`bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
            />
          </Hint>
          <Hint options={hintData} allowTabFill>
            <input
              type="text"
              name="teacher2"
              ref={register(rules.optionalTeacher)}
              onChange={(event) => setTeacher2(event.target.value)}
              className={` bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
            />
          </Hint>
          <Hint options={hintData} allowTabFill>
            <input
              type="text"
              name="teacher3"
              ref={register(rules.optionalTeacher)}
              onChange={(event) => setTeacher3(event.target.value)}
              className={` bg-adminGray-50 mb-px-8 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
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
          <p className="text-adminGray-400 text-12 font-bold mb-px-16">
            サムネイル画像 <span className="text-adminRed-400">*</span>
          </p>
          <div className="flex items-center mb-px-14">
            <p className="text-basic-100 text-12 mr-px-20 break-all">
              {image ? image.name : 'なし'}
            </p>
            {image && (
              <DeleteIcon className="cursor-pointer" onClick={() => setImage('')} />
            )}
          </div>

          <div className="flex">
            {image && (
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
              onClick={(e) => onClickUploadImage(e)}
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

        {/* # Summary */}
        <div className="mb-px-40">
          <p className="text-adminGray-400 text-12 font-bold mb-px-6">概要テキスト</p>

          <textarea
            style={{ height: '504px', width: '582px' }}
            className="m-w-full text-14 leading-px-24 font-normal text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none border-px-2 border-adminGray-w00 rounded-px-2"
            cols="80"
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

        {/* # Handouts */}
        {/* <div className="mb-px-40">
          <p className="text-base-dark text-18 font-bold mb-px-16">配布物</p>
          <p className="text-adminGray-400 text-12 font-bold mb-px-14">資料</p>

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
            innerClass={`${!isSaveBtnDisabled && 'cursor-pointer'} px-px-34 ${style.button}`}
            type="blue-square"
            onClick={handleSubmit(handleSubmitToApi)}
            disabled={isSaveBtnDisabled}
          >
            {saveBtnText}
          </Button>
        </div>
      </BoardComponent>
    </Fragment>
  );
};

export default BasicInfoSection;
