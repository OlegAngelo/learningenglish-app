import React, { useState } from 'react';

import style from './ChoiceQuestion.module.css';

const ChoiceQuestion = ({className, question, setQuestion, showExplanation, setIsSelectedChoiceCorrect}) => {
  const [choiceEvaluation, setChoiceEvaluation] = useState('');
  const [hasAnswer, setHasAnswer] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState();
  const evaluation = {
    correct: {
      message: 'Not Bad.'
    },
    incorrect: {
      message: ''
    }
  };

  const selectChoice = (index) => {
    if (question.choices[index].isAnswered) {
      return;
    }
    setSelectedChoice(index);
    if (question.choices[index].isCorrect === true) {
      setChoiceEvaluation('correct');
      setIsSelectedChoiceCorrect(true);
    } else {
      setChoiceEvaluation('incorrect');
    }
    setHasAnswer(true);
    setQuestion({
      ...question,
      choices: question.choices.map((item, i) => {
        return (i === index) ? {...item, isAnswered: true} : item;
      })
    });
    setTimeout(() => {
      showExplanation(index);
    }, 2000);
  };
  
  const choiceStyle = (index) => {
    if (hasAnswer && index === selectedChoice && choiceEvaluation === 'incorrect') {
      return style.incorrect;
    } else if (hasAnswer && index === selectedChoice && choiceEvaluation === 'correct') {
      return style.correct;
    } else if (question.choices[index].isAnswered) {
      return style.disabled;
    }
  };

  return (
    <div className={`font-hiragino ${className}`} >
      {
        hasAnswer && (
          <div className={`text-center text-24 ${style[`evaluation-${choiceEvaluation}`]}`}>
            {evaluation[choiceEvaluation].message}
          </div>
        )
      }
      {question.choices.map((item, index) => {
        return (
          <div
            onClick={() => selectChoice(index)}
            key={index}
            className={`bg-white flex px-px-16 py-px-4 mb-px-8 ${
              style.choiceContainer
            } ${choiceStyle(index)}`}
          >
            <span className={`self-center whitespace-pre-line`}>{item.choice}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceQuestion;
