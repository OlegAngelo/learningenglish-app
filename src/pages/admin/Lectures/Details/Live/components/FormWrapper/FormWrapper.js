import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import moment from 'moment'

import useConfirmBeforeOnLeave from '../../../../../../../hooks/useConfirmBeforeOnLeave';

export const FormWrapperContext = React.createContext('');

const FormWrapper = ({ children, setIsShowConvertModal, deleteLecture }) => {
  const [Prompt, setShowDiscardModal] = useConfirmBeforeOnLeave();
  const { lectureDetails } = useSelector((state) => state.lectures);

  const {
    setValue,
    control,
    register,
    handleSubmit,
    errors,
    watch,
    formState,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        publishedDate: moment(lectureDetails?.publish_at).format('YYYY-MM-DD'),
        publishedTime: moment(lectureDetails?.publish_at).format('HH:mm'),
        liveDate: moment(lectureDetails?.lecture_lives?.start_at).format('YYYY-MM-DD'),
        liveTimeFrom: moment(lectureDetails?.lecture_lives?.start_at).format('HH:mm'),
        liveTimeTo: moment(lectureDetails?.lecture_lives?.end_at).format('HH:mm'),
        genreId: lectureDetails?.genre_id,
        genre2Id: lectureDetails?.genre2_id,
        level: lectureDetails?.level,
        title: lectureDetails?.title,
        subtopic: lectureDetails?.lecture_lives?.subtopic ?? '',
        teacher1: lectureDetails?.lectures_teacher[0]?.teacher?.name ?? '',
        teacher2: lectureDetails?.lectures_teacher[1]?.teacher?.name ?? '',
        teacher3: lectureDetails?.lectures_teacher[2]?.teacher?.name ?? '',
        tag1: lectureDetails?.lectures_tags[0]?.lecture_meta_tag?.name ?? '',
        tag2: lectureDetails?.lectures_tags[1]?.lecture_meta_tag?.name ?? '',
        tag3: lectureDetails?.lectures_tags[2]?.lecture_meta_tag?.name ?? '',
        tag4: lectureDetails?.lectures_tags[3]?.lecture_meta_tag?.name ?? '',
        tag5: lectureDetails?.lectures_tags[4]?.lecture_meta_tag?.name ?? '',
        description: lectureDetails?.description ?? '',
        image: lectureDetails?.thumbnail_name,
        url: lectureDetails?.lecture_lives?.url,
      };
    }, lectureDetails),
    shouldUnregister: true,
  });

  const { isDirty } = formState;

  // enable discard dialog if input fields is touch
  useEffect(() => {
    if (isDirty) setShowDiscardModal(true);
    else setShowDiscardModal(false);
  }, [isDirty]);

  const state = {
    setIsShowConvertModal,
    setShowDiscardModal,
    deleteLecture,
    lectureDetails,
    setValue,
    control,
    register,
    handleSubmit,
    errors,
    watch,
    formState,
  };

  return (
    <FormWrapperContext.Provider value={state}>
      {children}
      {Prompt}
    </FormWrapperContext.Provider>
  );
};

export default FormWrapper;
