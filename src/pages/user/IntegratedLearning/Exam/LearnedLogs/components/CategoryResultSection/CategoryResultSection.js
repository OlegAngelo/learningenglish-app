import React from 'react';
import { Link } from 'react-router-dom';

import { upperCaseFirst } from '../../../../../../../utils/text';

import QuestionResultItem from '../../../../../../../shared/QuestionResultItem';

const CategoryResultSection = ({ data }) => {
  const { results } = data;
  const sectionTitle = `${upperCaseFirst(data.categoryType)} ${data.categoryTitle}`;

  return (
    <div className="pt-px-20 pb-px-23 bg-basic-400">
      <p className="ml-px-19 font-bold text-16 leading-px-23 text-primary-500">
        {sectionTitle}
      </p>

      <div className="mx-px-10 mt-px-17 grid grid-cols-1 gap-2">
        {results.map((resultItem, index) => (
          <Link to={`/training/integrated-result/${data.categoryType}/learned-logs/question/${index}`}>
            <QuestionResultItem
              key={index}
              questionNumber={resultItem.question.order}
              textRightSpaceInPx={70}
            >
              <p className="font-bold font-hiragino-kaku text-14 leading-px-21 text-basic-100">
                {resultItem.question.title}
              </p>
            </QuestionResultItem>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryResultSection;
