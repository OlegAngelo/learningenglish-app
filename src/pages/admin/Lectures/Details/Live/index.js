import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import BasicInfoSection from './components/BasicInfoSection';
import BasicInfoSectionHeader from './components/BasicInfoSectionHeader';
import AlertModal from '../../../../../shared/AlertModal';
import Breadcrumb from '../../../../../shared/Breadcrumb';
import BoardComponent from '../../../../../shared/BoardComponent';
import Loading from '../../../../../shared/Loading';
import ConfirmationModal from '../../../../../shared/ConfirmationModal';

import {
  fetchLecture,
  resetLectureDetails,
} from '../../../../../redux/lectures/slice';
import useScrollbar from '../../../../../hooks/useScrollbar';
import useModal from '../../../../../hooks/useModal';

import styles from './LiveDetails.module.css';
import useLectureLiveDelete from '../../../../../hooks/useLectureLiveDelete';
import useRedirectToNotFound from '../../../../../hooks/useRedirectToNotFound';
import FormWrapper from './components/FormWrapper/FormWrapper';

const LectureLiveDetails = ({ }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const lecture_id = useParams().id;
  const { isFetchingLecture } = useSelector((state) => state.lectures);
  const { setScrollbar } = useScrollbar();

  const [isShowDeleteModal, setIsShowDeleteModal] = useModal();
  const [isShowConvertModal, setIsShowConvertModal] = useModal();
  const [isLoading, setIsLoading] = useState(true);

  const {
    deleteConfirmationMessage,
    deleteSuccessMessage,
    deleteFailedMessage,
    isShowConfirmDeleteModal,
    isDeleteSuccess,
    setIsShowConfirmDeleteModal,
    deleteLecture,
    onConfirmDelete
  } = useLectureLiveDelete({
    lecture_id,
    setIsShowDeleteModal
  });
  const { redirect404 } = useRedirectToNotFound({
    route: '/admin/lectures',
    text: 'Go to lectures',
  });

  useEffect(() => {
    dispatch(fetchLecture({ lecture_id })).then(({ payload }) => {
      const { data, status } = payload;
      if (status === 404 || !data?.is_live) {
        redirect404();
        return;
      }
      setIsLoading(false);
    });

    return () => dispatch(resetLectureDetails());
  }, []);

  useEffect(() => {
    if (isShowConvertModal) setScrollbar(false);
    else setScrollbar(true);
  }, [isShowConvertModal]);

  const alertModalOnClickOk = () => {
    setIsShowDeleteModal(false);
    history.push("/admin/lectures");
  }

  return (
    <div
      className={`flex-1 w-full bg-adminGray-100 pb-px-100 ${isFetchingLecture && 'h-screen'}`}
    >
      <AlertModal
        isShowModal={isShowDeleteModal}
        setIsShowModal={setIsShowDeleteModal}
        isSuccess={isDeleteSuccess}
        message={isDeleteSuccess ? deleteSuccessMessage : deleteFailedMessage}
        handleOnClickOk={() => alertModalOnClickOk()}
        onClickOutsideClose={false}
      />
      <ConfirmationModal
        showConfirmationModal={isShowConfirmDeleteModal}
        setShowConfirmationModal={setIsShowConfirmDeleteModal}
        message={deleteConfirmationMessage}
        submitText="はい"
        cancelText="いいえ"
        onSubmit={() => {
          onConfirmDelete();
        }}
      />
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="大教室　授業一覧" to="/admin/lectures" />
        <Breadcrumb text="LIVE授業編集" to="#3" active last />
      </div>
      <div className="pb-12 bg-adminGray-100">
        <div
          className={`bg-white mx-8 rounded-px-4 shadow-card ${styles.board}`}
        >
          {isLoading ? (
            <Fragment>
              <BasicInfoSectionHeader isLoading={isLoading} />
              <hr />
              <BoardComponent>
                <div className="relative pb-px-40">
                  <Loading
                    rootPosition="absolute top -mt-px-15"
                    className={`bg-transparent`}
                    iconClass="bg-primary-500 text-primary-500"
                  />
                </div>
              </BoardComponent>
            </Fragment>
          ) : (
            <FormWrapper
              deleteLecture={deleteLecture}
              setIsShowConvertModal={setIsShowConvertModal}
            >

              <BasicInfoSection />

            </FormWrapper>
          )}

          <AlertModal
            isShowModal={isShowConvertModal}
            setIsShowModal={setIsShowConvertModal}
            isInfo={true}
            message={'この授業をオンデマンドに変更しますか？'}
            buttonConfirmText="はい"
            buttonCancelText="いいえ"
            handleOnClickOk={() => history.push(`/admin/lectures/register/on-demand/${lecture_id}/overview`)}
            onClickOutsideClose={false}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureLiveDetails;
