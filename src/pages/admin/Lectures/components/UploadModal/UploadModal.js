import React, { Fragment, useState } from 'react';
import { FileDrop } from 'react-file-drop';

import Button from '../../../../../shared/Button/Button';
import Loading from '../../../../../shared/Loading/Loading';
import Modal from '../../../../../shared/Modal/Modal';
import Upload from '../../../../../shared/icons/Upload';
import ImageIcon from '../../../../../shared/icons/ImageIcon';
import InsertDriveFile from '../../../../../shared/icons/InsertDriveFile';
import ExpandLessIcon from '../../../../../shared/icons/ExpandLessIcon';
import ExpandMoreIcon from '../../../../../shared/icons/ExpandMoreIcon';
import { formatBytes } from '../../../../../utils/numberHelpers';

import style from './UploadModal.module.css';

const UploadModal = ({
  file,
  icon,
  title,
  uploadStatus,
  fileDrop,
  onTargetClick,
  closeModal,
  fileInputRef,
  onFileInputChange,
  uploadDone,
  errors,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const getIcon = () => {
    switch (icon) {
      case 'image':
        return <ImageIcon opacity="0.54" />;
      default:
        return <InsertDriveFile />;
    }
  };

  const renderErrors = (params) => {
    if (!errors.data.length) return;

    return (
      <div className={`w-full rounded mb-px-15 border ${style.error}`}>
        {errors.header && (
          <div
            className={`py-px-5 px-px-10 text-12 flex justify-between items-center cursor-pointer ${style.errorHeader}`}
            onClick={() => setShowErrors(!showErrors)}
          >
             <p className="text-12">{errors.header}</p>
             {errors.validExcelFile &&
              (showErrors ? (
                <ExpandLessIcon height="9" width="9" />
              ) : (
                <ExpandMoreIcon height="9" width="9" />
              ))}
          </div>
        )}
        {(!errors.header || showErrors) && (errors.validExcelFile) && (
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
    <Fragment>
      <Modal
        isClearIconShow={false}
        outerClassname="justify-center"
        className={`p-px-24 ${style.modal}`}
      >
        <div className="w-full">
          <div className="h-px-60">{title}</div>
          { uploadStatus === true ? (
            <div className={`flex ${style.upload} my-px-24 justify-between`}>
              <div className={style.containerText}>
                <div>{getIcon()}</div>
                <div className={`ml-px-16 break-all underline ${style.text}`}>{file.name}</div>
              </div>
              <div className="text-16">{formatBytes(file.size)}</div>
            </div>
          ) : (
            <FileDrop
              onDrop={fileDrop}
            >
              {renderErrors()}
              <div className={`bg-background-200 ${style.upload} justify-center items-center flex flex-col my-px-24`}>
                { uploadStatus === 'uploading' ? (
                  <Loading
                    className="relative"
                    iconClass="bg-basic-300 text-basic-300"
                    height="h-7"
                  />
                ) : (
                  <Upload fill="#C0C0C0"/>
                )}
                <div className="font-bold text-basic-300 mt-px-10">{ uploadStatus === 'uploading' ? 'データを読み込んでいます' : 'ここにドラッグ＆ドロップ' }</div>
              </div>
            </FileDrop>
          )}
          <div className="flex items-center justify-between">
            <div className="w-1/2 text-adminPrimary-400 text-sm underline">
              { !uploadStatus && 
                <FileDrop
                  className="flex"
                  onTargetClick={onTargetClick}
                >
                  <div className="cursor-pointer py-px-8">またはここからファイルを選択</div>
                </FileDrop>
              }
            </div>
            <input
              onChange={onFileInputChange}
              ref={fileInputRef}
              type="file"
              className="hidden"
            />
            <Button
              innerClass="cursor-pointer min-w-px-92"
              onClick={closeModal}
              type="gray-square-outline"
            >キャンセル</Button>
            
            <button
              className={`min-w-px-92 rounded bg-adminPrimary-400 text-white text-12 font-bold h-px-36 px-px-16 focus:outline-none focus:bg-state-activ
                ${uploadStatus === true? '' : 'cursor-auto opacity-30'}
              `}
              type="button"
              onClick={uploadDone}
            >
              アップロード
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default UploadModal;
