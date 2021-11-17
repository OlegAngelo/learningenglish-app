import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import UploadLoading from '../../../../../../News/components/UploadLoading';
import UploadModal from '../../../../../../News/components/UploadModal';
import AlertModal from '../../../../../../../../shared/AlertModal';
import Button from '../../../../../../../../shared/Button';
import AddBoxIcon from '../../../../../../../../shared/icons/AddBoxIcon';

import useUploadFile from '../../../../../components/hooks/useUploadFile';
import { enableScroll, disableScroll } from '../../../../../../../../utils/scrollableHelper';

import { lectureExercises } from '../../../../../../../../redux/lectures/selectors';
import { uploadExcerise, hardDeleteExcerises } from '../../../../../../../../redux/lectures/slice';

const UploadExercise = ({ setFile }) => {
  const dispatch = useDispatch();
  const [windowOffset, setWindowOffset] = useState(0);
  const { fetchingLectureExercise, lectureExerciseIdsToUpload } = useSelector((state) => state.lectures);
  const exercises = useSelector(lectureExercises);

  const fileType = {
    excel: null,
  };

  // hard delete discarded exercises
  useEffect(() => {
    const phraseIds = JSON.parse(localStorage.getItem('exercise_ids'));

    if (!phraseIds?.length) return;
    dispatch(hardDeleteExcerises({ ids: phraseIds })).then((res) => {
      if (res?.payload?.status === 200) localStorage.removeItem('exercise_ids');
    });
  }, []);

  // callback of success upload
  const handleOnSuccessUpload = async (res) => {
    let phraseIds = res.payload.data.map((item) => item.id);
    setFile(file[showUploadModal]);
    localStorage.setItem('exercise_ids', JSON.stringify(phraseIds));
  };

  const useUploadFileProps = {
    uploadFunction: 'uploadExercise',
    uploadExcerise,
    fileType,
    handleOnSuccessUpload,
  };

  const {
    modalProps,
    showUploadModal,
    setShowUploadModal,
    file,
    alertMessage,
    isSuccessRequest,
    isShowAlertModal,
    setIsShowAlertModal,
    showUploadLoading,
    uploadPercentage,
  } = useUploadFile(useUploadFileProps);

  // prevent scroll when modals are opened
  useEffect(() => {
    if (showUploadModal) disableScroll(true);
    else enableScroll();
  }, [showUploadModal]);

  const importOnClickHandler = (event) => {
    setShowUploadModal('excel');
    event.target.blur();
  };

  return (
    <div>
      {showUploadModal && (
        <UploadModal
          title="Excelデータをアップロードしてください"
          icon="file"
          file={file[showUploadModal]}
          modalStyle={{ top: windowOffset }}
          hasRuler={false}
          {...modalProps}
        />
      )}

      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
      />

      {showUploadLoading && <UploadLoading percentage={uploadPercentage} />}

      <Button
        type="blue-square"
        icon={<AddBoxIcon width="16" height="16" />}
        onClick={importOnClickHandler}
        disabled={
          fetchingLectureExercise
            ? true
            : !!exercises?.length || !!lectureExerciseIdsToUpload?.length
        }
      >
        確認問題をアップロード
      </Button>
    </div>
  );
};

export default UploadExercise;
