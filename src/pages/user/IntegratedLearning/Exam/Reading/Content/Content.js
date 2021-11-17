import React from 'react'

import Button from '../../../../../../shared/Button';
import Header from '../../../../../../shared/Header';
import PauseIcon from '../../../../../../shared/icons/PauseIcon';
import Agenda from '../../components/Agenda';

import styles from './Content.module.css';

const Content = () => {
  return (
    <div className="bg-background-200">
      <div className="flex items-end bg-primary-500 h-px-87">
        <div className="w-full">
          <Header hasBack={false} title="Reading 検討事項を確認する" titleClass="ml-px-15">
            <PauseIcon />
          </Header>
        </div>
      </div>
      <p className={`${styles.textMargin} text-center text-primary-500 text-14 mx-2 font-theme-bolder`}>
        本文を読み、内容を理解しましょう
        </p>
      <div className="mx-2 mt-4">
        <Agenda />
      </div>
      <div class={`${styles.bottomBtn} relative`}>
        <div class="absolute inset-0 flex items-center justify-center">
          <Button type="white-square-wider">問題に進む</Button>
        </div>
      </div>
    </div>
  )
}

export default Content;
