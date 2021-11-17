import React, { Fragment } from 'react';

import ActionInfoIcon from '../icons/ActionInfoIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import CancelIcon from '../icons/CancelIcon';

import style from './AlertModal.module.css';

const AlertModal = ({
  isShowModal = false,
  setIsShowModal,
  message = '',
  isSuccess = true,
  isInfo = false,
  buttonConfirmText = 'OK',
  buttonCancelText = 'NO',
  handleOnClickOk = () => {},
  onClickOutsideClose = true,
}) => {
  const success = '';
  const failed = '';

  const onClickOkBtn = () => {
    setIsShowModal(false);
    handleOnClickOk();
  };

  if (isShowModal) {
    return (
      <div className="flex justify-center top-0 left-0 bottom-0 right-0 fixed z-30">
        <div
          className="flex bg-black opacity-50 top-0 left-0 bottom-0 right-0 fixed w-full h-full font-hiragino"
          onClick={()=> {
            onClickOutsideClose && setIsShowModal(false)
          }}
        ></div>
        <div className={`relative self-center pt-2 pb-4 bg-white text-center ${style.modalCard}`}>
          <div className="icon">
            { isInfo ? 
              <ActionInfoIcon
                width={100}
                height={100}
                color={'#0D89EE'}
                opacity={1}
              />
              : isSuccess === true ?
                <CheckCircleIcon
                  width={100}
                  height={100}
                  color={'#4CAF50'}
                  opacity={1}
                />
              :
                <CancelIcon
                  width={100}
                  height={100}
                  color={'#F44336'}
                  opacity={1}
                />
            }
          </div>
          <p className="text-18 whitespace-pre-line">{message}</p>
          <button
            type="button"
            className="mt-4 focus:outline-none cursor-pointer cursor-auto rounded bg-adminPrimary-400 text-white text-12 font-bold h-px-36 px-px-16 focus:bg-state-active"
            onClick={()=> onClickOkBtn()}
          >
            {buttonConfirmText}
          </button>
          {isInfo && (
            <button
              type="button"
              className="mt-4 ml-px-5 focus:outline-none cursor-pointer cursor-auto rounded bg-adminGray-400 text-white text-12 font-bold h-px-36 px-px-16 focus:bg-state-active"
              onClick={()=> setIsShowModal(false)}
            >
              {buttonCancelText}
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AlertModal;
