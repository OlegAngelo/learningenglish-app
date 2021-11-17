import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import HTMLReactParser from 'html-react-parser';

import Button from '../../../../../../shared/Button';

import style from '../../Details.module.css';

import {
  fetchRecommendedNews,
  fetchThumbnail,
  saveNewsLog,
  updateRecommendedNews,
} from '../../../../../../redux/news/slice';
import isFromAdminUtil from '../../../../../../utils/IsFromAdmin'
import { setIsPlaying } from '../../../../../../redux/vimeoPlayer/slice';
import { addIndentationPerParagraph } from '../../../../../../utils/text';

const Content = ({ setIsShowModal, isShowContent, currentTab }) => {
  const { hasFinished, newsDetails } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const id = useParams().id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [contentHeight, setContentHeight] = useState(0);
  const [showLearned, setShowLearned] = useState(false);
  const isFromAdmin = isFromAdminUtil();
  const userEnableWPMCalculation = parseInt(localStorage.getItem('user_enable_wpm_calculation'))

  useEffect(() => {
    if (currentTab === 'en') {
      let content = addIndentationPerParagraph(newsDetails.content);

      setTitle(newsDetails.title);
      setBody(content);
    }
    if (currentTab === 'jp') {
      setTitle(newsDetails.title_translation);
      setBody(newsDetails.translation);
    }
  }, [currentTab]);

  const renderContent = (content, words) => {
    if (words.length == 0) return HTMLReactParser(content);

    let importantWords = [];
    let wordToTranslationsMapper = [];
    words.forEach((word) => {
      // get all important words text except ( ～)
      let finalImportantWord = word.important_word.replace(/(.*) ～/, '$1');
      var regex = new RegExp(`\\b${finalImportantWord}\\b(?![<"\d])`, 'i');

      // get matched data in content to display text same format in news content
      const matchedDataInContent = content.match(regex);
      importantWords.push(finalImportantWord);
      content = content.replace(
        regex,
        `<span 
          id="${finalImportantWord}#${word.important_word_translation}#${matchedDataInContent}">
          ${finalImportantWord}
        </span>`
      );

      wordToTranslationsMapper[finalImportantWord] = word.important_word_translation;
    });

    return HTMLReactParser(content, {
      replace: domNode => {
        let shouldHightlight = false;
        let wordContent;
        let importantWord;
        let importantWordTrans;

        if (domNode.attribs?.id) {
          // <span> contents
          let importantWordDataContent;
          [ importantWord, importantWordTrans, importantWordDataContent ] = domNode.attribs.id.split('#');
          
          if (importantWords.includes(importantWord)) {
            wordContent = importantWordDataContent || importantWord;
            shouldHightlight = true;
          }
        
        } else if (domNode.attribs?.text) {
          // <em text="foo"> contents
          wordContent = domNode.children[0].data;
          importantWord = domNode.attribs.text;
          importantWordTrans = wordToTranslationsMapper[importantWord];
          shouldHightlight = true;
        
        } else if (domNode.name === 'em') {
          // <em>foo</em> contents
          wordContent = domNode.children[0].data;

          if (importantWords.includes(wordContent)) {
             importantWord = wordContent;
             importantWordTrans = wordToTranslationsMapper[importantWord];
            shouldHightlight = true;
          }
        }

        if (shouldHightlight) {
          return (
            <span
              data-for="toolTip"
              className={style.importantWord}
              data-tip={`<b>${importantWord}</b> <br/> ${importantWordTrans}`}
            >{wordContent}</span>
          );
        }
      }
    });
  };

  const finishNews = () => {
    setIsShowModal(true);
    setShowLearned(false);
    let payload = {
      newsId: id,
      started_at: localStorage.getItem('started_at'),
      userEnableWPMCalculation: userEnableWPMCalculation,
    };
    dispatch(setIsPlaying(false));
    dispatch(saveNewsLog(payload)).then(() => {
      dispatch(fetchRecommendedNews(newsDetails.level)).then((res) => {
        const response = res.payload.data;
        if (typeof response === 'object' && response[0].thumbnail_preview !== null) {
          dispatch(fetchThumbnail(response[0].thumbnail_preview)).then((result) => {
            let image = new Blob([result.payload.data], {
              type: 'image/jpg'
            });
            image = URL.createObjectURL(image);
            dispatch(updateRecommendedNews({
              ...response[0],
              image,
            }));
          });
        }
      });
    });
  };

  const setPadding = () => {
    if(newsDetails.vimeo_video_id){
       return style.finishedContainer
    }
    return `pb-px-50`
  }

  useEffect(() => {
    ReactTooltip.rebuild();
    const content = document.querySelector('#content');
    setContentHeight(content.offsetHeight);
  });

  useEffect(() => {
    if ((newsDetails && newsDetails.log_news.length > 0) && !hasFinished) {
      let isShowLearned = false;
      newsDetails.log_news.forEach(log => {
        if (log.finished_at !== null) {
          isShowLearned = true;
        }
      });
      setShowLearned(isShowLearned);
    }
  }, [newsDetails]);

  return (
    <Fragment>
      <div className="flex flex-1 flex-col">
        <ReactTooltip
          id="toolTip"
          place="top"
          effect="solid"
          html={true}
          backgroundColor="#C9EBE8"
          textColor="black"
          className={style.tooltip}
          arrowColor="transparent"
          offset={{ top: -10, left: 0 }}
          clickable={true}
        />
        <div
          id="content"
          className="bg-basic-400 m-px-10 p-px-16 flex flex-col h-auto"
          globalEventOff="click"
        >
          <p
            className="text-18 text-center font-bold mb-px-16 break-words"
          >
            {renderContent(title, newsDetails.important_words)}
          </p>
          {newsDetails.thumbnail && (
            <div className="flex justify-center mb-px-32">
              <img src={newsDetails.image} className="rounded" />
            </div>
          )}

          <p
            className={`text-14 text-justify whitespace-pre-line break-words ${
              (!isShowContent && currentTab === 'en') && 'invisible'
            }`}
          >
            {renderContent(body, newsDetails.important_words)}
          </p>


          <p className="text-basic-100 text-10 mt-px-14 text-right">
            (Source: {newsDetails.distributor})
          </p>
        </div>
      </div>
      <div>
        {showLearned && !isFromAdmin && (
          <div className="pt-px-25">
            <h4 className="text-center text-primary-500 font-bold text-16">
              学習済み
            </h4>
          </div>
        )}
        {!hasFinished && !isFromAdmin ? (
            <Button
              className={`mt-px-${showLearned ? `8` : `24`} flex justify-center ${setPadding()}
              `}
              innerClass={style.finishedButton}
              onClick={() => finishNews()}
              type="darkblue-square"
            >
              Finished
            </Button>
          ) : (
            <div className={newsDetails.vimeo_video_id ? 'h-px-95' : 'h-px-10'} />
          )}
      </div>
    </Fragment>
  );
};

export default Content;
