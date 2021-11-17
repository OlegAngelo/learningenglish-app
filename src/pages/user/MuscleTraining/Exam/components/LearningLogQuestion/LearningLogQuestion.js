import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Tag from '../../../../../../shared/Tag/Tag';
import Circle from '../../../../../../shared/icons/Circle';
import LightBulb from '../../../../../../shared/icons/LightBulb';
import Checked from '../../../../../../shared/icons/CheckBoxCheckedIcon';
import UnChecked from '../../../../../../shared/icons/CheckBoxUncheckedIcon';
import KeyboardArrowRight from '../../../../../../shared/icons/KeyboardArrowRight';

import { removeSpecialCharacters } from '../../../../../../utils/text';
import { pushToUpdatedChecklist } from '../../../../../../utils/checklistHelper';

import { updateTrainingResultData } from '../../../../../../redux/training/slice';

import style from './LearningLogQuestion.module.css';

const LearningLogQuestion = ({ categoryType, trainingLog }) => {
  const dispatch = useDispatch();
  const { user_proficiency } = trainingLog;
  const { is_checked: isChecked } = user_proficiency;
  const redirectLink = () => {
    const unitId = user_proficiency.training_vocabularyable.training_unit_id;
    const previousPage = localStorage.getItem('course_result_prev_page');

    if (previousPage === 'muscle-courses') {
      return `/training/muscle-courses/commentary/${trainingLog.id}?unitId=${unitId}&category=${categoryType}`;
    }
    return `/training/muscle-exam/commentary/${trainingLog.id}`;
  };

  const displayQuestionType = (type) => {
    let text = '';
    switch (type) {
      case 'meaning-selection':
          text='意味選択';
          break;
      case 'english-speech-recognition':
          text='音声認識型英単語選択';
          break;
      case 'voice-meaning-selection':
          text='音声意味選択';
          break;
      case 'voice-spelling-input':
          text='音声 スペル入力';
          break;
      case 'voice-utterance':
          text='音声発話';
          break;
      case 'phrase-meaning-selection':
          text='フレーズ 意味選択';
          break;
      case 'voice-meaning-selection-problem':
          text='音声 意味選択問題';
          break;
      case 'vacancy-replenishment-typing':
          text='空所補充タイピング';
          break;
      case 'voice-listening':
          text='音声リスニング';
          break;
      case 'phrase-english-selection':
          text='フレーズ 英語選択';
          break;
      case 'instant-composition':
          text='瞬間作文';
          break;
      case 'spelling':
          text='スペリング';
      case 'phrase-voice-listening':
          text='フレーズ 音声リスニング';
          break;
      case 'english-selection':
          text='英語選択';
          break;
      case 'instant-utterance':
          text='瞬間発話';
          break;
      case 'vacancy-filling-problem':
          text='空所補充問題';
          break;
      default:
          text='意味選択';
          break;
    }
    return text;
  };

  const toggleCheckLabel = () => {
    pushToUpdatedChecklist(user_proficiency);
    updateChecklist();
  };

  const updateChecklist = () => {
    dispatch(updateTrainingResultData({
      id: user_proficiency.id,
      type: categoryType,
    }));
  };

  const getEvaluation = (result) => {
    if (result.answer_evaluation === null) {
      return false;
    }

    let answer =
      result.answer_evaluation.toLowerCase() !== 'keep it up!' &&
      result.answer_evaluation.toLowerCase() !== 'failed...';

    return answer && !result.is_skipped;
  };

  return (
    <div className={clsx(`${getEvaluation(trainingLog) ? 'bg-white' : style.questionCardCompleted} relative border border-primary-100 box-border text-basic-100 font-bold ${style.questionCard}`)}>
      <div className={`flex ${style.questionCardContent}`}>
        <div className={`absolute ${style.circleIcon}`}>
          {getEvaluation(trainingLog) && <Circle className={`fill-white ${style.circleIcon}`} />}
        </div>
        <div className={`absolute ${style.lightBulbIcon}`}>
          {trainingLog.is_used_hint ? <LightBulb className={`fill-white ${style.lightBulbIcon}`} /> : ''}
        </div>

        <div className="ml-10 mr-5">
          <div style={{ paddingLeft: '1px' }}>
            <span>{removeSpecialCharacters(user_proficiency.training_vocabularyable.title)}</span>
          </div>

          <div className={`inline-flex`}>
            <Tag
              className={`font-theme-normal px-px-8 ${style.tagContent}`}
              color="gray"
              size={displayQuestionType(trainingLog.question_type.name).length > 10 ? 's' : 'xs'}
              width="70px"
              pill
              weightLight
            >
              {displayQuestionType(trainingLog.question_type.name)}
            </Tag>

            <label
              className={style.checkboxContent}
              onClick={() => toggleCheckLabel()}
            >
              <span>{isChecked ? <Checked /> : <UnChecked />}</span>
              <span
                className="text-primary-400 text-12 font-theme-normal"
                style={{ marginLeft: '0.29rem' }}
              >
                CheckListに追加
              </span>
            </label>
          </div>
        </div>

        <Link
          className="absolute top-0 right-0 h-full w-1/4"
          to={redirectLink()}
        >
          <div className="absolute top-0 right-px-14 h-full flex items-center">
            <KeyboardArrowRight color="rgba(0, 0, 0, 0.54)" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LearningLogQuestion;
