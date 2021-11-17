import React, { useState, useEffect } from 'react';

import Button from '../../../../../shared/Button/Button';
import InputDate from '../../../../../shared/InputDate';
import Modal from '../../../../../shared/Modal/Modal';
import UploadIcon from '../../../../../shared/icons/Upload';
import ExpandMoreIcon from '../../../../../shared/icons/ExpandMoreIcon';
import ExpandLessIcon from '../../../../../shared/icons/ExpandLessIcon';

import style from './DownloadModal.module.css';

const DownloadModal = ({
  closeDownloadModal,
  submitOnClick,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  downloadErrors,
}) => {
  const [errors, setErrors] = useState([]);
  const [canDownload, setCanDownload] = useState(false);
  const [expandErrors, setExpandErrors] = useState(false);

  useEffect(() => {
    if (downloadErrors) setErrors({ header: downloadErrors.error });
  }, [downloadErrors]);

  useEffect(() => {
    if (!startDate || !endDate) setCanDownload(false);
    else if (startDate > endDate) setCanDownload(false);
    else setCanDownload(true);
  }, [startDate, endDate]);

  const submitOnClickHandler = (params) => {
    if (canDownload) {
      submitOnClick();
    }
  };

  const renderErrors = (params) => {
    if (!errors.header) return;

    return (
      <div className={`w-full rounded mb-px-15 border ${style.error}`}>
        {errors.header && (
          <div
            className={`py-px-5 px-px-10 text-12 flex justify-between items-center cursor-pointer ${style.errorHeader}`}
            onClick={() => setExpandErrors(!expandErrors)}
          >
            <p className="text-12">{errors.header}</p>
            {errors.data?.length &&
              (expandErrors ? (
                <ExpandLessIcon height="9" width="9" />
              ) : (
                <ExpandMoreIcon height="9" width="9" />
              ))}
          </div>
        )}
        {errors.data?.length && (
          <div>
            {errors.data.map((data) => {
              return <div className="text-12 py-px-2 px-px-10 border-t">{data}</div>;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      isClearIconShow={false}
      outerClassname="justify-center"
      className={`p-px-24 ${style.modal} ${
        !!errors.data?.length ? 'overflow-y-auto' : ''
      }`}
    >
      <div className="w-full">
        <div className="h-12">出力する記事の掲載された期間を選択してください</div>
        <div>
          {renderErrors()}
          <div
            className={`h-56 flex flex-col ${
              !!errors.data?.length ? 'mb-px-24' : 'my-px-24'
            }`}
          >
            <p className="text-12 font-bold text-adminGray-400 mb-px-8">掲載期間</p>

            <div className="flex items-center">
              <InputDate className="mb-px-8" onChange={(value) => setStartDate(value)} value={startDate} />
              <p className="text-12 text-adminGray-400 font-bold ml-px-8">から</p>
            </div>
            <div className="flex items-center">
              <InputDate className="mb-px-8" onChange={(value) => setEndDate(value)} value={endDate} />
              <p className="text-12 text-adminGray-400 font-bold ml-px-8">までの期間</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 mr-px-8 mb-px-4">
          <div className="flex items-center justify-end">
            <Button
              innerClass="cursor-pointer min-w-px-92"
              onClick={closeDownloadModal}
              type="gray-square-outline"
            >
              キャンセル
            </Button>

            <button
              className={`min-w-px-92 rounded bg-adminPrimary-400 text-white text-12 font-bold h-px-36 px-px-16 focus:outline-none focus:bg-state-activ
                ml-px-18 ${!canDownload ? 'opacity-30 cursor-auto' : 'cursor-pointer'}
              `}
              onClick={submitOnClickHandler}
            >
              エクセルで出力
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
