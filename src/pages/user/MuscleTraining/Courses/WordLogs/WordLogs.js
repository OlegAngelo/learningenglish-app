import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Footer from '../../../../../shared/Footer';
import Header from '../../../../../shared/Header';
import Menu from '../../../../../shared/Menu';
import Tab from '../../../../../shared/Menu/components/Tab';
import Loading from '../../../../../shared/Loading/Loading';
import WordPhraseItem from '../../Exam/WordPhrasesResult/components/WordPhraseItem';

import trainingApi from '../../../../../api/TrainingApi';

import { sortByStatus } from '../../../../../utils/proficiencyHelper';
import { removeSpecialCharacters } from '../../../../../utils/text';

const WordLogs = () => {
  const { courseId } = useParams();
  const [questionData, setQuestionData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [trainingName, setTrainingName] = useState('');
  const questionType = 'words'

  const checkStatus = (vocabularies) => {
    if (!vocabularies || vocabularies.length < 1) {
      return 'not-tried';
    } else if (vocabularies[0].training_vocabularies_status_id === 1) {
      return 'master';
    } else if (vocabularies[0].training_vocabularies_status_id === 2) {
      return 'in-progress';
    } else {
      return 'not-tried';
    }
  }

  useEffect(() => {
    trainingApi
      .getTrainings(courseId, questionType)
      .then(({ data }) => {
        setQuestionData(sortByStatus(data.training_words));
        setTrainingName(data.training_unit.name)
        setIsFetching(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  return (
    <div className={`pb-44 bg-background-200 ${!questionData.length && 'h-full'}`}>
      <div className="fixed top-0 z-10 w-full">
        <Header
          hasBack={true}
          title={trainingName}
          titleClass="h-px-20"
        />
        <div className="-mt-px-1">
          <Menu
            bgColor="primary-500"
            spaceX="7"
            paddingX="4"
            paddingY="3"
          >
            <Link to={`/training/muscle-courses/${localStorage.getItem('course_result_id')}/lesson-log/result`}>
              <Tab type="rounded3">学習結果</Tab>
            </Link>
            <Link to={`/training/muscle-courses/${courseId}/lesson-log/words`}>
              <Tab type="rounded3" isActive>単語</Tab>
            </Link>
            <Link to={`/training/muscle-courses/${courseId}/lesson-log/phrases`}>
              <Tab type="rounded3">フレーズ</Tab>
            </Link>
          </Menu>
        </div>
      </div>

      {(!isFetching && !questionData.length) && (
        <p className="text-center mt-32 font-bold">該当するデータが見つかりませんでした。</p>
      )}

      {isFetching ? (
        <Loading
          className="top-6 bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
          height="h-screen"
          rootPosition="relative"
        />
      ) : (
        <div className="mt-px-110 pt-px-5">
          {questionData.map((item, index) => (
            <WordPhraseItem
              title={removeSpecialCharacters(item.title)}
              status={checkStatus(item.user_proficiency_vocabularies)}
              subtitle={item.meaning}
              key={index}
            />
          ))}
        </div>
      )}

      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default WordLogs;
