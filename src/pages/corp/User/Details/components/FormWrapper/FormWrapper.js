import React from 'react';
import useConfirmBeforeOnLeave from '../../../../../../hooks/useConfirmBeforeOnLeave';

export const FormWrapperContext = React.createContext('');

const FormWrapper = ({ children }) => {
  const [Prompt] = useConfirmBeforeOnLeave();
  const state = {};

  return (
    <FormWrapperContext.Provider value={state}>
      {children}
      {Prompt}
    </FormWrapperContext.Provider>
  );
};

export default FormWrapper;
