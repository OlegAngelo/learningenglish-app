import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import HeartIcon from '../../../../../../shared/icons/HeartIcon';
import LevelStar from '../../../../../../shared/Level';
import Button from '../../../../../../shared/Button';

import { getTimeAgo } from '../../../../../../utils/lectureHelper';

import {
  resetHasCompletedVideo,
} from '../../../../../../redux/userLectureDetails/slice';

import style from './Overview.module.css';

const Overview = (props) => {
  const [redirectTo, setRedirectTo] = useState('');
  const [title, setTitle] = useState('');
  const [isShowButton, setIsShowButton] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch()
  const id = useParams().id;
  const { lecture, hasCompletedVideo } = useSelector((state) => state.userLectureDetails);
  const japText = {
    chunk_riding: "チャンクリーディング",
    dictation: "ディクテーション"
  }
  

  useEffect(() => {
      if (lecture.genre_id === 2 && lecture?.lectures_tags?.find(item => item.lecture_meta_tag.name === japText.dictation)) {
        setIsShowButton(true);
        setRedirectTo('/self-learning/listening');
        setTitle('自習室“Listening”へ移動');
      } 
      else if (lecture.genre_id === 3 && lecture?.lectures_tags?.find(item => item.lecture_meta_tag.name === japText.chunk_riding)) {
        setIsShowButton(true);
        setRedirectTo('/self-learning/reading');
        setTitle('自習室“Reading”へ移動');
      }
  }, []);

  return (
    <div className="m-px-16">
      <div className="flex flex-wrap">
        {lecture.lectures_tags.length > 0 && lecture.lectures_tags.map((item, index) => {
          return (
            <div
              className="border border-basic-300 text-11 text-basic-200 font-bold px-px-8 mb-px-8 mr-px-8"
              align="center"
            >
              {item.lecture_meta_tag.name}
            </div>
          );
        })}
      </div>

      <p className="pt-px-20 mb-px-16 font-bold text-16 text-left text-basic-100">
        <span dangerouslySetInnerHTML={{ __html: lecture.title }}></span>
      </p>

      {lecture.lectures_teacher.map((item, index) => {
        return <p className="text-14 text-basic-100">{item.teacher.name}</p>
      })}

      <div className="flex items-center mt-px-23">
        <span className="text-12 text-primary-400 w-px-80">{getTimeAgo(lecture)}</span>
        <div className="flex items-center mr-px-24">
          <LevelStar level={lecture.level} />
        </div>
        <span className="text-12 text-basic-200">{lecture.views}回視聴</span>
        {/* #tmp - lecture bookmark */}
        {/* <HeartIcon className="absolute right-0 mr-px-16" color="#DADADA" /> */}
      </div>

      <div className="mt-px-27 text-12 text-basic-100 whitespace-pre-wrap pb-px-188">
        <span dangerouslySetInnerHTML={{ __html: lecture.description }}></span>
      </div>

      {isShowButton && (
        <div className={(lecture.lecture_phrases.length > 0 || lecture.lecture_words.length > 0) 
          ? "fixed bottom-20 w-full left-0" : "fixed bottom-0 w-full left-0"}
        >
          <Button
            className={`mt-px-20 flex justify-center mb-px-20 pb-px-16 shadow-lg`}
            innerClass={`text-14 bg-white shadow-btn w-px-210 h-px-48 cursor-pointer`}
            type="lightblue-outline"
            onClick={() => history.push(redirectTo) }
          >
            <span className="text-14 text-primary-500 font-bold">{title}</span>
          </Button>
        </div>
      )}

      {(lecture.lecture_phrases.length > 0 || lecture.lecture_words.length > 0) && (
        <div className="fixed bottom-0 w-full left-0">
        <Button
          className={`bg-white flex justify-center mb-px-50`}
          innerClass={`text-14 ${style.button} cursor-pointer`}
          type="darkblue-square"
          disabled={!hasCompletedVideo}
          onClick={() => {
            dispatch(resetHasCompletedVideo());
            history.push({
              pathname: `/learning-environment`,
              search: 'learningType=phrase&questionType=lecture-training',
              state: {
                lectureId: id,
              }
            })
          }}
        >
          <span className="font-normal">
            {!hasCompletedVideo ? '視聴後に確認問題オープン' : '確認問題スタート'}
          </span>
        </Button>
        </div>
      )}
    </div>
  );
};

export default Overview;
