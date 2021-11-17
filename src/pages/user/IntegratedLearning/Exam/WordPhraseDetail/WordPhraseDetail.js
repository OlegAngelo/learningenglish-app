import React, { useState } from 'react';

import Header from '../../../../../shared/Header';
import Button from '../../../../../shared/Button';
import Checkbox from '../../../../../shared/Checkbox';
import Player from '../../../../../shared/Header/Player';
import CommentIcon from '../../../../../shared/icons/CommentIcon';
import AudioPlayer from './components/AudioPlayer';

import styles from './WordPhraseDetail.module.css';

import { upperCaseFirst } from '../../../../../utils/text.js';

const WordPhraseDetail = ({ match }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const category = match.params.category;

  const toggle = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`bg-background-200 ${styles.container}`}>
        <div className="bg-primary-500">
          <Header
            hasBack={false}
            title={upperCaseFirst(category) === 'Reading' ? 'Reading 検討事項を確認する' : 'Listening 自分の意見を言う'}
          >
            <Player
              action="PLAY"
              isPlaying={isPlaying}
              onClick={toggle}
            />
          </Header>
        </div>
        <div className={styles.wordPhrase}>
          <div className="content pt-14">
            <div className="text-center font-bold text-16 text-basic-200">
              重要単語／フレーズ
            </div>
            <AudioPlayer />
            <div className="label h-16 flex flex-col justify-between">
              <div className={`${styles.labels} ${styles.eng} pt-px-4 text-24 text-basic-100`}>
                sales
              </div>
              <div className={`${styles.divider} border-secondary-500 mx-1`} />
              <div className={`${styles.labels} pt-px-4 text-basic-100`}>
                売り上げ
              </div>
            </div>
          </div>
          <div className={`mt-7 pr-8 pl-px-34 h-6 flex items-center ${styles.checkboxContainer}`}>
            <Checkbox
              width={16}
              height={16}
              isChecked={isChecked}
              onClick={toggleCheckbox}
              className="-mt-px-3 ml-px-1"
            />
            <label className={`${styles.checkboxLabel} ml-px-4 -mt-px-1 text-12 text-primary-400`}>
              CheckListに追加
            </label>
          </div>
        </div>
        <div className="flex flex-col h-32 mb-px-50">
          <div className="h-1/2 flex flex-row-reverse -mb-px-5">
            <div className={`${styles.floatingBtn} bg-primary-500 border-2 border-white flex flex-col justify-around items-center`}>
              <CommentIcon
                height={24}
                width={24}
              />
              <div className="text-11 text-white">解説</div>
            </div>
          </div>
          <div className="flex justify-center py-5">
            <Button
              innerClass={`${styles.btnSmall} ${styles.btnDisabled} bg-basic-500 px-px-22`}
              type="white-square-wide"
            >
              BACK
            </Button>
            <Button
              type="white-square-wider"
              className="mx-px-8" innerClass={styles.btnLarge}
            >
              単語一覧に戻る
            </Button>
            <Button
              type="white-square-narrow"
              innerClass={`px-px-23 ${styles.btnSmall}`}
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordPhraseDetail;
