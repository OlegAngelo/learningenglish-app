import React, { Fragment } from 'react';

import styles from './Alert.module.css';

import { IsFromAdminHelper } from '../../utils/IsFromAdminHelper';

const Alert = ({
  show = false,
  callBack = () => {},
  closeModalFunc = () => {},
  zIndex = 20,
  msg = '筋トレを途中終了しますか？ \n 一時保存はされません',
  option = 1,
  customOption = null,
  className = '',
}) => {
  const isFromAdmin = IsFromAdminHelper();

  if (!show) return null;

  return (
    <Fragment>
      <div
        className="fixed top-0 right-0 h-full w-full bg-background-modal"
        onClick={closeModalFunc}
        style={{ zIndex }}
      />

      <div
        className="fixed top-0 right-0 h-full w-full flex items-center pointer-events-none justify-center"
        style={{ zIndex }}
      >
        <div
          className={`
            relative ${isFromAdmin? 'w-1/2' :' w-full'} mx-px-32 flex flex-col items-center
            pointer-events-auto shadow-modal ${styles.alertBg} ${className}
          `}
          style={{ borderRadius: "14px 14px 14px 14px" }}
        >
          <span
            className="font-sf-pro-text text-17 py-px-20 text-center whitespace-pre-line"
            style={{ color: "#000000", lineHeight: "22px" }}
          >
            {msg}
          </span>
          <div className="flex w-full">
            {
              option === 2 && (
                <button
                  onClick={closeModalFunc}
                  className="text-17 font-bold py-px-12 w-1/2 h-12 text-center"
                  style={{
                    color: "#007AFF",
                    borderTop: "1px solid #CACACA",
                    borderRight: "1px solid #CACACA"
                  }}
                >
                  いいえ
                </button>
            )}
            <button
              onClick={callBack}
              className={`${option === 1 ? 'w-full':'w-1/2'} text-17 font-bold py-px-12 h-12 text-center ${customOption !== null && customOption.className}`}
              style={{
                color: "#007AFF",
                borderTop: "1px solid #CACACA"
              }}
            >
              {customOption !== null ? customOption.message  : 'はい'}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Alert;
