import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import StartCountdown from '../StartCountdown/StartCountdown';
import ContentContainer from '../../../../../components/ContentContainer';
import Button from '../../../../../../../../shared/Button';
import CustomToolTip, {
  removeWTag,
  renderAlign,
  renderTooltip,
} from '../../../../../../../../utils/renderTooltip';

import useCountDown from '../../../../../../../../hooks/useCountDown';

import style from './Preview.module.css';
import { setDefaultLocale } from 'react-datepicker';

const Preview = ({ setContentType }) => {
  const { sentence } = useSelector(
    (state) => state.selfLearningReadingExercise
  );
  const [startCountDown, setStartCountDown] = useState(false);
  const [fadeBottom, setFadeBottom] = useState(false);
  const [scrollDefault, setScrollDefault] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  const renderContent = () => {
    let content = sentence.script;
    content = renderAlign(content);
    return renderTooltip(sentence.words, content, 'preview');
  };

  const {countdown} = useCountDown({
    seconds: 3,
    shouldStart: startCountDown,
  });

  const startChunkExercise = () => {
    const started_at = Date.now();
    localStorage.setItem(
      "chunk_exercise",
      JSON.stringify({
        start_chunk_exercise_at: started_at,
      })
    );
    setStartCountDown(true);
  };

  useEffect(() => {
    return !!!countdown && setContentType("reading");
  }, [countdown]);

  useEffect(() => {
    const hideFadeEffect = contentRef.current.scrollHeight > cardRef.current.clientHeight;
    setFadeBottom(hideFadeEffect);
  }, [contentRef]);

  const handleScroll = (e) => {
    const offset = 46;
    const hideFadeEffect = e.target.scrollTop < (e.target.scrollHeight - e.target.clientHeight - offset);
    setFadeBottom(hideFadeEffect);
  };

  const isFadeable = () => {
    return currentScroll >= scrollDefault && fadeBottom;
  };

  if (startCountDown) {
    return <StartCountdown countdown={countdown} />;
  } else {
    return (
      <div className={`${style.marginTop}`}>
        <CustomToolTip />
        <p className="font-bold text-16 text-primary-500 text-center mb-3">
          英文のプレビュー
        </p>
        <p className="font-normal text-12 text-primary-500 text-center mx-8">
          学習を始める前に、単語の意味や文章全体のレベル感を確認しましょう。難しければ他の長文を選びましょう。
        </p>
        <div className="relative mx-px-10">
          <ContentContainer
            title={sentence.title}
            className={`mt-px-30 pt-px-16 ${style.scrollable}`}
            handleScroll={handleScroll}
            cardRef={cardRef}
          >
            <div ref={contentRef} className="pb-px-50 pt-px-32 text-14 font-hiragino text-basic-100 whitespace-pre-line text-justify">
              {renderContent()}
            </div>
          </ContentContainer>
          {isFadeable() && <div className={style.fadeBottomGradient}></div>}
        </div>
        <div className={style.btnDiv}>
          <Button
            className="flex justify-center"
            innerClass={style.btn}
            type="darkblue-square"
            onClick={() => startChunkExercise()}
          >
            学習を始める
          </Button>
        </div>
      </div>
    );
  }
};

export default Preview;
