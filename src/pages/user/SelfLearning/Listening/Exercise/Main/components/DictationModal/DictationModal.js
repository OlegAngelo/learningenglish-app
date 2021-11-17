import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import questionApi from "../../../../../../../../api/QuestionApi";

import Modal from "../../../../../../../../shared/Modal/Modal";
import ShadowingIcon from "../../../../../../../../shared/icons/ShadowingIcon";
import Checkbox from "../../../../../../../../shared/GreenCheckbox";
import DictationIcon from "../../../../../../../../shared/icons/DictationIcon";
import ReadAloudIcon from "../../../../../../../../shared/icons/ReadAloudIcon";
import ArrowNext from "../../../../../../../../shared/icons/ArrowNext";

import style from "./DictationModal.module.css";

const DictationModal = () => {
  const { preferences } = useSelector((state) => state.userPreferences);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const textJa = {
    listening_learning_procedure: "Listeningの学習手順",
    shadowing: "シャドーイング",
    dictation: "ディクテーション",
    read_the_answer_aloud: "解答を音読",
    can_be_skipped: "skip可能",
    evaluation_target: "評価対象",
    read_aloud: "音読",
    speak_and_understand_outline_of_voice: "発声して音声の概要を理解",
    accurately_input_the_voice_you_hear: "聞き取った音声を正確に入力",
    check_sound_mainly_in_parts_you_cant_hear:
      "聞き取れなかった箇所を中心に音を確認",
    shadowing_and_reading_aloud_can_be_skipped:
      "シャドーイングと音読はスキップ可能です",
    will_not_be_displayed_next_time: "次回から表示しない",
  };

  const onCloseHandler = () => {
    setIsShowModal(false);
  };

  const toggleCheckbox = () => {
    let showRetryModal;
    let showUtteranceTutorial;
    let showLrListenTutorial = isChecked ? "1" : "0";
    setIsChecked(!isChecked);

    if (preferences.length === 0) {
      showUtteranceTutorial = 1
      showRetryModal = 1
    } else {
      showUtteranceTutorial = preferences[0].show_utterance_tutorial ?? 1
      showRetryModal = preferences[0].show_retry_modal ?? 1
    }

    questionApi.savePreference(showUtteranceTutorial, showRetryModal, showLrListenTutorial).then(() => {
      setIsShowModal(false);
    });
  };

  useEffect(() => {
    if (preferences.length > 0) {
      if (preferences[0].show_lr_listen_tutorial) {
        setIsShowModal(true);
      } 
    } else {
      setIsShowModal(true);
    }
  }, [preferences]);

  return (
    <Fragment>
      {isShowModal && (
        <Modal
          closeIconColor="#044071"
          closeIconOpacity="1"
          closeModalFunc={onCloseHandler}
          className={`p-px-15 ${style.modal}`}
          outerClassname="justify-center"
        >
          <h4 className="font-bold mt-3 mb-8">
            {textJa.listening_learning_procedure}
          </h4>
          <div className="bg-background-200 h-40 w-full">
            <div className="flex w-full mt-10 px-3">
              <div className="w-px-79 mx-auto" align="center">
                <p className="text-11 text-primary-300">{textJa.shadowing}</p>
                <ShadowingIcon />
                <p className="text-11 text-primary-300">
                  {textJa.can_be_skipped}
                </p>
              </div>
              <div className="flex items-center mx-auto ">
                <ArrowNext />
              </div>
              <div className="w-px-90 mx-auto" align="center">
                <p className="text-11 text-primary-500">{textJa.dictation}</p>
                <DictationIcon />
                <p className="text-11 text-primary-500 font-bold">
                  {textJa.evaluation_target}
                </p>
              </div>
              <div className={`flex items-center mx-auto`}>
                <ArrowNext />
              </div>
              <div className="w-px-79 mx-auto" align="center">
                <p className="text-11 text-primary-300">
                  {textJa.read_the_answer_aloud}
                </p>
                <ReadAloudIcon />
                <p className="text-11 text-primary-300">
                  {textJa.can_be_skipped}
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 my-5">
              <p className="text-14 mt-1 text-basic-100 col-span-1 font-bold">
                {textJa.shadowing}
              </p>
              <p className="text-12 mt-1 text-basic-100 col-span-2 px-5 font-bold">
                {textJa.speak_and_understand_outline_of_voice}
              </p>

              <p className="text-14 mt-1 text-basic-100 col-span-1 font-bold">
                {textJa.dictation}
              </p>
              <p className="text-12 mt-1 text-basic-100 col-span-2 px-5 font-bold">
                {textJa.accurately_input_the_voice_you_hear}
              </p>

              <p className="text-14 mt-1 text-basic-100 col-span-1 font-bold">
                {textJa.read_aloud}
              </p>
              <p className="text-12 mt-1 text-basic-100 col-span-2 px-5 font-bold">
                {textJa.check_sound_mainly_in_parts_you_cant_hear}
              </p>
          </div>
          <div className="text-14 mx-auto mb-3 text-basic-100">
            {textJa.shadowing_and_reading_aloud_can_be_skipped}
          </div>
          <div>
            <Checkbox
              width={24}
              height={24}
              isChecked={isChecked}
              onClick={toggleCheckbox}
              color="#03DAC6"
              initialColor="#7A91A6"
            />
            <span className="text-14 text-basic-100 ml-px-16">
              {textJa.will_not_be_displayed_next_time}
            </span>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default DictationModal;
