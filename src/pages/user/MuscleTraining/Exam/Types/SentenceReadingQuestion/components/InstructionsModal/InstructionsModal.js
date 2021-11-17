import React, { Fragment, useState } from 'react';

import Recorder from './components/Recorder';
import FastForwardIcon from '../../../../../../../../shared/icons/FastForwardIcon';
import ForwardIcon from '../../../../../../../../shared/icons/ForwardIcon';
import TalkingPersonIcon from '../../../../../../../../shared/icons/TalkingPersonIcon';
import Checkbox from '../../../../../../../../shared/GreenCheckbox';
import SpeakerIcon from '../../../../../../../../shared/icons/SpeakerIcon';

// API
import questionApi from '../../../../../../../../api/QuestionApi';

// Styles
import styles from './InstructionsModal.module.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreferences } from '../../../../../../../../redux/userPreference/slice'

const InstructionsModal = ({userPreference}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const step1 = '「問題を再生」をタップし、音声を聞く';
  const step2 = '「録音する」をタップ';
  const step3 = '解答を発話する';
  const step4 = '解答が終わったら「録音終了」をタップ';

  const toggleCheckbox = () => {
    let showInstructionFlag = isChecked ? '1':'0';
    let showRetryModalFlag; 
    let showLrListenTutorial;
    
    if (!userPreference[0]) {
      showRetryModalFlag = 1;
      showLrListenTutorial = 1;

    } else {
      showRetryModalFlag = userPreference[0].show_retry_modal ?? 1;
      showLrListenTutorial = userPreference[0].show_lr_listen_tutorial ?? 1;

    }

    questionApi.savePreference(showInstructionFlag, showRetryModalFlag, showLrListenTutorial)
      .then(() => {
        dispatch(fetchPreferences());
      })
      .catch((err) => {
        console.error(err);
      });
    setIsChecked(!isChecked);
  };

  return (
    <Fragment>
      <div className="items-center">
        <p className="mt-px-19 mb-px-24 font-bold text-16 leading-px-20 text-center text-basic-100">発話問題の解答手順</p>
        <div className={`${styles.icons} bg-background-200 place-items-center`}>
          <div className="py-px-36 grid grid-flow-col grid-cols-7 gap-0 place-items-center ">
          <div>
            <SpeakerIcon
              className="ml-px-12"
              type="default"
              height="22"
              width="22"
            />
            <div className={`${styles.talkingDesc} mt-px-2 text-10 text-primary-500 leading-px-21 mt-px-1`}>問題を再生</div>
          </div>
          <div className="-ml-px-8">
            <ForwardIcon />
          </div>
          <div>
            <Recorder
              className="flex justify-center"
              type='default'
            />
            <div className="text-11 text-primary-500 leading-px-21 mt-px-1">録音する</div>

          </div>
          <div className="-ml-px-10">
            <ForwardIcon />
          </div>
          <div>
            <div className={`${styles.talkingDesc} -ml-px-5 -mt-px-15 text-11 text-primary-300 leading-px-21`}>解答を発話する</div>
            <div className="ml-px-7 mt-px-7">
              <TalkingPersonIcon />
            </div>
          </div>
          <div className="ml-px-1">
            <ForwardIcon />
          </div>
          <div className="mt-px-5">
            <Recorder
              className="flex justify-center"
              type='recording'
            />
             <div className="text-11 text-red-400 leading-px-21 mt-px-2 ml-px-3">録音終了</div>
          </div>
          </div>
        </div>
        <div className="grid grid-cols-5 justify-items-start mt-px-20 mb-px-26">
          <div className="font-bold col-span-1 text-12 leading-px-20 text-basic-100 flex flex-wrap content-center">Step1</div>
          <div className={`text-12 my-px-4 col-span-4 ${styles.stepDescription} flex flex-wrap content-center -m-px-15`}>{step1}</div>

          <div className="col-span-1 font-bold text-12 leading-px-20 text-basic-100 flex flex-wrap content-center">Step2</div>
          <div className={`text-12 my-px-4 col-span-4 ${styles.stepDescription} flex flex-wrap content-center -ml-px-15`}>{step2}</div>

          <div className="col-span-1 font-bold text-12 leading-px-20 text-basic-100 flex flex-wrap content-center">Step3</div>
          <span className={`text-12 my-px-4 col-span-4 ${styles.stepDescription} flex flex-wrap content-center -ml-px-9`}>{step3}</span>

          <div className="col-span-1 font-bold text-12 leading-px-20 text-basic-100 flex flex-wrap content-center">Step4</div>
          <span className={`text-12 my-px-4 col-span-4 ${styles.stepDescription} flex flex-wrap content-center -ml-px-9`}>{step4}</span>
        </div>
        <div className={`text-center pt-px-3 pb-px-2 -ml-px-5 ${styles.checkBox}`}>
          <Checkbox
            width={24}
            height={24}
            isChecked={isChecked}
            onClick={toggleCheckbox}
            className="-mt-px-3 ml-px-1"
            color="#03DAC6"
            initialColor="#7A91A6"
          />
          {/* <input type="checkbox" className={`${styles.checkBox} text-center mr-px-16 align-bottom`} /> */}
          <span className="text-14 ml-px-16 ">次回から表示しない</span>
        </div>
      </div>
    </Fragment>
  );
};

export default InstructionsModal;
