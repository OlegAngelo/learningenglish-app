import React, { Fragment, useState, useEffect} from "react";

import Button from "../../../../../../../shared/Button/Button";
import AddBoxIcon from "../../../../../../../shared/icons/AddBoxIcon";
import ArrowNext from "../../../../../../../shared/icons/ArrowNext";

import AdminListeningApi from '../../../../../../../api/SelfLearning/Listening/AdminListeningApi';

const UploadField = ({
  audio,
  audioRaw,
  audioFileName,
  importOnClickHandler,
  phraseData,
  isFetchingPhraseData,
  setShowDiscardModal
}) => {

  const [audioUrl, setAudioUrl] = useState();

  const getAudio = () => {
    AdminListeningApi.fetchAudioData({level: phraseData?.set?.level.order, fileName: audio})
    .then((audio) => {
      setAudioUrl(URL.createObjectURL(new Blob([audio.data], { type: ['audio/mp3', 'audio/mp4', 'audio/mpeg'] })));
    })
    .catch((err) => {
      setAudioUrl('/404');
    })
  };

  useEffect(() => {
    if(audioRaw !== null) {
      setAudioUrl(URL.createObjectURL(new Blob([audioRaw], { type: ['audio/mp3', 'audio/mp4', 'audio/mpeg'] })));
      setShowDiscardModal(true);
    } else if(audio !== undefined) {
      getAudio();
    } 
  }, [phraseData, audioRaw]);

  return (
    <Fragment>
      <div className="mb-px-40">
        <div className="mb-18">
          <label
            htmlFor="en_title"
            className="text-adminGray-400 text-12 font-bold mb-px-8"
          >
            音声ファイル <span className="text-adminRed-400">*</span>
          </label>
        </div>
        <div>
          <span className="text-dark-500 font-theme-regular leading-px-14 text-14">
            {audioUrl ? audioFileName ?? phraseData?.audio_file : '読み込み中...'}
          </span>
        </div>
        <div className="flex">
          <Button
            className="mt-px-12"
            innerClass={`${!audioUrl ? 'cursor-pointer' : 'cursor-default'}`}
            type="blue-square"
            onClick={(e) => {
              e.currentTarget.blur();
              window.open(audioUrl, '_blank');
            }}
            disabled={!audioUrl}
          >
            <ArrowNext color="#ffffff" />
            <span className="ml-px-8">音声ファイルを再生</span>
          </Button>

          <Button
            className="mt-px-12 ml-px-10"
            type="blue-square"
            onClick={importOnClickHandler}
          >
            <AddBoxIcon width="15" height="15" />
            <span className="ml-px-6">音声ファイルをアップロード</span>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadField;
