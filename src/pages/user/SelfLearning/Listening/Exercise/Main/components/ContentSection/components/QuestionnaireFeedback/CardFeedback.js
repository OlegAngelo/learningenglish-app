import React, { Fragment } from 'react';

const CardFeedback = ({ currentState, feedbackConstants, phraseLog }) => {
  const ResultWithSpeakingEnabled = () => {
    switch (currentState) {
      case 'resultWithSpeakingEnabled':
        return (
          <div
            className={`mx-px-8 min-h-px-88 py-px-12 px-px-16 bg-white ${
              feedbackConstants.default.borderClassname
            }`}
          >
            <span
              className='text-basic-100 font-bold text-20'
              dangerouslySetInnerHTML={{
                __html: phraseLog?.feedbackHTMLChangeColor,
              }}
            />
          </div>
        );
      default:
        return (
          <div
            className={`mx-px-8 min-h-px-88 py-px-12 px-px-16 bg-white ${
              feedbackConstants[phraseLog?.feedback].borderClassname
            }`}
          >
            <span
              className='text-basic-100 font-bold text-20'
              dangerouslySetInnerHTML={{
                __html: phraseLog?.feedbackHTML,
              }}
            />
          </div>
        );
    }
  };

  return (
    <Fragment>
      {currentState === 'resultWithSpeakingDisabled' && (
        <div className={feedbackConstants[phraseLog?.feedback].textClassname}>
          {feedbackConstants[phraseLog?.feedback].message}
        </div>
      )}

      <ResultWithSpeakingEnabled />
    </Fragment>
  );
};

export default CardFeedback;
