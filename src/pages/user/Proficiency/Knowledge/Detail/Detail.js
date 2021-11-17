import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import LearnedWordsPhrase from './components/LearnedWordsPhrase';
import Footer from '../../../../../shared/Footer';
import Header from '../../../../../shared/Header';
import Loading from '../../../../../shared/Loading';
import Menu from '../../../../../shared/Menu';
import Tab from '../../../../../shared/Menu/components/Tab';

import style from './Detail.module.css';

import trainingApi from '../../../../../api/TrainingApi';

const Detail = () => {
  const { category, courseId } = useParams();
  const [selected, setSelected] = useState(category);
  const [trainingData, setTrainingData] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const wordRoute = `/proficiency/knowledge/words/${courseId}`;
  const phraseRoute = `/proficiency/knowledge/phrases/${courseId}`;

  useEffect(() => {
    setFetchingData(true);

    trainingApi
      .getTrainings(courseId, category)
      .then(({ data }) => {
        setTrainingData(data[`training_${category}`]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFetchingData(false);
      });
  }, [selected]);

  return (
    <div className="pb-28 bg-background-200 h-screen">
      <div className={`fixed w-full z-10 ${fetchingData && style.header}`}>
        <div>
          <Header
            hasBack={true}
            title={`筋トレUnit ${courseId}`}
          />
        </div>
        <div className={`-mt-px-1 ${style.phraseMenu}`}>
          <Menu bgColor="primary-500" spaceX="7" paddingX="4" paddingY="3">
            <Link to={wordRoute}>
              <Tab
                to={wordRoute}
                type="rounded4"
                isActive={selected === 'words'}
                onClick={() => setSelected('words')}
              >
                単語
              </Tab>
            </Link>
            <Link to={phraseRoute}>
              <Tab
                to={phraseRoute}
                type="rounded4"
                isActive={selected === 'phrases'}
                onClick={() => setSelected('phrases')}
              >
                フレーズ
              </Tab>
            </Link>
          </Menu>
        </div>
      </div>

      {fetchingData ? (
        <Loading
          className="top-6 bg-background-200"
          iconClass="bg-primary-500 text-primary-500"
          zIndex="z-0"
        />
      ) : (
        <LearnedWordsPhrase
          category={category}
          data={trainingData}
          key={selected}
        />
      )}

      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Detail;
