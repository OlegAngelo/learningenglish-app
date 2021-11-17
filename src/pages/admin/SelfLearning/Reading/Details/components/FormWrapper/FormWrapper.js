import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { isObjectEmpty } from '../../../../../../../utils/isObjectEmpty';
import useConfirmBeforeOnLeave from '../../../../../../../hooks/useConfirmBeforeOnLeave';

export const FormWrapperContext = React.createContext('');

const FormWrapper = ({children, action, rules, isSubmitted, callbackWhenError}) => {
  const [Prompt, setShowDiscardModal] = useConfirmBeforeOnLeave();
  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors, isDirty },
  } = useForm();

  const state = {
    handleSubmit: handleSubmit(action),
    register,
    getValues,
    errors,
    isDirty,
    rules,
    control,
    Controller,
  }

  useEffect(() => {
    if (!isObjectEmpty(errors)) {
      callbackWhenError();
    }
  }, [errors]);

  useEffect(() => {
    if (isDirty && !isSubmitted) setShowDiscardModal(true);
    else setShowDiscardModal(false);
  }, [isDirty, isSubmitted]);

  return (
    <FormWrapperContext.Provider value={state}>
      {children}
      {Prompt}
    </FormWrapperContext.Provider>
  )
}

export default FormWrapper
