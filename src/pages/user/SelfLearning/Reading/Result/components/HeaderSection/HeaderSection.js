import React, { useEffect, useState } from 'react';

import Header from '../../../../../../../shared/Header';
import Menu from '../../../../../../../shared/Menu';
import Tab from '../../../../../../../shared/Menu/components/Tab';
import Option from './../../../../../../../shared/Header/Option';
import OptionModal from '../OptionModal';
import { disableScroll, enableScroll } from '../../../../../../../utils/scrollableHelper';
import usePlayerSpeed from '../../../../../../../hooks/usePlayerSpeed';

const HeaderSection = ({ result, tab, setTab, playBackRateAudio }) => {
  const [showModal, setShowModal] = useState(false);
  const [speed, speedHandler] = usePlayerSpeed();
  const readingLevelId = localStorage.getItem('reading_level_id');

  useEffect(() => {
    showModal ? disableScroll() : enableScroll();
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const speedOnChangeHandler = (option) => {
    playBackRateAudio(option.value);
    speedHandler(option);
    closeModal();
  };

  return (
    <div>
      <Header title={`Level ${result?.sentence?.level.order} Reading`}>
        <Option className="pl-px-14" onClick={() => setShowModal(true)} />
      </Header>
      <Menu bgColor="primary-500" spaceX="5" paddingY="3">
        <Tab
          onClick={() => setTab('chunk')}
          type="rounded3"
          size="sm"
          isActive={tab === 'chunk'}
        >
          チャンク
        </Tab>
        <Tab
          onClick={() => setTab('paragraph')}
          type="rounded3"
          size="sm"
          isActive={tab === 'paragraph'}
        >
          パラグラフ
        </Tab>
      </Menu>
      {showModal &&  
        <OptionModal 
          closeModal={closeModal}
          speed={speed}
          speedOnChangeHandler={speedOnChangeHandler}
        />
      }
    </div>
  );
};

export default HeaderSection;
