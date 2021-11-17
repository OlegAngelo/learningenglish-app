import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../../../../../shared/Header/Header';
import Menu from '../../../../../../shared/Menu/Menu';
import Option from '../../../../../../shared/Header/Option';
import OptionModal from '../OptionModal';
import Tab from '../../../../../../shared/Menu/components/Tab/Tab';

import { enableScroll, disableScroll } from '../../../../../../utils/scrollableHelper';

import style from '../../Details.module.css';
import { setTabValue } from '../../../../../../redux/newsDetails/slice';
import usePlayerSpeed from '../../../../../../hooks/usePlayerSpeed';

const DetailsHeader = ({ showTabs, setIsShowOption, isFetchingNewsDetails, disableBack }) => {
  const location = useLocation().pathname.includes('preview')

  // Redux
  const dispatch = useDispatch();
  const { showTabsWhenFinished, hasBookmarked } = useSelector((state) => state.news);
  const { currentTab } = useSelector((state) => state.newsDetail);
  const [speed, speedHandler] = usePlayerSpeed();

  // Local States
  const [isFavorite, setIsFavorite] = useState(hasBookmarked);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    if(location) setIsShowOption(false)
    setShowModal(false);
  };

  const changeTab = (tab) => {
    dispatch(setTabValue(tab));
    window.scrollTo(0, 0);
  }

  const optionProps = {
    isFavorite,
    closeModal,
    setIsFavorite,
    speed,
    speedHandler,
  };

  // Side Effects
  useEffect(() => {
    if (showModal) disableScroll();
  }, [showModal]);

  useEffect(() => {
    setIsFavorite(hasBookmarked);
  }, [hasBookmarked]);

  // Events
  const setNotScrollable = () => {
    if(location) setIsShowOption(true)
    setShowModal(true)
  }

  useEffect(() => {
    console.log(showTabsWhenFinished)
  }, [showTabsWhenFinished])

  return (
    <Fragment>
      <div className="sticky top-0 z-10">
        <Header hasBack={true} title="News" forcedUrl={null}>
          <Option className="pl-px-14" onClick={() => setNotScrollable()} />
        </Header>
        <div className={style.tabs}>
          { (showTabsWhenFinished || showTabs) && (
            <Fragment>
              {!isFetchingNewsDetails && (
                <Menu bgColor="primary-500" spaceX="7" paddingX="4" paddingY="3">
                  <div onClick={() => changeTab('en')}>
                    <Tab type="rounded3" isActive={currentTab === 'en'}>
                      英文記事
                    </Tab>
                  </div>

                  <div onClick={() => changeTab('jp')}>
                    <Tab type="rounded3" isActive={currentTab === 'jp'}>
                      日本語訳
                    </Tab>
                  </div>
                </Menu>
              )}
            </Fragment>
          )}
        </div>
      </div>
      {showModal && <OptionModal {...optionProps} />}
    </Fragment>
  );
};

export default DetailsHeader;
