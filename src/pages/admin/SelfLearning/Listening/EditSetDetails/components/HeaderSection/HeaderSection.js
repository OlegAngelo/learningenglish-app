import React, { Fragment } from 'react';
import { useHistory } from 'react-router';

import Button from '../../../../../../../shared/Button/Button';
import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';

const HeaderSection = ({
  handleUploadAudioSubmit,
  onClickSubmit,
  isFetchingPhraseData,
  isSubmittedToApi,
  isFetchingAudioData,
}) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54">
        <div className="flex">
          <div onClick={history.goBack} className="cursor-pointer">
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </div>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
            詳細
          </span>
        </div>
        {(!isFetchingPhraseData) && (
          <div className="pr-px-24">
            <div className="flex items-center">
              <Button
                className="m-3"
                innerClass="px-px-34"
                type="blue-square"
                disabled={isSubmittedToApi || isFetchingAudioData}
                onClick={onClickSubmit}
              >
                登録
              </Button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default HeaderSection;
