import React, { Fragment, useState } from 'react';
import { FileDrop } from 'react-file-drop';

import Button from '../../../../../shared/Button';
import Loading from '../../../../../shared/Loading';
import Modal from '../../../../../shared/Modal';
import ImageIcon from '../../../../../shared/icons/ImageIcon';
import HeadsetIcon from '../../../../../shared/icons/HeadsetIcon';
import InsertDriveFile from '../../../../../shared/icons/InsertDriveFile';
import UploadIcon from '../../../../../shared/icons/Upload';
import Subscription from '../../../../../shared/icons/Subscription';

import { formatBytes } from '../../../../../utils/numberHelpers';

import style from './UploadModal.module.css';

const UploadModal = ({
  fileInputRef,
  closeModal,
  uploadStatus,
  fileDrop,
  onFileInputChange,
  onTargetClick,
  title,
  icon,
  uploadDone,
  file,
  filenameClass = 'underline',
  modalStyle,
  ErrorMessages = null,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'file':
        return <InsertDriveFile />;
      case 'image':
        return <ImageIcon opacity="0.54" />;
      case 'subscription':
        return <Subscription opacity="0.54" />;
      case 'audio':
        return (
          <HeadsetIcon width="27" height="27" color="#000000" className="opacity-50" />
        );
        break;
      default:
        return <InsertDriveFile />;
    }
  };

  return (
    <Fragment>
      <Modal
        isClearIconShow={false}
        outerClassname="justify-center"
        className={`p-px-24 ${style.modal} ${ErrorMessages ? 'overflow-y-auto' : ''}`}
        style={modalStyle}
      >
        <div className="w-full">
          <div className="h-px-60">{title}</div>
          {uploadStatus === true ? (
            <div className="flex h-56 my-px-24 justify-between">
              <div className={style.containerText}>
                {getIcon()}
                <span
                  className={`ml-px-16 break-all ${filenameClass} ${style.text}`}
                >{`${file.name}`}</span>
              </div>
              <div className="text-16">{formatBytes(file.size)}</div>
            </div>
          ) : (
            <FileDrop onDrop={fileDrop}>
              {ErrorMessages && <ErrorMessages />}
              <div
                className={`bg-background-200 h-56 justify-center items-center flex flex-col ${
                  ErrorMessages ? 'mb-px-24' : 'my-px-24'
                }`}
              >
                {uploadStatus === 'uploading' ? (
                  <Loading
                    className="relative"
                    iconClass="bg-basic-300 text-basic-300"
                    height="h-7"
                  />
                ) : (
                  <UploadIcon fill="#C0C0C0" />
                )}
                <div className="font-bold text-basic-300 mt-px-10">
                  {uploadStatus === 'uploading'
                    ? 'データを読み込んでいます'
                    : 'ここにドラッグ＆ドロップ'}
                </div>
              </div>
            </FileDrop>
          )}
          <div className="flex items-center justify-between h-px-37">
            <div className="w-1/2 text-adminPrimary-400 text-sm underline">
              {!uploadStatus && (
                <FileDrop className="flex" onTargetClick={onTargetClick}>
                  <div className="cursor-pointer py-px-10">
                    またはここからファイルを選択
                  </div>
                </FileDrop>
              )}
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
            >
              キャンセル
            </Button>

            <button
              className={`min-w-px-92 rounded bg-adminPrimary-400 text-white text-12 font-bold h-px-36 px-px-16 focus:outline-none focus:bg-state-activ
                ${uploadStatus === true ? '' : 'cursor-auto opacity-30'}
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
