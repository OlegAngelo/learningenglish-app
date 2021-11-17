import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import Parser from 'html-react-parser';

import Button from '../../../../../../shared/Button';
import FavoriteBorderIcon from '../../../../../../shared/icons/FavoriteBorderIcon';
import FavoriteIcon from '../../../../../../shared/icons/FavoriteIcon';
import Menu from '../../../../../../shared/Menu';
import Tag from '../../../../../../shared/Tag';
import LevelStar from '../../../../News/components/LevelStar';
import Tab from '../Tab';
import OverlayInfo from '../OverlayInfo.js/OverlayInfo';
import LiveLabels from '../LiveLabels';

import style from './Content.module.css';
import { useDispatch, useSelector } from 'react-redux';

// Config
import lectureTypes from '../../../../../../config/lectureTypes.json';
import useRedirectToNotFound from '../../../../../../hooks/useRedirectToNotFound';
import { saveLiveView } from '../../../../../../redux/userLectures/slice';
import { displayDateTime } from './computed';

const Content = ({ lectureLiveId }) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const { lectureData, thumbnail } = useSelector(state => state.userLectureDetails)
  const { ON_LIVE, PLANNING_TO_LIVE, FINISHED_LIVE } = lectureTypes;
  const [disableAfterClick, setDisableAfterClick] = useState(false)

  const {
    label_type: type,
    details,
    tags,
    count_of_logs: countOfLogs
  } = lectureData || {};

  const {
    description,
    level,
    teachers,
    title,
    url,
    sub_title: subTitle,
    start_at: startAt
  } = details || {};

  // Local States
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const convertToImage = (img) => {
    let blob = new Blob([img], {
      type: 'image/jpg',
    });

    return URL.createObjectURL(blob);
  }

  const { redirect404 } = useRedirectToNotFound({
    route: '/lectures',
    text: 'Go to lectures',
  })

  useEffect(() => {
    if(type == FINISHED_LIVE || !lectureData)  redirect404();
    return;
  })

  const openLivePage = () => {
    const windowNode = window.open('', '_blank');
    dispatch(saveLiveView(lectureLiveId)).then((res)=>{
      setDisableAfterClick(true);
      windowNode.location = url;
    });
  };

  const is5MinsBeforeStartOrOnLive = () => {
    return !moment().add(5,'minutes').isSameOrAfter(moment(startAt)) ?? type !== ON_LIVE;
  }

  return (
    <div>
      <div className="mx-px-20 mt-px-24 flex-col justify-center">
        <Button 
          onClick={() => openLivePage()}
          innerClass={style.button}
          type="darkblue-square"
          withoutFocus={true}
          hide={is5MinsBeforeStartOrOnLive()}
        >
          視聴ページへ
        </Button>

        { thumbnail ? (
            <div className={style.imageContainer}>
              <OverlayInfo
                show={type === PLANNING_TO_LIVE}
                startDate={startAt}
              />
              <img
                alt="lecture-live"
                className="object-cover"
                src={convertToImage(thumbnail)}
              />
            </div>
          ) : (
            <div className="w-100 h-px-295 bg-basic-300 animate-pulse my-5"></div>
          ) 
        }
      </div>
      
      <div>
        <Menu
          bgColor="primary-500"
          customClassName={style.menu}
          customInnerClass="justify-around"
          isTabFlat
          shadowMenu="darkShadowMenu"
        >
          <Tab
            isActive={activeTab == 1}
            onClick={() => setActiveTab(1)}
          >
            概要
          </Tab>
          {/* <Tab
            isActive={activeTab == 2}
            onClick={() => setActiveTab(2)}
          >
            配布物
          </Tab> */}
        </Menu>
      </div>

      <div className={`mx-px-16 ${activeTab == 1 ? 'block' : 'hidden'}`}>
        <div className="flex flex-wrap mt-px-15">
      
          <LiveLabels
            showOnlive={type === ON_LIVE}
            showPlanLive={type === PLANNING_TO_LIVE}
          />

          { tags?.map( tag => (
            <div className="mr-px-8">
              <Tag
                className="text-11 p-px-3 mb-1"
                color="lightWithBorder"
                size="xs"
                width="38px"
                weightBold
              >
                {tag.name}
              </Tag>
            </div>
          ))}
        </div>

        <p className="font-bold mt-px-11 text-basic-100 text-16">
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
        </p>
        <p className={`font-bold mb-px-10 text-basic-100 text-14`}>
          <span dangerouslySetInnerHTML={{ __html: subTitle }}></span>
        </p>

        { teachers?.map((teacher) => (
          <p className="mt-px-1 text-basic-100 text-14">{ teacher.name }</p>
        ))}

        <div className="flex justify-between mt-px-15">
          <div className="flex">
            <span className="text-primary-400 text-12">
              {displayDateTime({ details, type })}
            </span>
            <span className="ml-px-8 -mt-px-5">
              <LevelStar level={ level } classname="mr-px-3"/>
            </span>
            {/* <span className="ml-px-5 text-basic-200 text-12">2856人が視聴中</span> */}
          </div>
          {/* #tmp - lecture bookmark */}
          {/* <span className="-mt-px-5 mr-px-2">
            {isFavorite ? (
              <FavoriteIcon onClick={() => setIsFavorite(false)}/>
            ) : (
              <FavoriteBorderIcon onClick={() => setIsFavorite(true)}/>
            )}
          </span> */}
        </div>
        <p className={`mt-px-24 text-12 text-basic-100 text-justify whitespace-pre-line ${style.description}`}>
          <span dangerouslySetInnerHTML={{ __html: description }}></span>
        </p>
      </div>
    </div>
  )
};

export default Content;
