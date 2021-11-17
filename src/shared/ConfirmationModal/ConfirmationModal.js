import React from 'react';
import Button from '../Button/Button';

import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ showConfirmationModal, setShowConfirmationModal, message, cancelText='キャンセル', submitText='ページを移動' , onSubmit }) => {
  if (showConfirmationModal) {
    return (
      <div className="flex justify-center top-0 left-0 bottom-0 right-0 fixed z-30">
        <div className="bg-black opacity-50  top-0 left-0 bottom-0 right-0 fixed w-full h-full font-hiragino"></div>
        <div className={`absolute bg-white ${styles.modalCard}`}>
          <div
            className={`text-16 font-theme-regular pb-px-44 ${styles.modalCardDescription}`}
          >
            {message}
          </div>
          <div className="flex justify-end mt-6 mr-6">
            <Button
              type="gray-square-outline"
              innerClass="cursor-pointer"
              onClick={() =>
                setShowConfirmationModal((prevShowModal) => !prevShowModal)
              }
            >
              {cancelText}
            </Button>
            <Button
              className="ml-px-16"
              innerClass="cursor-pointer"
              type="blue-square"
              onClick={onSubmit}
            >
              {submitText}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ConfirmationModal;
