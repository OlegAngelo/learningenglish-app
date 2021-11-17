import React, { useState, useEffect, Fragment } from 'react';
import { useParams, } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
import DropdownModal from '../../../../../../shared/DropdownModal';
import NewsItem from '../../../components/NewsItem/NewsItem';
import ExpandMoreIcon from '../../../../../../shared/icons/ExpandMoreIcon';
import Loading from '../../../../../../shared/Loading';
import Alert from '../../../../../../shared/Alert';
import ToggleSwitch from '../../../../../../shared/ToggleSwitch';

import {
  fetchUserNewsList,
  fetchThumbnail,
  addThumbnailPreview,
  resetUserNews,
} from '../../../../../../redux/news/slice';

import style from './ContentSection.module.css';

import { enableScroll, disableScroll } from '../../../../../../utils/scrollableHelper';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ContentSection = () => {
  const URLParams = new URLSearchParams()
  const level = useQuery().get('level');
  const audio = useQuery().get('audio');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isFiltering, setIsFiltering] = useState(true);
  const [filter, setFilter] = useState({
    level : useQuery().get('level') ?? 0,
    audio : useQuery().get('audio') ?? 0,
  });
  const {
    userNews,
    currentPage,
    lastPage,
    newsStatus,
    isFetchingNewsStatus,
  } = useSelector(state => state.news);
  const tab = useParams().tab;
  const expiredMessage = 'このニュースは \n 掲載期間が終了しました';
  const deletedMessage = 'こちらのニュースは削除されています。';
  const noData = 'ニュースがまだ存在しません';
  const noDataFound = '該当のニュースが見つかりません';
  const labels = {
    level : [
      '指定なし',
      '★☆☆　TOEICスコア ～550',
      '★★☆　TOEIC スコア 550～800',
      '★★★　TOEICスコア 800～',
    ],
    audio : [
      '指定なし', //unspecified
      '音声あり', //With audio
      '音声なし', //No audio
    ],
  };
  const audioMap = { 
    0: 0, 
    'audio-only': 1, 
    'no-audio': 2 
  }
  const textByGenre = {
    world: '海外での重要ニュースや注目トピックについての記事です。',
    national: '国内での重要ニュースや注目トピックについての記事です。',
    'business-tech':
      '国内外のビジネスニュースや驚きの新サービスなど、ビジネス・IT関係の記事です。',
    'science-health': '世界中の興味深い研究にフォーカスした、科学・健康関係の記事です。',
  };
  // const [isToggledOn, setIsToggledOn] = useState(true);
  const userEnableWPMCalculation = localStorage.user_enable_wpm_calculation
  ? parseInt(localStorage.getItem('user_enable_wpm_calculation'))
  : 1;
  const [isToggledOn, setIsToggledOn] = useState(userEnableWPMCalculation ?? false);
  const closeModal = () => {
    setShowDropDownModal(false);
    enableScroll();
  };

  const getImageResources = (data) => {
    data?.forEach(item => {
      if (item.thumbnail_preview) {
        dispatch(fetchThumbnail(item.thumbnail_preview)).then((res) => {
          let image = null;
          image = new Blob([res.payload.data], {
            type: 'image/jpg'
          });
          image = URL.createObjectURL(image);

          dispatch(addThumbnailPreview({
            key: item.thumbnail_preview,
            value: image,
          }));
        });
      }
    });
  };

  useEffect(() => {
    if (newsStatus !== null && newsStatus !== 'published') return setShowAlertModal(true);
  }, [newsStatus]);

  useEffect(() => {
    setFilter({
      level : level ?? 0,
      audio : audioMap[audio ?? 0],
    });

    setIsFetching(true);

    dispatch(resetUserNews());
    dispatch(fetchUserNewsList({
      genre: tab,
      level : level ?? 0,
      audio : audio,
    }))
      .then((res) => {
        setIsFetching(false);
        setIsFiltering(false);
        getImageResources(res.payload?.data);
      });
  }, [tab]);

  

  const dropdownOnChange = async (value) => {
    setIsFiltering(true);
    setFilter({
      ...filter,
      [showDropDownModal] : value,
    });
    closeModal();

    let {audio, level} = filter;
    if (showDropDownModal === 'audio') {
      audio = value;
    } else if (showDropDownModal === 'level')  {
      level = value;
    }

    if (audio === 1) {
      audio = 'audio-only';
    } else if (audio === 2) {
      audio = 'no-audio';
    }

    let params = {
      genre: tab,
      level: level,
      audio: audio,
    };
    URLParams.append("level", level)
    URLParams.append("audio", audio)
    history.push({search: URLParams.toString()})
    dispatch(resetUserNews());
    dispatch(fetchUserNewsList(params))
      .then((res) => {
        setIsFiltering(false);
        getImageResources(res.payload?.data);
      });
  };

  const fetchMoreNews = () => {
    let audio;

    if (filter.audio === 1) {
      audio = 'audio-only';
    } else if (filter.audio === 2) {
      audio = 'no-audio';
    }

    let params = {
      genre: tab,
      level: filter.level,
      audio: audio,
      page: currentPage + 1,
    };

    dispatch(fetchUserNewsList(params))
      .then((res) => {
        getImageResources(res.payload?.data);
      });
  };

  useEffect(() => {
    if(showDropDownModal)  disableScroll();
  });

  return (isFetching || isFetchingNewsStatus)
    ? (
      <Loading
        className="top-0 bg-background-200"
        iconClass="bg-primary-500 text-primary-500"
        zIndex="z-0"
      />
    ) : (
      <Fragment>
        <Alert
          show={showAlertModal}
          callBack={() => setShowAlertModal(false)}
          msg={newsStatus === 'expired' ? expiredMessage : deletedMessage}
          customOption={{message: '閉じる', className: 'font-sf-pro-text'}}
        />
        <div className={style.container}>
          {showDropDownModal && (
            <DropdownModal
              closeModal={closeModal}
              dropdownOnChange={dropdownOnChange}
              selected={filter[showDropDownModal]}
              labels={labels[showDropDownModal]}
            />
          )}
          <div className={`fixed z-10 top-0 right-0 w-full bg-background-200 pb-px-16 ${style.headerSticky}`}>
            <p className="text-14 text-basic-100 mt-px-16 mx-px-16 text-left">
              {textByGenre[tab] ?? 'すべての記事です。'}
            </p>

            <div className="flex justify-between items-center mt-px-22 mx-px-16">
              <div className="font-bold text-14 text-primary-500">難易度</div>

              <div
                className={`flex justify-between items-center px-px-8 h-px-36 bg-adminGray-50 border-px-2 border-adminGray-300 rounded-px-2 cursor-pointer ${style.level}`}
                onClick={() => setShowDropDownModal('level')}
              >
                <p className="text-14 text-adminGray-700 h-px-20 w-px-84 overflow-hidden">
                  {labels.level[filter.level]}
                </p>
                <ExpandMoreIcon height="7.41" width="12" />
              </div>

              <div className="font-bold text-14 text-primary-500">音声</div>
              <div
                className={`flex justify-between items-center px-px-8 h-px-36 bg-adminGray-50 border-px-2 border-adminGray-300 rounded-px-2 cursor-pointer ${style.audio}`}
                onClick={() => setShowDropDownModal('audio')}
              >
                <p className="text-14 text-adminGray-700 h-px-20 w-px-80 overflow-hidden">
                  {labels.audio[filter.audio]}
                </p>
                <ExpandMoreIcon height="7.41" width="12" />
              </div>
            </div>
            <div className="flex flex-row-reverse items-center mt-px-16 mx-px-16">
              <div className={`flex pl-px-17`} >
                <div className="font-hiragino font-bold text-14 text-primary-500 pr-px-16 pt-px-5">WPMの測定</div>
                <ToggleSwitch 
                  setIsToggledOn={setIsToggledOn}
                  page='news'
                  on={userEnableWPMCalculation}
                />
              </div>
            </div>
          </div>
          <div className={style.marginTop}>
          {isFiltering
            ? (
              <Loading
                className={`top-0 ${style.loading} ${style.marginTop}`}
                iconClass="bg-primary-500 text-primary-500"
                zIndex="z-0"
                rootPosition="relative"
              />
            ) : (
              <InfiniteScroll
                dataLength={userNews.length}
                next={fetchMoreNews}
                hasMore={currentPage < lastPage}
                loader={(
                  <Loading
                    className={`top-0 ${style.loading}`}
                    iconClass="bg-primary-500 text-primary-500"
                    zIndex="z-0"
                    rootPosition="relative"
                  />
                )}
                className={!tab ? style.paddingTop : style.infiniteScrollPadding}
                style={{overflow: 'unset'}}
              >
                { userNews?.length ? (
                  userNews.map((newsItemData, index) => (
                    <NewsItem data={newsItemData} key={newsItemData.id} />
                  ))
                ) : (
                  <div className="flex justify-center pt-px-20 text-12">
                    { filter.level || filter.audio ? noDataFound : noData }
                  </div>
                )}
              </InfiniteScroll>
            )
          }
          </div>
        </div>
      </Fragment>
  );
};

export default ContentSection;
