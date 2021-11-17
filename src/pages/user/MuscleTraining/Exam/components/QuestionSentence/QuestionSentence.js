import React, { Fragment } from 'react';
import {  useSelector } from 'react-redux';

import { getUnderlinedTextValueForTags, removeSpecialCharacters } from '../../../../../../utils/text';
import questionHelper from '../../../../../../utils/questionHelper';

const QuestionSentence = ({
  onCommentaryPage,
  onResponsePage,
  typing,
  sentence,
  fullQuestion = '',
  hasTyped = false,
  isTimerEnded,
  withStyleCommentary = false,
  category,
}) => {
  const isLastWord = (index) => index === sentence.length - 1;
  const isWordTypeAnswer = (word) => word.type === 'answer';
  const isCorrectAnswer = (word) => isWordTypeAnswer(word) && word.correct;
  const noAnswerChosen = (word) => isWordTypeAnswer(word) && !word.selected;
  const {hasChoice} = useSelector(state => state.exam)
  const categoriesWithTags = ['word-typing']; 

  /**
   * Returns color depending on the type of
   * screen (correct, incorrect, commentary)
   * @param {string} word
   */
  const getUnderlinedTextColor = (word) => {
    const hasNoRedColor = !['vacancy-filling-problem', 'word-typing'].includes(category);

    if ((!isTimerEnded && noAnswerChosen(word)) || onCommentaryPage) return '#0C5F8D';
    if ((isTimerEnded || !isCorrectAnswer(word)) && hasNoRedColor) return '#E34E42';

    return '#03DAC6';
  };

  const getTextValue = (word) => {
    if (hasChoice || hasTyped || (isTimerEnded && !hasChoice)) {
      return word.typingFinal;
    }
  };

  const getFontSize = () => {
    const sentenceFormatted = questionHelper.formatQuestionSentence(fullQuestion);
    const charactersCount = sentenceFormatted.length;

    return charactersCount === 27 ? 'text-20' : '';
  };

  const showTagsInQuestion = (word) => {return categoriesWithTags.includes(category) && word.tagIdentifier};

  return (
    <div className={getFontSize()}>
      {!onCommentaryPage || withStyleCommentary
        ? sentence.map((word, index) => (
            <div className="inline-block" key={index}>
              {word.type === 'word' ? (
                <span>{word.text}</span>
              ) : (
                <Fragment>
                  {(showTagsInQuestion(word) && (!onCommentaryPage && !onResponsePage)) ? (
                    <Fragment>
                      <div className="inline-grid">
                        <div className="flex space-x-px-3">
                          {getUnderlinedTextValueForTags(word, typing)}
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div
                        className="inline-block"
                        style={{
                          borderBottom: '2px solid',
                          color: getUnderlinedTextColor(word),
                          lineHeight: '22px',
                          minWidth: noAnswerChosen(word) && !isTimerEnded  ? '2em' : '0em',
                          textTransform: word.id == 0 ? 'capitalize' : 'none',
                        }}
                      >
                        {getTextValue(word)}
                      </div>
                    </Fragment>
                  )}
                  <span>{word.sentenceBreaks}</span>
                </Fragment>
              )}
              {!isLastWord(index) && <span>&nbsp;</span>}
            </div>
          ))
        : removeSpecialCharacters(fullQuestion)
      }
    </div>
  );
};

export default QuestionSentence;
