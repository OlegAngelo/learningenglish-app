import React, { Fragment, useState } from 'react';

import Modal from '../../../../../../../shared/Modal/Modal';
import CloseIcon from '../../../../../../../shared/icons/CloseIcon';
import SlowMotionIcon from '../../../../../../../shared/icons/SlowMotionIcon';
import DoneIcon from '../../../../../../../shared/icons/DoneIcon';
import playBackRateOptions from '../../../../../../../config/playBackRateOptions.json';

import style from './OptionModal.module.css';

const OptionModal = ({ closeModal, speed, speedOnChangeHandler }) => {
  const [showSpeedModal, setShowSpeedModal] = useState(false);

  const getCheckFragment = (flag) => {
    return flag ? (
      <DoneIcon className="mr-px-20" />
    ) : (
      <div className="h-px-19 w-px-24 mr-px-20" />
    );
  };

  return (
    <Fragment>
      <Modal
        className="z-40"
        outerClassname={style.modal}
        isClearIconShow={false}
        key="optionmodal"
      >
        <div className="flex flex-col w-full pt-px-15 pb-px-6 border-b border-basic-300">
          {!showSpeedModal && (
            <div
              className="flex items-center hover:bg-adminGray-100 cursor-pointer py-px-12 px-px-16"
              onClick={() => setShowSpeedModal(true)}
            >
              <SlowMotionIcon className="mr-px-20" color="#141414" />
              <p className="text-15 text-basic-100">
                再生速度 <span className="text-basic-300 ml-px-3">{speed}</span>
              </p>
            </div>
          )}

          {showSpeedModal && playBackRateOptions.map((option, key) => {
            return (
              <div
                className={`flex items-center hover:bg-adminGray-100 cursor-pointer py-px-12 px-px-16`}
                onClick={() => speedOnChangeHandler(option)}
                key={key}
              >
                {getCheckFragment(speed === option.name)}
                <p className="text-15 text-basic-100">{option.name}</p>
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
    </Fragment>
  );
};

export default OptionModal;
