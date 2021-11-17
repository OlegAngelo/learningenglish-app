import React, { useState, Fragment } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Parser from 'html-react-parser';

import Modal from '../../../../../../shared/Modal/Modal';
import Button from '../../../../../../shared/Button';
import FavoriteBorder from '../../../../../../shared/icons/FavoriteBorder';
import Card from '../../../../../../shared/Card';
import LevelStar from '../../../components/LevelStar';

import {
  toggleNewsBookmark,
  fetchUserNewsDetails,
  fetchThumbnail,
  updateNewsDetails,
} from '../../../../../../redux/news/slice';
import { setTabValue } from '../../../../../../redux/newsDetails/slice';
import { enableScroll } from '../../../../../../utils/scrollableHelper';
import isFromAdminUtil from '../../../../../../utils/IsFromAdmin';
import style from './NewsModal.module.css';

const NewsModal = ({
  closeModal,
  className = '',
  outerClassname = '',
  setShowJpTranslatonFromModal = () => {},
}) => {
  const dispatch = useDispatch();
  const { id: newsId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const {
    logNews,
    newsDetails,
    hasBookmarked,
    studyDuration,
    recommendedNews,
  } = useSelector((state) => state.news);
  const [isFavorite, setIsFavorite] = useState(hasBookmarked);
  const isFromAdmin = isFromAdminUtil();
  const wpmMessage = [
    'ゆっくりじっくり読むときの読解スピード',
    '平均的な大学生レベルの読解スピード',
    'やや速い：リーディングが得意な人の読解スピード',
    '速い：TOEICのリーディングで満点を狙える読解スピード',
    'とても速い：海外勤務でも困らない読解スピード',
    '超高速：ネイティブレベルの読解スピード',
  ];
  const userEnableWPMCalculation = parseInt(
    localStorage.getItem('user_enable_wpm_calculation')
  )
    ? true
    : false;

  const displayMessageBaseOnCondition = () => {
    let wpm = logNews.wpm;
    if (wpm <= 79) return wpmMessage[0];
    if (wpm >= 80 && wpm <= 119) return wpmMessage[1];
    if (wpm >= 120 && wpm <= 149) return wpmMessage[2];
    if (wpm >= 150 && wpm <= 199) return wpmMessage[3];
    if (wpm >= 200 && wpm <= 249) return wpmMessage[4];
    if (wpm >= 250) return wpmMessage[5];
  };

  const closeModalHandler = () => {
    dispatch(fetchUserNewsDetails(newsId)).then((res) => {
      let detail = res.payload;
      let image = null;
      if (detail.thumbnail) {
        dispatch(fetchThumbnail(detail.thumbnail)).then((res) => {
          image = new Blob([res.payload.data], {
            type: 'image/jpg',
          });
          image = URL.createObjectURL(image);
          dispatch(
            updateNewsDetails({
              ...detail,
              image,
            })
          );
        });
      } else {
        dispatch(
          updateNewsDetails({
            ...detail,
            image,
          })
        );
      }
    });
    enableScroll();
    closeModal();
  };

  const goToJpTranslation = () => {
    setShowJpTranslatonFromModal(true);
    closeModalHandler();

    dispatch(setTabValue('jp'));
  };

  const favoriteOnClickHandler = (event) => {
    event.target.blur();
    setIsFavorite(!isFavorite);
    dispatch(toggleNewsBookmark({ newsId, flash: false }));
  };

  const onFinishedHandler = () => {
    closeModalHandler();
    history.push('/');
  };

  return (
    <Modal
      outerClassname={outerClassname}
      className={`mx-px-16 px-px-16 py-px-22 ${className} ${style.innerModal}`}
      closeModalFunc={closeModalHandler}
    >
      {logNews <= 600 || studyDuration <= 20 ? (
        <div className="py-px-20 text-14 text-center">
          {!isFromAdmin && (
            <div>
              {userEnableWPMCalculation && (
                <div>
                  <p
                    className={`text-14 text-basic-100 font-bold mb-px-16 ${style.wpmDiv}`}
                  >
                    WPM計測結果
                  </p>
                  <p
                    className={`text-20 text-primary-500 font-bold mb-px-8 h-px-38 ${style.wpmDiv} ${style.wpmText}`}
                  >
                    WPM{' '}
                    <span className="text-30">{Math.floor(logNews.wpm)}</span>
                    (単語数/分)
                  </p>
                  <p className="text-12">
                    <span className="block font-bold text-primary-500 mb-px-16">{displayMessageBaseOnCondition()}</span>
                    <span className="block text-basic-100">WPMは一分間に単語を何語読めるかを示す単位です</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        userEnableWPMCalculation ? (
          <div>
            <div className="w-full text-14 text-center font-theme-bolder text-exam-error py-px-8">WPMが計測できませんでした</div>
            <div className="w-ful text-12 text-center text-exam-error pb-px-16">途中で中断したり読み飛ばしたりせず、最初から最後まで通して読みましょう</div>
            <div className="w-full text-12 text-center pb-px-24">WPMは一分間に単語を何語読めるかを示す単位です</div>
          </div>
        ) : (
          <div className="py-px-20 text-14">記事の内容は理解できましたか？</div>
        )
      )}
        <Button
          type={`${isFavorite ? 'white-square' : 'darkblue-square'}`}
          icon={
            <FavoriteBorder
              color={`${isFavorite ? '#044071' : 'white'}`}
              width="16"
              height="16"
            />
          }
          className="w-full mb-px-15"
          innerClass={`w-full ${style.fontNormal} ${style.button}`}
          onClick={(event) =>
            isFromAdmin ? closeModalHandler() : favoriteOnClickHandler(event)
          }
        >
          {isFavorite
            ? `この記事のブックマークを削除`
            : `この記事をブックマーク`}
        </Button>
      <Button
        type="darkblue-square-outline"
        className={`w-full mb-px-30 ${style.outerDivBtn}`}
        innerClass={`w-full ${style.fontNormal} ${style.button}`}
        onClick={() => goToJpTranslation()}
      >
        日本語訳を見る
      </Button>
      {typeof recommendedNews === 'object' ? (
        <Fragment>
          <div className="w-full flex text-primary-500 font-bold">
            こちらの記事もおすすめ
          </div>
          <div
            onClick={() => {
              closeModal();
              history.push(`/news/${recommendedNews.id}/details/en`);
              history.go(0);
            }}
          >
            <Card
              className={`mt-px-10 mb-px-40 p-px-16 flex flex-col ${style.card}`}
            >
              <div className="flex justify-between">
                <div className="w-2/3 pr-px-16">
                  <div className={`font-bold text-14 mb-px-10 ${style.title}`}>
                    {Parser(recommendedNews.title)}
                  </div>
                  <div className={`text-12 ${style.title}`}>
                    {recommendedNews.title_translation}
                  </div>
                </div>
                <div className="flex flex-row-reverse w-1/3">
                  {recommendedNews.image ? (
                    <img
                      className={`object-cover ${style.cardImg}`}
                      src={recommendedNews.image}
                    />
                  ) : (
                    <div className={style.cardImg}></div>
                  )}
                </div>
              </div>
              <div className="mt-px-5">
                <LevelStar level={recommendedNews.level} />
              </div>
            </Card>
          </div>
        </Fragment>
      ) : (
        <div className="text-center text-15 mb-px-20">
          他のトレーニングもバランスよく実施しましょう！
        </div>
      )}
      <Button type="white-square-wider" onClick={onFinishedHandler}>
        学習終了
      </Button>
    </Modal>
  );
};

export default NewsModal;
