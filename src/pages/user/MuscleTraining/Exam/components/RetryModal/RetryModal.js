import React, {Fragment, useState, useEffect} from 'react';

// Component
import Content from './Content';
import Modal from '../../../../../../shared/Modal';

// API
import QuestionApi from '../../../../../../api/QuestionApi'

// This is a Container Component
const RetryModal = ({isOpen, onClose, userPreference}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handler = () => {
    let showInstructionModalFlag;
    let showLrListenTutorial;
    let showRetryModalFlag = isChecked ? '1' : '0';

    if (!userPreference[0]) {
      showInstructionModalFlag = 1
      showLrListenTutorial = 1
    } else {
      showInstructionModalFlag = userPreference[0].show_utterance_tutorial ?? 1
      showLrListenTutorial = userPreference[0].show_lr_listen_tutorial ?? 1

    }

    QuestionApi.savePreference(showInstructionModalFlag, showRetryModalFlag, showLrListenTutorial)
    setIsChecked(!isChecked)
  };

  return (
    <Fragment>
      { isOpen && (
        <Modal
          className="mx-px-16 px-px-16 py-px-22"
          closeModalFunc={onClose}
        >
          <Content
            handleOnClick={() => {
              handler()
            }}
            isChecked={isChecked}
          />
        </Modal>
      )}
    </Fragment>
  )
}

export default RetryModal;
