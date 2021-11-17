import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import ArrowBackIcon from '../../../../../../../../../shared/icons/ArrowBackIcon';
import Button from '../../../../../../../../../shared/Button';

const Header = ({ isSaveBtnDisabled, setIsSaveBtnDisabled, registerOnClick }) => {
  const { id: liveId } = useParams();
  const [saveBtnTxt, setSaveBtnTxt] = useState('登録');

  const saveBtnOnClick = () => {
    setIsSaveBtnDisabled(true);
    setSaveBtnTxt('登録中...');
    registerOnClick();
  }

  return (
    <Fragment>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <Link to={liveId ? `/admin/lectures/${liveId}/details` : '/admin/lectures'}>
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark leading-px-20 text-20 mt-px-3 font-bold">
            {liveId ? '授業編集' : 'オンデマンド授業動画を登録'}
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex items-center">
            <Button
              className="ml-px-15"
              innerClass={`px-px-34 ${!isSaveBtnDisabled && 'cursor-pointer'}`}
              type="blue-square"
              disabled={isSaveBtnDisabled}
              onClick={saveBtnOnClick}
            >
              {saveBtnTxt}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
