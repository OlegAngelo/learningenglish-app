import React, { Fragment, useState, useEffect } from 'react';

import Button from '../../../../../../../shared/Button';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import ImageFilterIcon from '../../../../../../../shared/icons/ImageFilterIcon';
import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon';
import LectureTags from '../../../../Register/components/Tags';

import useUploadFile from '../../../../components/hooks/useUploadFile';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import UploadModal from '../../../../components/UploadModal/UploadModal';

const UploadSection = ({
  props,
}) => {
  const {
    rules,
    serverErrors,
    initialTags,
    tags,
    image,
    description,
    setTags,
    setDescription,
    setImage,
    setRawFile,
    register,
    errors,
    setValue: setFormValue,
    handleSubmit,
    onSubmit,
    isSubmittedToApi,
  } = props;
  const [imageUrl, setImageUrl] = useState('#');
  const removeImage = () => {
    setImage('');
    setRawFile(null);
  };

  const handleOnClickUpload = (file) => {
    setImage(file);
    setRawFile(file);
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
    defaultValues: initialTags,
    rules,
    serverErrors,
    errors,
    setTags,
    register,
    setFormValue,
  };

  useEffect(() => {
    const imageFile = image.file ?? image;
    setImageUrl(URL.createObjectURL(new Blob([imageFile], { type: 'image/bmp' })));
  }, [image]);
  
  return (
    <Fragment>
      {showUploadModal && (
        <UploadModal
          title="画像データをアップロードしてください"
          icon="image"
          file={file[showUploadModal]}
          {...modalProps}
        />
      )}
      <LectureTags {...tagsProps} />

      {/* # Thumbnail */}
      <div className="mb-px-40 flex flex-col">
        <p className="text-adminGray-400 text-12 font-bold mb-px-8">
          サムネイル画像 <span className="text-adminRed-400">*</span>
        </p>
        <div className="flex items-center mb-px-16">
          <p className="text-basic-100 text-12 mr-px-20 break-all">
            {image ? image.name : 'なし'}
          </p>
          {image && (
            <DeleteIcon
              className="ml-px-16 cursor-pointer"
              onClick={removeImage}
            />
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
            onClick={(e) => {
              e.preventDefault();
              setShowUploadModal('image');
            }}
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
        <p className="text-adminGray-400 text-12 font-bold mb-px-6">
          概要テキスト
        </p>

        <textarea
          style={{ height: '504px', width: '582px' }}
          className="m-w-full text-14 leading-px-24 font-normal rounded-px-2 border-px-2 border-adminGray-200 text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none"
          cols="80"
          name="description"
          value={description}
          ref={register(rules.description)}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      {/* # Handouts */}
      {/* <div className="mb-px-40 flex flex-col">
        <p className="text-base-dark text-18 font-bold mb-px-16">配布物</p>
        <p className="text-adminGray-400 text-12 font-bold mb-px-16">
          資料
        </p>
        <div className="flex items-center mb-px-16">
          <p>Document.pdf</p> 
          <DeleteIcon className="ml-px-16 cursor-pointer" />
        </div>
        <div className="flex">
          <Button
            innerClass="cursor-pointer"
            className="mr-px-16"
            type="blue-square"
            icon={<ImageFilterIcon color="white" width="18" height="18" />}
            onClick={(e) => e.target.blur()}
          >
            資料をプレビュー
          </Button>

          <Button
            innerClass="cursor-pointer"
            type="blue-square"
            icon={<AddBoxIcon width="16" height="16" />}
            onClick={(e) => e.target.blur()}
          >
            資料をアップロード
          </Button>
        </div>
      </div> */}

      <div className="mb-px-40">
        <Button
          innerClass={`px-px-34 ${!isSubmittedToApi && 'cursor-pointer'}`}
          type="blue-square"
          disabled={isSubmittedToApi ? true : false}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmittedToApi ? '登録中...' : '登録'}
        </Button>
      </div>
    </Fragment>
  );
};

export default UploadSection;
