import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isObjectEmpty } from "../../../../../../../utils/isObjectEmpty";

export const FormWrapperContext = React.createContext('');

const FormWrapper = ({ children, props, setIsShowAlertModal, setIsSuccessRequest, setShowUploadModal }) => {
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(false);
  const [saveBtnText, setSaveBtnText] = useState('登録');
  const { submitToApi } = props;

  const {
    control,
    rules,
    register,
    watch,
    handleSubmit,
    setValue: setFormValue,
    formState
  } = useForm({
    defaultValues: {
      publishedDate: '',
      publishedTime: '',
      liveDate: '',
      liveTimeFrom: '',
      liveTimeTo: '',
      genreId: 8,
      genre2Id: '',
      level: '',
      title: '',
      tag1: '',
      tag2: '',
      tag3: '',
      tag4: '',
      tag5: '',
      subtopic: '',
      teacher1: '',
      teacher2: '',
      teacher3: '',
      image: '',
      description: '',
      url: '',
    },
  });

  const handleSubmitToApi = (data) => {
    console.log('handleSubmitToApi', data)
    setIsSaveBtnDisabled(true);
    setSaveBtnText('登録中...');
    submitToApi(data);
  };

  const state = {
    setFormValue,
    watch,
    props,
    handleSubmit,
    handleSubmitToApi,
    registerOnClickHandler: handleSubmit(handleSubmitToApi),
    register,
    rules,
    setIsShowAlertModal,
    setIsSuccessRequest,
    setShowUploadModal,
    control,
    formState,
    isSaveBtnDisabled,
    saveBtnText,
  };

  return (
    <FormWrapperContext.Provider value={state}>
      {children}
    </FormWrapperContext.Provider>
  );
};

export default FormWrapper;
