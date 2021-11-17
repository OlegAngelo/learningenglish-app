import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { removeSpecialCharacters } from '../../../../../../utils/text';
import { updateChecklist } from '../../../../../../utils/checklistHelper';
import { toggleIsChecked } from '../../../../../../redux/checklist/slice';

import Tag from '../../../../../../shared/Tag';
import Checked from '../../../../../../shared/icons/CheckBoxCheckedIcon';
import UnChecked from '../../../../../../shared/icons/CheckBoxUncheckedIcon';

import style from './LearnedWordsPhrase.module.css';

const LearnedWordsPhrase = ({ category, className = '', data, isToggledOn = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isWord = category === 'word';

  const getStatus = (training) => {
    const status = training.training_vocabularies_status.name;

    return status === 'master' ? 'Mastered !' : 'In Progress';
  };

  const getTagProps = (training) => {
    const status = getStatus(training);

    let props = {
      color: 'darkGray',
      size: 'm',
      width: '115.61px',
      light: 'true',
    };

    if (status === 'Mastered !') {
      props.color = 'orange';
    } else if (status === 'In Progress') {
      props.color = 'darkGreen';
    }

    return props;
  };

  const renderList = () => {
    if (!data) return;

    return data.map((training, index) => {
      const {
        is_checked: isChecked,
        training_unit_id: unitId,
        training_vocabularyable: question,
      } = training;
      const title = isWord ? question.title : removeSpecialCharacters(question.title);
      const meaning = isWord ? question.meaning : question.translation;

      const toggleCheckLabel = () => {
        const updatedChecklist = [
          {
            userProficiencyVocabularyId: training.id,
            isChecked: !isChecked,
          },
        ];

        updateChecklist(updatedChecklist);
        dispatch(
          toggleIsChecked({ category, index })
        );
      };
 
      const redirectLink = () => {
        const unitId = training.training_vocabularyable.training_unit_id;
        const previousPage = localStorage.getItem('course_result_prev_page');
        
        history.push(`/training/muscle-courses/check-list/commentary/${training.id}/${category}`);
      };
      
      return (
        <div className="h-auto bg-basic-400 mb-px-3" key={training.id}>
          <div className="pt-px-15 pr-px-15 pb-px-16 pl-px-14">
            <div className="flex">
              <div className="text-sm">
                Unit {unitId}
              </div>
            </div>
            <div className="flex -mt-px-2 font-bold text-basic-100 text-16 pb-1">
              <div className="flex">
                <label onClick={toggleCheckLabel}>
                  <span>{isChecked ? <Checked /> : <UnChecked />}</span>
                </label>
              </div>
              <div className="flex-1 flex-col pl-2 font-hiragino-kaku" onClick={() => redirectLink()}>
                <span>{title}</span>
                <div className="font-normal text-basic-200 text-14 h-px-50">{isToggledOn ? meaning : ''}</div>
              </div>
              <div className="flex justify-end ml-3">
                <Tag {...getTagProps(training)}>
                  {getStatus(training)}
                </Tag>
              </div>
            </div>
          </div>
        </div>
    );
    });
  };

  return <div className={`pt-2.5 pb-px-72 bg-background-200 ${className} ${style.container}`}>{renderList()}</div>;
};

export default LearnedWordsPhrase;
