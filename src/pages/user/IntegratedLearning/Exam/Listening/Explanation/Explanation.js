import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

import Answer from './components/PostAnswer';
import Question from './components/PostQuestion';
import Commentary from './components/Commentary';
import Header from '../../../../../../shared/Header';
import PlayIcon from '../../../../../../shared/icons/PlayIcon';
import Button from '../../../../../../shared/Button';
import TranslateIcon from '../../../../../../shared/icons/TranslateIcon';
import VideoPlayer from '../../../../../../shared/VideoPlayer';

import styles from './Explanation.module.css';

const Explanation = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslate, setIsTranslate] = useState(false);
  const [viewText, setViewText] = useState(false);
  const [nextId, setNextId] = useState(0);
  let [questionText, setQuestionText] = useState('');

  let questionId = useParams();
  let history = useHistory();

  let currentPage = questionId.id;
  let prevId = questionId.id - 1 == 0 ? 1 : questionId.id - 1;

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  const setQuestion = () => {
    if (questionId.id == 1) {
      setQuestionText('What are they discussing?');
      setNextId(2)
    } else if (questionId.id == 2) {
      setQuestionText('What do you think about cutting the cost?');
      setNextId(3)
    } else if (questionId.id == 3) {
      setQuestionText('What are they discussing?');
      setNextId(3)
    } else {
      setQuestionText('No question added');
    }
  }

  useEffect(() => {
    setQuestion();
  }, [questionId.id])

  return (
    <Fragment>
      <Header hasBack={false} title="Listening 自分の意見を言う">
        <PlayIcon isPlaying={isPlaying} onclick={toggle} action="PLAY" />
      </Header>
      <div className="bg-basic-200">
        <VideoPlayer src="https://dcipher4320.s3.amazonaws.com/dummy_vid.mp4" play={isPlaying} />
      </div>
      <div className={`${styles.container} bg-background-200`}>
        <div className={`${styles.qaContainer} bg-white py-5`}>
          <p className="text-center text-16 text-primary-400 font-bold font-hiragino-kaku">問題解説</p>
          <Question
            questionNumber={questionId.id}
            question={questionText}
          />
          <div className="mt-8 mx-0">
            <Answer answer="How To Improve The Sales Of Their Product." isCorrect={true} />
          </div>
          <div className="mx-0">
            <Answer answer="How To Improve The Employees’ Work Efficiency." isCorrect={false} />
          </div>
          <div className="mx-0">
            <Answer answer="When To Telease Their New Product." isCorrect={false} />
          </div>
          <div className={`${styles.pointContainer} font-hiragino-kaku`}>
            <p className={`text-center text-14 text-primary-400 font-bold`}>POINT</p>
            <p className={`${styles.pointParagraph} text-justify text-14`}>
              アジェンダによると、協議項目１は
              Sales improvement of CleanBusterとある。 『クリーン・バスター』という製品の売上回復について話し合うこと
              が読み取れる 。
            </p>
          </div>
        </div>
        <div className={`${styles.btnWrapper} text-center`} onClick={() => setViewText(!viewText)}>
          <Button
            className={`m-3`}
            type={clsx(`${viewText ? `lightgray-square`:`darkblue-square`}`)}
          >
            本文を見る
          </Button>
        </div>
        {
          viewText &&
          <div className={`${styles.commentaryContainer} bg-white`}>
            <Button
              className={`${styles.btnTranslate} float-right`}
              type={clsx(`${isTranslate ? `lightgray-square-icon`:`darkblue-square-icon`}`)}
              onClick={() => setIsTranslate(!isTranslate)}
            >
              <TranslateIcon />
            </Button>
            <div className={`${styles.commentaryWrapper}`}>
              <Commentary
                name="Nancy"
                response="Oh, Ed, Good Timing. We're Going To That New Oyster bar. Please Join Us."
                isTranslate={isTranslate}
                translatedName="ナンシー"
                translatedResponse="ああ、エド、いいタイミングだ。 その新しいオイスターバーに行きます。 ぜひご参加ください。"
              />
              <Commentary
                name="Ed"
                response="Oysters? They're My favorite. I'd Love To Join You. "
                isTranslate={isTranslate}
                translatedName="エド"
                translatedResponse="カキ？ 彼らは私のお気に入りです。"
              />
              <Commentary
                name="Nancy"
                response="Great. The Oysters Are Shipped From Hiroshima Every Day."
                isTranslate={isTranslate}
                translatedName="ナンシー"
                translatedResponse="ナンシー：ああ、エド、いいタイミングだ。 その新しいオイスターバーに行きます。 ぜひご参加ください。"
              />
              <Commentary
                name="Ed"
                response="Really? Hiroshima's My Hometown."
                isTranslate={isTranslate}
                translatedName="エド"
                translatedResponse="エド：カキ？ 彼らは私のお気に入りです。"
              />
              <Commentary
                name="Nancy"
                response="Then You Must Be Quite Picky About Oysters."
                isTranslate={isTranslate}
                translatedName="ナンシー"
                translatedResponse="ナンシー：それなら、牡蠣についてはかなりうるさいはずです。"
              />
              <Commentary
                name="Ed"
                response="Oh, I Just Got An Email From My Boss. I'll Be Right Back. So, Please Wait a Few Minutes, Okay?"
                isTranslate={isTranslate}
                translatedName="エド"
                translatedResponse="エド：ああ、上司からメールが届きました。 すぐ戻る。 だから、数分待ってくださいね"
              />
              <Commentary
                name="Nancy"
                response="Sure, No Problem. Happy Hour Doesn't Start Until Six."
                isTranslate={isTranslate}
                translatedName="ナンシー"
                translatedResponse="ナンシー：もちろん、問題ありません。 ハッピーアワーは6時まで始まりません。"
              />
            </div>
          </div>
        }
        <div className="flex flex-col mb-6 h-32">
          <div className="flex justify-between py-5 px-2.5">
            <Button
              innerClass={`${styles.footerButtonSm}`}
              type={clsx(`${(currentPage == 1) ? `lightgray-square-wide`:`white-square-wide`}`)}
              onClick={() => history.push(`/training/integrated-exam/listening/${prevId}/explanation`)}
            >
              前の解説
            </Button>
            <Button innerClass={styles.footerButtonLg} type="white-square-wide">
              解答結果に戻る
            </Button>
            <Link to={`/training/integrated-exam/listening/${nextId}/explanation`}>
              <Button
                innerClass={styles.footerButtonSm}
                type={clsx(`${(currentPage == 3) ? `lightgray-square-wide`:`white-square-wide`}`)}
              >
                次の解説
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Explanation;
