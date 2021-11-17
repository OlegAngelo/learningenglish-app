import React, { Fragment, useState, useEffect } from 'react';
import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon';

const AnswersField = ({
  phraseData,
  firstAnswerFieldProps,
  secondAnswerFieldProps,
  thirdAnswerFieldProps,
  correctAnswerDefaultValue,
}) => {
  const { sentence } = phraseData;
  const [answerFieldInputCount, setAnswerFieldInputCount] = useState(correctAnswerDefaultValue.length);

  const addCorrectAnswerField = () => {
    setAnswerFieldInputCount((prev) => prev + 1);
  };

  useEffect(() => {
    setAnswerFieldInputCount(correctAnswerDefaultValue.length);
  }, [correctAnswerDefaultValue]);

  return (
    <Fragment>
      <div className="mb-px-18">
        <div className="flex justify-around border-b">
          <div className="w-1/7 mr-px-25 text-adminGray-400 text-12 font-bold mb-px-8">
            No.
          </div>
          <div className="w-full ml-px-4 text-adminGray-400 text-12 font-bold mb-px-8">
            解答文
          </div>
        </div>
          <div className="flex justify-around border-b">
            <div className="w-1/7 mr-px-25 py-px-25 text-12 text-adminGray-700 font-bold">
              1
            </div>
            <div className="w-full ml-px-4 py-4 mx-4">
              <input
                readOnly
                type="text"
                defaultValue={sentence}
                className="bg-adminGray-50 h-px-36 w-full tracking-input rounded-px-2 
                        border-px-2 border-adminGray-200 font-px-14 
                        leading-px-14 p-px-11 text-14"
              />
            </div>
          </div>
        {answerFieldInputCount >= 1 && (
          <div className="flex justify-around border-b">
            <div className="w-1/7 mr-px-25 py-px-25 text-12 font-bold text-adminGray-700">
              2
            </div>
            <div className="w-full ml-px-4 py-4 mx-4">
              <input
                type="text"
                name={firstAnswerFieldProps.name}
                id={firstAnswerFieldProps.id}
                ref={firstAnswerFieldProps.register}
                defaultValue={correctAnswerDefaultValue[0]}
                className="bg-adminGray-50 h-px-36 w-full tracking-input rounded-px-2 
                border-px-2 border-adminGray-200 font-px-14 
                leading-px-14 p-px-11 text-14"
              />
              {firstAnswerFieldProps.errors && (
                <p className="text-red-500 mt-px-2">
                  {firstAnswerFieldProps.errors.message}
                </p>
              )}
            </div>
          </div>
        )}
        {answerFieldInputCount >= 2 && (
          <div className="flex justify-around border-b">
            <div className="w-1/7 mr-px-25 py-px-25 text-12 font-bold text-adminGray-700">
              3
            </div>
            <div className="w-full ml-px-4 py-4 mx-4">
              <input
                type="text"
                name={secondAnswerFieldProps.name}
                id={secondAnswerFieldProps.id}
                ref={secondAnswerFieldProps.register}
                defaultValue={correctAnswerDefaultValue[1]}
                className="bg-adminGray-50 h-px-36 w-full tracking-input rounded-px-2 
                border-px-2 border-adminGray-200 font-px-14 
                leading-px-14 p-px-11 text-14"
              />
              {secondAnswerFieldProps.errors && (
                <p className="text-red-500 mt-px-2">
                  {secondAnswerFieldProps.errors.message}
                </p>
              )}
            </div>
          </div>
        )}
        {answerFieldInputCount >= 3 && (
          <div className="flex justify-around border-b">
            <div className="w-1/7 mr-px-25 py-px-25 text-12 font-bold text-adminGray-700">
              4
            </div>
            <div className="w-full ml-px-4 py-4 mx-4">
              <input
                type="text"
                name={thirdAnswerFieldProps.name}
                id={thirdAnswerFieldProps.id}
                ref={thirdAnswerFieldProps.register}
                defaultValue={correctAnswerDefaultValue[2]}
                className="bg-adminGray-50 h-px-36 w-full tracking-input rounded-px-2 
                border-px-2 border-adminGray-200 font-px-14 
                leading-px-14 p-px-11 text-14"
              />
              {thirdAnswerFieldProps.errors && (
                <p className="text-red-500 mt-px-2">
                  {thirdAnswerFieldProps.errors.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {answerFieldInputCount < 3 && (
        <div className="mb-px-40">
          {correctAnswerDefaultValue.length < 3 && (
            <button onClick={addCorrectAnswerField}>
              <AddBoxIcon color="#0D89EE" width="15" height="15" />
              <span className="text-adminPrimary-400 text-12 font-bold ml-px-6">
                他の解答例を追加
              </span>
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default AnswersField;
