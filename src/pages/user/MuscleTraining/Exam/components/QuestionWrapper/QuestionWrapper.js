import React from 'react'

export const QuestionWrapperContext = React.createContext('');

const QuestionWrapper = ({children, questionProps }) => {

  return (
    <QuestionWrapperContext.Provider value={questionProps}>
      {children}
    </QuestionWrapperContext.Provider>
  )
}

export default QuestionWrapper
