import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { deleteLectureDetails } from "../redux/lectures/slice";

const useLectureLiveDelete = (props) => {
  const { lecture_id, setIsShowDeleteModal } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteConfirmationMessage = "このLIVEを消去しますか？";
  const deleteSuccessMessage = "LIVEを消去しました。";
  const deleteFailedMessage =
    "エラーが発生しました。後ほど再度お試しください。";

  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(true);

  const deleteLecture = (lecture_id) => {
    setSelectedLectureId(lecture_id);
    setIsShowConfirmDeleteModal(true);
  };

  const onConfirmDelete = () => {
    dispatch(deleteLectureDetails({ lectureId: selectedLectureId }))
      .then((res) => {
        setIsDeleteSuccess(res?.payload?.status === 200);
        setIsShowDeleteModal(true);
      })
      .catch((err) => {
        setIsDeleteSuccess(false);
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
      });
  };

  return {
    deleteConfirmationMessage,
    deleteSuccessMessage,
    deleteFailedMessage,
    isShowConfirmDeleteModal,
    isDeleteSuccess,
    setIsShowConfirmDeleteModal,
    deleteLecture,
    onConfirmDelete,
  };
};

export default useLectureLiveDelete;
