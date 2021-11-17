import React, {Fragment, useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';

import Modal from '../../../../../../shared/Modal/Modal';

import style from './PlaySpeedModal.module.css'
import SlowMotionIcon from '../../../../../../shared/icons/SlowMotionIcon';
import CloseIcon from '../../../../../../shared/icons/CloseIcon';
import SpeedModal from '../../../../News/Details/components/SpeedModal/SpeedModal';

import usePlayerSpeed from '../../../../../../hooks/usePlayerSpeed';
import { setPlaybackRate } from '../../../../../../redux/userLectureDetails/slice';

const PlaySpeedModal = ({show, onCloseModalHandler}) => {
  const dispatch = useDispatch();

  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [speed, speedHandler] = usePlayerSpeed();

  // Event Handlers
  const speedOnChangeHandler = (option) => {
    speedHandler(option);
    onCloseModalHandler(false);
    setShowSpeedModal(false);
    dispatch(setPlaybackRate(option.value));
  };

  return (
    <Fragment>
      {show && (
        <Fragment>
          <Modal
            className="z-40"
            outerClassname={`${style.modal}`}
            isClearIconShow={false}
            key="optionmodal"
          >
            <div className="flex flex-col w-full pt-px-15 pb-px-6 border-b border-basic-300">
                <div
                  className="flex items-center hover:bg-adminGray-100 cursor-pointer py-px-12 px-px-16"
                  onClick={() => setShowSpeedModal(true)}
                >
                  <SlowMotionIcon className="mr-px-20" color="#141414" />
                  <p className="text-15 text-basic-100">
                    再生速度 <span className="text-basic-300 ml-px-3">{speed}</span>
                  </p>
                </div>
            </div>

            <div
              className={`w-full px-px-16 flex items-center py-px-20 mb-px-34 hover:bg-adminGray-100 cursor-pointer`}
              onClick={() => onCloseModalHandler(false)}
            >
              <CloseIcon height="19" width="19" className="mr-px-20" color="#141414" />
              <p className="text-15 text-basic-100">キャンセル</p>
            </div>
          </Modal>

          {showSpeedModal && (
            <SpeedModal
              selected={speed}
              closeSpeedModal={() => setShowSpeedModal(false)}
              speedOnChangeHandler={speedOnChangeHandler}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PlaySpeedModal;
