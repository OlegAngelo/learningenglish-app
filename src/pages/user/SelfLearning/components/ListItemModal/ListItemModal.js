
import React from 'react';
import { useHistory } from 'react-router';

import Modal from '../../../../../shared/Modal';
import ClockIcon from '../../../../../shared/icons/ClockIcon';
import Button from '../../../../../shared/Button';

const ListItemModal = ({ 
  minutesLeft, 
  showModal, 
  setShowModal, 
  redirectToLink, 
  redirectToLabel, 
  isClearIconShow = false 
}) => {
  
  const history = useHistory();

  return showModal ? (
    <Modal
      className="p-px-16 mx-px-16 font-hiragino"
      closeModalFunc={() => setShowModal(false)}
      isClearIconShow={isClearIconShow}
    >
      <div className="pt-px-24 text-14 font-bold text-primary-200">timer</div>
      <div className="pt-px-6 pb-px-22"><ClockIcon /></div>
      <div className="font-bold text-16 text-basic-100">あと<span className="text-20">{minutesLeft}</span>分で再挑戦できます</div>
      <div className="pt-px-16 text-14 text-basic-100 text-center pb-px-24">
        <div>学習効果を高めるため、</div>
        <div>再挑戦までに時間を空けています</div>
      </div>

      {!redirectToLink || <Button
        className="my-4"
        type="gray-square-outline"
        onClick={() => history.push(redirectToLink) }
      >
        <span className="text-14 text-primary-500 font-bold">{redirectToLabel}</span>
      </Button>
      }
    </Modal>
  ) : null;
};

export default ListItemModal;
