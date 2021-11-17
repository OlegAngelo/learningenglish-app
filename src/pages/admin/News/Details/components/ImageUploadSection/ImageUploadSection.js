import React from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../../../shared/Button/Button';
import AddBoxIcon from '../../../../../../shared/icons/AddBoxIcon';

import BoardComponent from '../BoardComponent';

const ImageUploadSection = ({ file, onClick }) => {
  const { newsDetails } = useSelector(state => state.news);
  const { thumbnail_name } = newsDetails || {};

  const getFileName = () => {
    if (file.image) {
      return file.image;
    } else if (thumbnail_name) {
      return thumbnail_name;
    } else {
      return 'なし';
    }
  }

  return (
    <BoardComponent>
      <h3 className="font-bold text-gray-400 text-12 leading-px-12">
        画像ファイル
      </h3>
      <h2 className="font-normal text-12 pt-px-16 break-all">{ getFileName() }</h2>
      <Button
        className="pt-px-14"
        innerClass="cursor-pointer"
        type="blue-square"
        icon={<AddBoxIcon width="16" height="16" />}
        onClick={onClick}
      >
        画像をアップロード
      </Button>
    </BoardComponent>
  );
};

export default ImageUploadSection;
