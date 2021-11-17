import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '../../../shared/Button';
import CardImage from './components/CardImage';
import ToggleSwitch from '../../../shared/ToggleSwitch';

import style from './LearningEnvironment.module.css';
import MotivationApi from '../../../api/MotivationApi';

const LearningEnvironment = (props) => {
  const history = useHistory();
  const location = useLocation();
  const envNextPage = localStorage.getItem('env_next_page');
  const userEnableSpeaking = localStorage.user_enable_speaking
    ? JSON.parse(localStorage.getItem('user_enable_speaking'))
    : 1;
  const [isSubmittingMotivation, setIsSubmittingMotivation] = useState(false);
  const isFromLecture = !!(location.state && location.state.lectureId);

  const saveMotivation = async () => {
    if (isFromLecture) return history.push(`/training/muscle-exam/${location.state.lectureId}${location.search}`)
    const payload = {
      userEnableSpeaking: JSON.parse(localStorage.getItem('user_enable_speaking')),
      userMotivation: JSON.parse(localStorage.getItem('user_motivation')),
    };

    setIsSubmittingMotivation(true);

    await MotivationApi.saveMotivationAndEnvCheck(payload)
      .then(() => {
        localStorage.removeItem('user_motivation');
        localStorage.removeItem('env_next_page');
      })
      .catch(error => console.error(error));

    setIsSubmittingMotivation(false);

    if (envNextPage === null) {
      history.push('/');
    } else {
      history.push(envNextPage);
    }
  };

  const textJa = {
    step_2_learning_environment: 'Step2 学習環境',
    what_is_your_current_learning_environment: '今のあなたの学習環境は？',
    start_muscle_training_exam: '筋トレを開始',
    display_recommended_trainings: 'おすすめトレーニングの表示',
    start_exercise: 'Start',
    practice_question: '確認問題',
    video_questions: '動画に基づいた問題を出題します',
  };

  const submitButtonText = envNextPage === null
    ? textJa.display_recommended_trainings
    : textJa.start_muscle_training_exam;

  return (
    <div className={`h-screen w-full flex items-center bg-primary-500 text-center text-basic-400`}>
      <div className={`h-full w-full ${style.container} flex flex-col justify-between`}>
        <div>
          <div className={`text-14 font-bold mb-px-8 ${style.stepText}`}>
            {isFromLecture
              ? textJa.practice_question
              : textJa.step_2_learning_environment
            }
          </div>
          <p className="text-20 font-bold leading-px-2 mb-px-25">
            {isFromLecture
              ? textJa.video_questions
              : textJa.what_is_your_current_learning_environment
            }
          </p>
          <CardImage
            className={style.imageContainer}
            imgClass={`mx-px-20 ${style.image}`}
            imgSrc="/images/recommendation_2.png"
          />
          {!isFromLecture && (
            <div className="flex justify-center align-center">
              <p className="text-16 font-bold mr-px-66">Speaking</p>
              <ToggleSwitch on={userEnableSpeaking} />
            </div>
          )}
        </div>
        <div className="mt-5 flex justify-center bg-primary-500">
          <Button
            innerClass={`font-bold ${style.button} disabled:bg-basic-300 cursor-pointer`}
            type="white-square-wider"
            onClick={() => saveMotivation()}
            disabled={isSubmittingMotivation}
          >
            {isFromLecture
              ? textJa.start_exercise
              : submitButtonText
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningEnvironment;
