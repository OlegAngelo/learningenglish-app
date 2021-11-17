import React, { Fragment, useState, useEffect, useContext } from 'react';

import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon';
import ImageFilterIcon from '../../../../../../../shared/icons/ImageFilterIcon';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import Button from '../../../../../../../shared/Button';
import LectureApi from '../../../../../../../api/LectureApi';

import { FormWrapperContext } from '../FormWrapper/FormWrapper';

const ThumbnailSection = ({
  file,
  onClick,
  setImage,
  setValue,
  setDirty = () => {}
}) => {
  const { lectureDetails } = useContext(FormWrapperContext);
  const { thumbnail_name, thumbnail } = lectureDetails || {};
  const [imageUrl, setImageUrl] = useState('#');
  const [fileName, setFilename] = useState('');

  const updateFilename = () => {
    setFilename(file.name ?? thumbnail_name);
  };

  useEffect(() => {
    updateFilename();
  }, []);

  useEffect(() => {
    if (!!file) {
      setImageUrl(URL.createObjectURL(new Blob([file], { type: 'image/bmp' })));
      setValue('image', file.name, { shouldDirty: false });
      updateFilename();
    }
  }, [file]);

  useEffect(() => {
    LectureApi.fetchImage(thumbnail).then((res) => {
      setImageUrl(
        URL.createObjectURL(new Blob([res.data], { type: 'image/bmp' }))
      );
    });
  }, [thumbnail]);

  const onDeleteThumbnail = () => {
    setImage('');
    setValue('image', '', { shouldDirty: false });
    setFilename('');
    setDirty(true);
  };

  return (
    <Fragment>
      <div>
        <p className="text-adminGray-400 text-12 font-bold mb-px-16">
          サムネイル画像 <span className="text-adminRed-400">*</span>
        </p>
        <div className="flex items-center mb-px-14">
          <p className="text-basic-100 text-12 mr-px-20 break-all">
            {fileName || 'なし'}
          </p>
          {fileName && (
            <DeleteIcon
              className="cursor-pointer"
              onClick={() => onDeleteThumbnail()}
            />
          )}
        </div>

        <div className="flex">
          {fileName && (
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
            onClick={onClick}
          >
            画像をアップロード
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ThumbnailSection;
