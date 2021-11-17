import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  ccnfirmBeforeLeaving,
  hasPressOkey,
  removeConfirmDailog,
} from '../redux/confirmDialog/slice';

const useConfirmBeforeOnLeave = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { confirmBeforeLeaving } = useSelector((state) => state.confirmDialog);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const message = props?.message ?? '編集内容を破棄してページを移動しますか？';
  const whiteListDestination = props?.whiteListDestination ?? [];
  const whiteListDestinationExceptCurrent = whiteListDestination.filter(
    (e) => e !== location.pathname
  );

  const removeUnloadEvent = () => (window.onbeforeunload = null);

  useEffect(() => {
    if (showDiscardModal) dispatch(ccnfirmBeforeLeaving());

    return () => {
      dispatch(removeConfirmDailog());
      removeUnloadEvent();
    };
  }, [showDiscardModal]);

  useEffect(() => {
    window.onbeforeunload = confirmBeforeLeaving && (() => message);
  }, [confirmBeforeLeaving]);

  const handleDestination = (destination) => {
    window.history.scrollRestoration = 'manual';
    if (!confirmBeforeLeaving) return;
    if (whiteListDestinationExceptCurrent.includes(destination.pathname)) return;

    if (window.confirm(message)) {
      // when user attempts to logout
      if (destination.pathname === location.pathname) {
        dispatch(hasPressOkey());
        removeUnloadEvent();
      }
      return true;
    }
    return false;
  };

  const routerPrompt = <Prompt when={showDiscardModal} message={handleDestination} />;

  return [routerPrompt, (flag) => setShowDiscardModal(flag), () => setShowDiscardModal(false)];
};

export default useConfirmBeforeOnLeave;
