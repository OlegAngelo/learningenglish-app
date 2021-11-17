import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import AlertModal from '../../../../../../../../../shared/AlertModal/AlertModal';
import Button from '../../../../../../../../../shared/Button/Button';
import UploadModal from '../../../../../../../News/components/UploadModal/UploadModal';
import UploadLoading from '../../../../../../../News/components/UploadLoading/UploadLoading';
import AddBoxIcon from '../../../../../../../../../shared/icons/AddBoxIcon';
import DeleteIcon from '../../../../../../../../../shared/icons/DeleteIcon';
import ImageFilterIcon from '../../../../../../../../../shared/icons/ImageFilterIcon';

import { disableScroll, enableScroll} from '../../../../../../../../../utils/scrollableHelper';
import useUploadFile from '../../../../../../components/hooks/useUploadFile';

import { uploadExcerise, hardDeleteExcerises } from '../../../../../../../../../redux/lectures/slice';


const ExerciseSection = (props) => {
  const dispatch = useDispatch();
  const [windowOffset, setWindowOffset] = useState(0);
  const {
    lecturePhraseIds,
    setLecturePhraseIds,
    exerciseFilename,
    setExerciseFilename,
  } = props;

  const fileType = {
    excel : null,
  };

  const deleteExercise = () => {
    if (!lecturePhraseIds) return;
    
    dispatch(hardDeleteExcerises({ ids: lecturePhraseIds }))
    
    setExerciseFilename('');
    setLecturePhraseIds([]);
    localStorage.removeItem('exercise_ids');
  };

  const replaceExercise = async () => {
    if (!lecturePhraseIds) return;
    
    await dispatch(hardDeleteExcerises({ ids: lecturePhraseIds }))
      .then(res => {
        setLecturePhraseIds([]);
        setExerciseFilename('');
          localStorage.removeItem('exercise_ids');
        })
      .catch(err => {
        console.error(err);
      });
  };


  const handleOnSuccessUpload = async (res) => {
    let phraseIds = res.payload.data.map(item => item.id)
    
    await replaceExercise();
    
    setLecturePhraseIds(phraseIds);
    setExerciseFilename(file[showUploadModal].name);
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
    uploadedfile,
    alertMessage,
    isSuccessRequest,
    isShowAlertModal,
    setIsShowAlertModal,
    showUploadLoading,
    uploadPercentage,
    setAlertMessage,
    setIsSuccessRequest,
    showAlertFail,
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

  const goToPreview = (event) => {
    event.target.blur();
    window.open(`${process.env.REACT_APP_FRONTEND_URL}/admin/lectures/exercise-preview?questionIds=${lecturePhraseIds}`)
  };

  return (
    <div className="h-96">
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

      {exerciseFilename ? (
        <Fragment>
          <p className="text-12 text-adminGray-400 mt-px-60 font-bold">確認問題</p>
          <div className="flex items-center mt-px-18">
            <p className="text-12 text-basic-100 mr-px-20">{exerciseFilename}</p>
            <DeleteIcon
              className="cursor-pointer"
              width="20"
              height="20"
              onClick={() => deleteExercise()}
            />
          </div>

          <div className="flex items-end">
            <Button
              innerClass="cursor-pointer"
              className="pt-px-16 mr-px-16"
              type="blue-square"
              icon={<ImageFilterIcon color="white" width="18" height="18" />}
              onClick={goToPreview}
            >
              実装画面をプレビュー
            </Button>

            <Button
              innerClass="cursor-pointer"
              type="blue-square"
              icon={<AddBoxIcon width="16" height="16" />}
              onClick={importOnClickHandler}
            >
              確認問題をアップロード
            </Button>
          </div>
        </Fragment>
      ) : (
        <Button
          className="mt-px-60"
          innerClass="cursor-pointer"
          type="blue-square"
          icon={<AddBoxIcon width="16" height="16" />}
          onClick={importOnClickHandler}
        >
          確認問題をアップロード
        </Button>
      )}
    </div>
  );
};

export default ExerciseSection;
