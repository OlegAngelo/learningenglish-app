import React, { Fragment } from 'react';

const QuestionField = ({ phraseData, preSentenceProps, postSentenceProps }) => {
  const { pre_sentence, post_sentence } = phraseData;

  if (pre_sentence === null && post_sentence === null) return null;

  return (
    <Fragment>
      <div className="mb-px-40">
        <div className="mb-2">
          <label
            htmlFor={preSentenceProps.id}
            className="text-adminGray-400 text-12 font-bold mb-px-8"
          >
            問題文1
          </label>
        </div>

        <textarea
          style={{ height: '72px', width: '560px' }}
          className="resize-none m-w-full text-14 leading-px-24 rounded-px-2 font-normal border-px-2 
            border-adminGray-200 text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none"
          id={preSentenceProps.id}
          name={preSentenceProps.name}
          ref={preSentenceProps.register}
        ></textarea>
        {preSentenceProps.errors && <p className="text-red-500 mt-px-2">{preSentenceProps.errors.message}</p>}
      </div>

      <div className="mb-px-40">
        <div className="mb-2">
          <label
            htmlFor={postSentenceProps.id}
            className="text-adminGray-400 text-12 font-bold mb-px-8"
          >
            問題文2
          </label>
        </div>

        <textarea
          style={{ height: '72px', width: '560px' }}
          className="resize-none m-w-full text-14 leading-px-24 rounded-px-2 font-normal border-px-2 
            border-adminGray-200 text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none"
          id={postSentenceProps.id}
          name={postSentenceProps.name}
          ref={postSentenceProps.register}
        ></textarea>
        {postSentenceProps.errors && <p className="text-red-500 mt-px-2">{postSentenceProps.errors.message}</p>}
      </div>
    </Fragment>
  );
};

export default QuestionField;
