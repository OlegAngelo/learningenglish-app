import React, { Fragment } from 'react';

import AlertModal from '../../../../../../../shared/AlertModal';
import Button from '../../../../../../../shared/Button';
import UploadModal from '../../../../components/UploadModal';
import UploadLoading from '../../../../../News/components/UploadLoading';
import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon';

import { getJPTranslatedForAlert, getJPTranslatedMessages } from './computed';

import useUploadListening from '../../../../hooks/useUploadListening';

const UploadSection = (props) => {
  const {
    importOnClickHandler,
    setIsShowAlertResultModal,
    isShowUploadModal,
    isShowAlertResultModal,
    uploadModalProps,
    uploadResult,
    isShowModalPercentage,
    uploadPercentage,
  } = useUploadListening({ getJPTranslatedForAlert, getJPTranslatedMessages });

  return (
    <Fragment>
      <Button
        innerClass="cursor-pointer"
        type="blue-square"
        icon={<AddBoxIcon width="16" height="16" />}
        onClick={importOnClickHandler}
      >
        問題をアップロード
      </Button>

      {isShowUploadModal && <UploadModal {...uploadModalProps} />}

      <AlertModal
        isShowModal={isShowAlertResultModal}
        setIsShowModal={setIsShowAlertResultModal}
        isSuccess={uploadResult.is_success}
        message={uploadResult.message}
      />

      {isShowModalPercentage && <UploadLoading percentage={uploadPercentage} />}
    </Fragment>
  );
};

export default UploadSection;
