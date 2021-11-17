import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../../../../shared/Header';
import Alert from '../../../../../shared/Alert';
import Button from '../../../../../shared/Button';
import Footer from '../../../../../shared/Footer';
import Loading from '../../../../../shared/Loading';
import CourseList from '../../components/CourseList';
import BrainIcon from '../../../../../shared/icons/BrainIcon';
import SpellingIcon from '../../../../../shared/icons/SpellingIcon';
import ListeningIcon from '../../../../../shared/icons/ListeningIcon';
import CommunicationIcon from '../../../../../shared/icons/CommunicationIcon';

import { useSetting } from '../../../../../hooks/useSetting';
import { fetchSelectedUnit } from '../../../../../redux/unit/slice';
import { fetchLastMotivationTimestamp } from '../../../../../redux/training/slice';
import { selectedUnit, isFetchingUnit } from '../../../../../redux/unit/selectors';
import { lastMotivationTimestamp } from '../../../../../redux/training/selectors';
import { getUrlBasedOnLastTrainingTime } from '../../../../../utils/trainingHelper';

import styles from './Settings.module.css';

const Settings = () => {
  const dispatch = useDispatch();
  const unit = useSelector(selectedUnit);
  const motivationTimestamp = useSelector(lastMotivationTimestamp);
  const history = useHistory();
  const { id } = useParams();
  const {
    learningCategories,
    learningTypes,
    showCategories,
    questionTypes,
    hideSpeakingTypes,
    categoryTitle,
    learningCategoryOnClick,
    learningTypeOnClick,
    getSelectedData,
    questionTypeOnClick,
    setData,
    hasSelected,
  } = useSetting();
  const getButtonClasses = (value) => value ? 'lightblue' : 'lightblue-outline';
  const loading = useSelector(isFetchingUnit);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const headerProps = {
    hasBack: true,
    title: '筋トレコース一覧',
  };

  const handleRedirect = (route) => {
    localStorage.setItem(
      'prev_route',
      `/training/muscle-courses/${id}/settings`
    );
    localStorage.setItem('unit_id', id);
    history.push(getUrlBasedOnLastTrainingTime(motivationTimestamp, route));
  };

  const handleFetchQuestions = () => {

    const { learningType, questionType, categories } = getSelectedData();

    if (!unit.question_counts[learningType]) {
      setErrMsg(learningType == 'word' ? '出題可能な単語がありません。' : '出題可能なフレーズがありません。');
      setShowErrorModal(true);
      return;
    }

    if (hasSelected()) {

      localStorage.setItem('selected_question_type', questionType);
      handleRedirect(
        `/training/muscle-exam/${id}?learningType=${learningType}&questionType=${questionType}&categories=${categories}`
      );
    }
  }

  useEffect(() => {
    dispatch(fetchSelectedUnit(id));
    dispatch(fetchLastMotivationTimestamp());
  }, []);

  useEffect(() => {
    if (unit) {
      setData(unit);
    }
  }, [unit]);

  return loading ? (
    <div className="h-screen">
      <Header
        {...headerProps}
        rootClass="fixed z-10 w-full"
      />
      <Loading
        className="top-0 bg-background-200"
        iconClass="bg-primary-500 text-primary-500"
        height="h-screen"
        rootPosition="relative"
        zIndex="z-0"
      />
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  ) : (
    <div>
      <Header {...headerProps} />
      <div className="mt-px-3">
        <CourseList
          unitTitle={unit.unit.name}
          word={unit.proficiency.word}
          phrase={unit.proficiency.phrase}
          unitId={unit.unit.id}
          hasRightIcon={false}
        />
      </div>
      <div className="bg-basic-400 pb-0 flex flex-col">
        <div
          className={`pt-px-13 mb-px-1 border-b border-background-200 ${styles.settingsContent}`}
        >
          <div className="pl-5 pb-px-15 border-b border-background-200">
            <h1 className="text-primary-400 font-bold text-lg">学習の種類</h1>
            <div className="mt-px-4 -ml-px-1 flex space-x-2">
              <Button
                type={getButtonClasses(learningTypes['word'])}
                onClick={() => learningTypeOnClick('word')}
              >
                単語
              </Button>
              <Button
                type={getButtonClasses(learningTypes['phrase'])}
                onClick={() => learningTypeOnClick('phrase')}
              >
                フレーズ
              </Button>
            </div>
          </div>
          <div className="pl-5 pb-px-15 pt-px-13 mb-px-1 border-b border-background-200">
            <h1 className="text-primary-400 font-bold text-lg">出題のタイプ</h1>
            <div className="mt-px-4 -ml-px-1 flex space-x-2">
              <Button
                type={getButtonClasses(questionTypes['notTried'].selected)}
                onClick={() => questionTypeOnClick('notTried')}
                disabled={questionTypes['notTried'].disabled}
              >
                Not Tried
              </Button>
              <Button
                type={getButtonClasses(questionTypes['inProgress'].selected)}
                onClick={() => questionTypeOnClick('inProgress')}
                disabled={questionTypes['inProgress'].disabled}
              >
                In Progress
              </Button>
              <Button
                type={getButtonClasses(questionTypes['master'].selected)}
                onClick={() => questionTypeOnClick('master')}
                disabled={questionTypes['master'].disabled}
              >
                Mastered
              </Button>
            </div>
          </div>
          <div className="pl-5 pt-px-14 mb-px-1">
            <div className="flex">
              <h1 className="text-14 text-primary-400">
                {categoryTitle}
              </h1>
              {questionTypes['master'].selected && (
                <p className="text-14 self-center text-primary-400">
                  (問題形式選択可)
                </p>
              )}
            </div>

            {showCategories ? (
              <Fragment>
                <div className="flex mt-2">
                  <BrainIcon width="20" height="20" color="#43596D" />
                  <h3 className="text-primary-400 font-bold text-sm ml-1">
                    意味理解を伸ばす
                  </h3>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Button
                    type={getButtonClasses(learningCategories['meaningSelection'])}
                    onClick={() => learningCategoryOnClick('meaningSelection')}
                  >
                    意味選択
                  </Button>
                  <Button
                    type={getButtonClasses(learningCategories['englishSelection'])}
                    onClick={() => learningCategoryOnClick('englishSelection')}
                  >
                    英語選択
                  </Button>
                  {/* <Button
                    type={getButtonClasses(learningCategories['sentenceSelection'])}
                    onClick={() => learningCategoryOnClick('sentenceSelection')}
                  >
                    文章意味選択
                  </Button> */}
                </div>

                {!hideSpeakingTypes && (
                  <Fragment>
                    <div className="flex mt-px-19">
                      <CommunicationIcon width="20" height="20" color="#43596D" />
                      <h3 className="text-primary-400 font-bold text-sm ml-1">
                        発音を伸ばす
                      </h3>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button
                        type={getButtonClasses(learningCategories['voiceUtterance'])}
                        onClick={() => learningCategoryOnClick('voiceUtterance')}
                      >
                        音声発話
                      </Button>
                      {learningTypes.phrase && (
                        <Button
                          type={getButtonClasses(learningCategories['instantUtterance'])}
                          onClick={() => learningCategoryOnClick('instantUtterance')}
                        >
                          瞬間発話
                        </Button>
                      )}
                      {learningTypes.word && (
                        <Button
                          type={getButtonClasses(learningCategories['speechRecognition'])}
                          onClick={() => learningCategoryOnClick('speechRecognition')}
                        >
                          発話型英語選択
                        </Button>
                      )}
                      {/*
                        <Button
                          type={getButtonClasses(learningCategories['shadowing'])}
                          onClick={() => learningCategoryOnClick('shadowing')}
                        >
                          シャドーイング
                        </Button>
                      */}
                    </div>
                  </Fragment>
                )}

                <div className="flex mt-px-19">
                  <ListeningIcon width="20" height="20" color="#43596D" />
                  <h3 className="text-primary-400 font-bold text-sm ml-1">
                    音声認識を伸ばす
                  </h3>
                </div>
                <div className="mt-px-10 flex space-x-2">
                  <Button
                    type={getButtonClasses(learningCategories['voiceMeaningSelection'])}
                    onClick={() => learningCategoryOnClick('voiceMeaningSelection')}
                  >
                    音声意味選択
                  </Button>
                  <Button
                    type={getButtonClasses(learningCategories['voiceListening'])}
                    onClick={() => learningCategoryOnClick('voiceListening')}
                  >
                    音声リスニング
                  </Button>
                </div>

                <div className="flex mt-px-21 ml-px-2">
                  <SpellingIcon width="18" height="18" color="#43596D" />
                  <h3 className="text-primary-400 font-bold text-sm ml-1">
                    {learningTypes.word ? 'スペリングを伸ばす' : '構造理解を伸ばす'}
                  </h3>
                </div>
                <div className="mt-px-7 flex space-x-px-6">
                  <Button
                    type={getButtonClasses(learningCategories['spelling'])}
                    onClick={() => learningCategoryOnClick('spelling')}
                  >
                    空所補充タイピング
                  </Button>
                  {learningTypes.word ? (
                    <Button
                      type={getButtonClasses(learningCategories['voiceSpelling'])}
                      onClick={() => learningCategoryOnClick('voiceSpelling')}
                    >
                      音声スペル
                    </Button>
                  ) : (
                    <Button
                      type={getButtonClasses(learningCategories['instantComposition'])}
                      onClick={() => learningCategoryOnClick('instantComposition')}
                    >
                      瞬間作文
                    </Button>
                  )}
                </div>
                {learningTypes.phrase && (
                  <div className="mt-px-7 flex space-x-px-6">
                    <Button
                      type={getButtonClasses(learningCategories['wordSelection'])}
                      onClick={() => learningCategoryOnClick('wordSelection')}
                    >
                      空所補充選択
                    </Button>
                  </div>
                )}
              </Fragment>
            ) : (
              <div style={{ height: '235px' }}></div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className={`${ hasSelected() ? `bg-primary-500` : `bg-primary-100`} mt-px-40 ${styles.settings}`}
              onClick={() => handleFetchQuestions()}
            >
              <p
                className={`text-center text-sm text-basic-400 -mt-px-4 ${styles.textsettings}`}
              >
                この設定で学習スタート
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
      <Alert
        show={showErrorModal}
        msg={errMsg}
        callBack={() => setShowErrorModal(false)}
      />
    </div>
  );
};

export default Settings;
