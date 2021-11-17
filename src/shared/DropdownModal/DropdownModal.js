import React from 'react';

import Modal from '../Modal';
import DoneIcon from '../icons/DoneIcon';
import CloseIcon from '../icons/CloseIcon';

import style from './DropdownModal.module.css';

const DropdownModal = ({ closeModal, dropdownOnChange, selected = null, labels }) => {
  const getCheckFragment = (flag) => {
    return flag ? (
      <DoneIcon className="mr-px-20" />
    ) : (
      <div className="h-px-19 w-px-24 mr-px-20" />
    );
  };

  return (
    <Modal
      className="z-50"
      outerClassname={style.modal}
      closeModalFunc={closeModal}
      isClearIconShow={false}
    >
      <div
        className={`flex flex-col w-full border-b border-basic-300 ${style.modalContent}`}
      >
        {labels.map((label,key) => {
          return (
            <div
              className={`flex items-center hover:bg-adminGray-100 cursor-pointer ${style.option}`}
              onClick={() => dropdownOnChange(key)}
              key={key}
            >
              {getCheckFragment(parseInt(selected) === key)}
              <p className="text-15 text-basic-100">{label}</p>
            </div>
          );
        })}
      </div>

      <div
        className={`w-full px-px-16 flex items-center py-px-20 mb-px-34 hover:bg-adminGray-100 cursor-pointer`}
        onClick={closeModal}
      >
        <CloseIcon height="19" width="19" className="mr-px-20" color="#141414" />
        <p className="text-15 text-basic-100">キャンセル</p>
      </div>
    </Modal>
  );
};

export default DropdownModal;
