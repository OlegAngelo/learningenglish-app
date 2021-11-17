import React, { useEffect } from 'react';

import Button from '../../../../../../../shared/Button';
import ForwardAudioIcon from '../../../../../../../shared/icons/ForwardAudioIcon';
import PauseNewsIcon from '../../../../../../../shared/icons/PauseNewsIcon';
import PlayArrowIcon from '../../../../../../../shared/icons/PlayArrowIcon';
import ReplayIcon from '../../../../../../../shared/icons/ReplayIcon';
import TranslateIcon from '../../../../../../../shared/icons/TranslateIcon';

import styles from './Footer.module.css';

const Footer = ({
  chunkTranslation, 
  setChunkTranslation, 
  playingAudio,
  toggleAudio,
  seekAudio,
  stopAudio,
}) => {

  useEffect(() => {
    return () => stopAudio();
  },[]);

  return (
    <div className={`fixed left-0 right-0 bottom-0 h-px-96 ${styles.footer}`}>
      <div className="grid grid-cols-5 gap-2 text-center pt-px-7">
        <div className="mt-4 mx-auto">
          <Button
            type={`${
              chunkTranslation === 'en' ? `darkblue-square-icon` : `lightgray-square-icon`
            }`}
            onClick={() => setChunkTranslation(chunkTranslation === 'en' ? 'jp' : 'en')}
            withoutFocus
          >
            <TranslateIcon />
          </Button>
        </div>
        <div className="flex items-center mx-auto">
          <button
            className="text-8 text-center font-bold focus:outline-none"
            onClick={() => {
              seekAudio(-3);
            }}
          >
            <ReplayIcon />
          </button>
        </div>
        <div>
            {playingAudio ? (
              <PauseNewsIcon
                height="54"
                width="54"
                onClick={() => toggleAudio()}
                className="cursor-pointer"
              />
            ) : (
              <PlayArrowIcon
                height="54"
                width="54"
                onClick={() => toggleAudio()}
                className="cursor-pointer"
              />
            )}
        </div>
        <div className="flex items-center mx-auto">
          <button
            className="text-8 text-center font-bold focus:outline-none"
            onClick={() => {
              seekAudio();
            }}
          >
            <ForwardAudioIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
