import React from 'react';
import { useParams } from 'react-router';

import Button from '../../../../../../shared/Button/Button';
import ImageFilterIcon from '../../../../../../shared/icons/ImageFilterIcon';

import BoardComponent from '../BoardComponent';

const PreviewNewsSection = ({ onClick }) => {
  const newsId = useParams().id;  
  const gotoPreview = (event) => {
    const win = window.open(`/admin/news/details/${newsId}/preview`, '_blank');
    event.target.blur();
  }

  return (
    <BoardComponent>
      <h3 className="font-bold text-gray-400 text-12 leading-px-12">
        実装画面
      </h3>
      <Button
        innerClass="cursor-pointer"
        className="pt-px-16"
        type="blue-square"
        icon={<ImageFilterIcon color="white" width="18" height="18" />}
        onClick={gotoPreview}
      >
        実装画面をプレビュー
      </Button>
    </BoardComponent>
  );
};

export default PreviewNewsSection;
