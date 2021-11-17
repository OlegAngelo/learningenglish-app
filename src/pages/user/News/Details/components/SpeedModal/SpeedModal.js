import React from 'react';

import Modal from '../../../../../../shared/Modal/Modal';
import CloseIcon from '../../../../../../shared/icons/CloseIcon';
import DoneIcon from '../../../../../../shared/icons/DoneIcon';

import style from './SpeedModal.module.css';

const SpeedModal = ({ closeSpeedModal, selected, speedOnChangeHandler }) => {
  const options = [
    { name: '0.8x', value: 0.8 },
    { name: '標準', value: 1},
    { name: '1.2x', value: 1.2},
    { name: '1.5x', value: 1.5}
  ];

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
      isClearIconShow={false}
      hasBackgroundShadow={false}
      key="speed-modal"
    >
      <div className="flex flex-col w-full pt-px-15 pb-px-6 border-b border-basic-300">
        {options.map((option, key) => {
          return (
            <div
              className={`flex items-center hover:bg-adminGray-100 cursor-pointer py-px-12 px-px-16`}
              onClick={() => speedOnChangeHandler(option)}
              key={key}
            >
              {getCheckFragment(selected === option.name)}
              <p className="text-15 text-basic-100">{option.name}</p>
            </div>
          );
        })}
      </div>

      <div
        className={`w-full px-px-16 flex items-center py-px-20 mb-px-34 hover:bg-adminGray-100 cursor-pointer`}
        onClick={closeSpeedModal}
      >
        <CloseIcon height="19" width="19" className="mr-px-20" color="#141414" />
        <p className="text-15 text-basic-100">キャンセル</p>
      </div>
    </Modal>
  );
};

export default SpeedModal;
