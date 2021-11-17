import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import WordPhraseItem from './components/WordPhraseItem/WordPhraseItem';
import Footer from '../../components/QuestionnaireFooter';
import Header from '../../../../../shared/Header/Header';
import Loading from '../../../../../shared/Loading';

import trainingApi from '../../../../../api/TrainingApi';

// Utils
import { sortByStatus } from '../../../../../utils/proficiencyHelper';
import { removeSpecialCharacters } from '../../../../../utils/text';
import breadcrumb from '../../../../../utils/breadcrumb';

const WordPhraseList = () => {
  const history = useHistory();
  const { questionId } = useParams();
  const search = useLocation().search;
  const questionType = new URLSearchParams(search).get('questionType');
  const [questionData, setQuestionData] = useState(null);

  const checkStatus = (vocabularies) => {
    if(!vocabularies || vocabularies.length < 1) {
      return 'not-tried';
    } else if (vocabularies[0].training_vocabularies_status_id === 1) {
      return 'master';
    } else if (vocabularies[0].training_vocabularies_status_id === 2) {
      return 'in-progress';
    } else {
      return 'not-tried';
    }
  }

  const exitExam = () => {
    let fromChecklist = localStorage.getItem('fromChecklist') === 'true'

    if (fromChecklist) {
      breadcrumb.back( route => {
        history.push(route);
      });
    } else {
      history.push('/')
    }

    localStorage.removeItem('fromChecklist')
  }

  useEffect(() => {
    trainingApi
    .getTrainings(questionId, questionType)
    .then(({ data }) => {
      if(questionType === 'words'){
        setQuestionData(sortByStatus(data.training_words));
      } else {
        setQuestionData(sortByStatus(data.training_phrases));
      }

    })
    .catch((error) => {
      console.error(error);
    })

    // remove muscle-result route from breadcrumbs
    let toBeRemovedRoutes = [
      /^\/training\/muscle-result\/\d+$/,
    ];

    breadcrumb.remove(toBeRemovedRoutes);
  }, []);

  return questionData ? (
    <div className="flex flex-col h-screen">
      <Header hasBack={false} title={ questionType === "words" ? "単語" : "フレーズ一覧" } />

      <div className="content bg-background-200 flex-1 overflow-y-scroll pb-px-140">
      {questionData.map((item, index) => (
          <WordPhraseItem
            title={removeSpecialCharacters(item.title)}
            status={checkStatus(item.user_proficiency_vocabularies)}
            subtitle={questionType === "words" ? item.meaning : item.translation}
            key={index}
          />
        ))}
      </div>

      <Footer hasNext={true} nextQuestion={() => exitExam()} />
    </div>
  ) : (<Loading height="h-screen" rootPosition="relative" />);
};

export default WordPhraseList;
