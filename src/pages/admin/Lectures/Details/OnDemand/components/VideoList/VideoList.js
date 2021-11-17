import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import UploadModal from '../../../../components/UploadModal';
import AlertModal from '../../../../../../../shared/AlertModal';
import ConfirmationModal from '../../../../../../../shared/ConfirmationModal';
import Button from '../../../../../../../shared/Button';
import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon';
import Table from '../../../../../../../shared/Table/Table';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import EditIcon from '../../../../../../../shared/icons/EditIcon';
import DragHandleIcon from '../../../../../../../shared/icons/DragHandleIcon';

import {
  fetchOnDemandVideos,
  resetAdminVideoList,
  deleteOnDemandVideoDetails,
  deleteVimeoVideo,
  createOnDemandVideo,
  fetchAdminLectureDetail,
} from '../../../../../../../redux/lectures/slice';
import { lectureVideoList } from '../../../../../../../redux/lectures/selectors';

import useUploadFile from '../../../../components/hooks/useUploadFile';
import useScrollbar from '../../../../../../../hooks/useScrollbar';
import style from '../../Details.module.css';
import modalMessage from '../../../../../../../config/modalMessage.json';
import UploadLoadingScreen from '../../../../../../../shared/UploadLoadingScreen';

const VideoList = ({ props, updateOnClick, setShowDiscardModal }) => {
  const dispatch = useDispatch();
  const lectureId = useParams().id;
  const [windowOffset, setWindowOffset] = useState(0);
  const { setScrollbar } = useScrollbar();
  const videoList = useSelector(lectureVideoList);
  const { fetchingVideoList } = useSelector((state) => state.lectures);
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] = useState(false);
  const deleteConfirmationMessage = modalMessage['confirmationMessage'];
  const deleteSuccessMessage = modalMessage['successMessage'];
  const deleteFailedMessage = modalMessage['failedMessage'];
  const [selectedOnDemandVideoId, setSelectedOnDemandVideoId] = useState(null);
  const msgSuccessDeleteVideo = '動画を消去しました';
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [alertMessage, setAlertMessage] = useState(true);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);

  const {
    isSubmittedToApi,
    setIsSubmittedToApi,
    setIsSaveBtnDisabled,
    videoTitle,
    setVideoTitle,
    setVideoList,
    videoList: videoListFromUpload,
  } = props;

  const fileType = {
    video: null,
  };

  let uploadFunction = 'uploadOnDemandVideo';

  const useUploadFileProps = {
    createOnDemandVideo,
    fileType,
    uploadFunction,
    setVideoList,
    videoTitle,
    setVideoTitle,
  };

  const fetchVideoList = (params) => dispatch(fetchOnDemandVideos(lectureId));

  const deleteOnDemandVideo = (video_id) => {
    if (videoList.length > 1) {
      setSelectedOnDemandVideoId(video_id);
      setIsShowConfirmDeleteModal(true);
      return;
    }

    setAlertMessage('処理を実行できません。\n オンデマンドは少なくとも1つの動画が必要です。');
    setIsSuccessRequest(false);
    setIsShowAlertModal(true);
  };

  const onConfirmDelete = () => {
    dispatch(
      deleteOnDemandVideoDetails({
        lectureId: lectureId,
        onDemandVideoId: selectedOnDemandVideoId,
      })
    )
      .then((res) => {
        const { status } = res.payload;
        if (status == 200) {
          setAlertMessage(deleteSuccessMessage);
          setIsSuccessRequest(true);
        } else {
          setAlertMessage(deleteFailedMessage);
          setIsSuccessRequest(false);
        }
        fetchVideoList();
      })
      .catch((err) => {
        console.error(err);
        setAlertMessage(deleteFailedMessage);
        setIsSuccessRequest(false);
        setIsShowAlertModal(true);
      })
      .finally(() => {
        setIsShowConfirmDeleteModal(false);
        setIsShowAlertModal(true);
      });
  };

  const hardDeleteVideo = () => {
    const vimeoId = localStorage.getItem('newly_added_vimeoId');
    if (vimeoId) {
      dispatch(deleteVimeoVideo({
        vimeoVideoId: vimeoId,
      })).then((res) => {
        localStorage.removeItem('newly_added_vimeoId');
      });
    }
  };

  const {
    modalProps,
    showUploadModal,
    setShowUploadModal,
    file,
    uploadedfile,
    showUploadLoading,
    uploadPercentage,
    showAlertFail,
    isSuccessRequest: isUploadSuccessRequest,
    isShowAlertModal: isUploadShowAlertModal,
    setIsShowAlertModal: setIsUploadShowAlertModal,
  } = useUploadFile(useUploadFileProps);

  useEffect(() => {
    if (isUploadShowAlertModal) {
      setIsShowAlertModal(true);
      setIsSuccessRequest(isUploadSuccessRequest);

      setAlertMessage(
        isUploadSuccessRequest
          ? '動画をアップロードしました。\n 登録ボタンから登録を完了してください。'
          : 'エラーが発生しました。後ほど再度お試しください。'
      );
    }
  }, [isUploadShowAlertModal]);

  const removeVideoFromList = (key) => {
    dispatch(
      deleteVimeoVideo({
        vimeoVideoId: videoListFromUpload[key].vimeoVideoId,
      })
    )
      .then(({ payload }) => {
        const { status } = payload;
        if (status === 200) {
          setAlertMessage(msgSuccessDeleteVideo);
          setIsSuccessRequest(true);
          setIsShowAlertModal(true);
          const filteredVideo = videoListFromUpload.filter(
            (item, idx) => idx !== key
          );
          setVideoList(filteredVideo);
        } else {
          showAlertFail();
        }
      })
      .catch((err) => {
        showAlertFail();
      });
  };

  useEffect(() => {
    fetchVideoList();
    hardDeleteVideo();
    return () => {
      dispatch(resetAdminVideoList());
      dispatch(fetchAdminLectureDetail(lectureId));
    };
  }, []);

  useEffect(() => {
    if (isShowAlertModal || isShowConfirmDeleteModal) setScrollbar(false);
    else {
      setScrollbar(true);
      setIsUploadShowAlertModal(false);
    }
  }, [isShowAlertModal, isShowConfirmDeleteModal]);

  useEffect(() => {
    fetchVideoList();
    setVideoList([]);
  }, [isSubmittedToApi]);

  useEffect(() => {
      setShowDiscardModal(videoListFromUpload?.length > 0)
  }, [videoListFromUpload])

  return (
    <div>
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
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
      <div className="my-px-40">
        {showUploadModal && (
          <UploadModal
            title="動画ファイルをアップロードしてください"
            icon="subscription"
            file={file[showUploadModal]}
            {...modalProps}
          />
        )}
        {showUploadLoading && (
          <UploadLoadingScreen percentage={uploadPercentage} />
        )}

        {/* # Title */}
        <div className="mb-px-16">
          <p className="text-adminGray-400 text-12 font-bold mb-px-8">
            小テーマ（動画タイトル）
          </p>
          <input
            type="text"
            value={videoTitle}
            onChange={(event) => setVideoTitle(event.target.value)}
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 leading-px-14 p-px-11 text-12 ${style.inputText}`}
          />
        </div>
        <Button
          innerClass={videoTitle ? 'cursor-pointer' : ''}
          type="blue-square"
          icon={<AddBoxIcon width="16" height="16" />}
          onClick={() => {
            if (!videoTitle) return;
            setShowUploadModal('video');
          }}
          disabled={videoTitle ? false : true}
        >
          動画をアップロード
        </Button>
        <div className="mt-px-40">
          <Table
            type="paginated"
            className={`shadow-card w-full ${style.table}`}
          >
            <tbody>
              <tr className="text-left text-12">
                {/* <th className={`py-px-11 pt-px-12 ${style.tdFirst}`}></th> */}
                <th className={`py-px-11 pt-px-12`}>タイトル</th>
                <th className={`py-px-11 pt-px-12`}>最終更新日時</th>
                <th className={`py-px-11 pt-px-12`}>視聴回数</th>
                <th className={`py-px-11 pt-px-12`}>視聴人数</th>
                <th className={`py-px-11 pt-px-12 ${style.tdLast}`}></th>
              </tr>
              {fetchingVideoList ? (
                <tr>
                  <td colspan="5" align="center">
                    読み込み中...
                  </td>
                </tr>
              ) : !videoList?.length ? (
                <tr>
                  <td colspan="5" align="center">
                    動画が見つかりません。
                  </td>
                </tr>
              ) : (
                <>
                  {videoList?.map((video, key) => {
                    return (
                      <tr>
                        {/* <td>
                          <DragHandleIcon
                            opacity="0.54"
                            className="cursor-move"
                          />
                        </td> */}
                        <td className="text-14 text-adminPrimary-400 w-2/4 break-all">
                          <Link
                            to={`/admin/lectures/on-demand/details/${lectureId}/video-list-edit/${video.id}/edit`}
                          >
                            {video.title}
                          </Link>
                        </td>
                        <td className="whitespace-pre-line">
                          {video.last_modified}
                        </td>
                        <td>{video.total_views}</td>
                        <td>{video.total_viewers}</td>
                        <td className="flex justify-between">
                          <Link
                            to={`/admin/lectures/on-demand/details/${lectureId}/video-list-edit/${video.id}/edit`}
                          >
                            <EditIcon
                              className="h-px-20 w-px-20 cursor-pointer"
                              onClick={(e) => e.target.blur()}
                            />
                          </Link>
                          <DeleteIcon
                            className="h-px-20 w-px-20 cursor-pointer"
                            onClick={() => deleteOnDemandVideo(video.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {videoListFromUpload?.map((video, key) => {
                    return (
                      <tr>
                        <td className="text-14 text-adminPrimary-400 w-2/4 break-all">
                          <Link to="#">{video.title}</Link>
                        </td>
                        <td className="whitespace-pre-line">
                          {video.last_modified}
                        </td>
                        <td>{video.num_views}</td>
                        <td>{video.num_viewers}</td>
                        <td className="flex justify-between">
                          <EditIcon className="h-px-20 w-px-20 invisible" />
                          <DeleteIcon
                            className="h-px-20 w-px-20 cursor-pointer"
                            onClick={() => removeVideoFromList(key)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </Table>
        </div>
        <Button
          className="mt-px-40"
          innerClass={`px-px-34 ${
            !isSubmittedToApi && videoListFromUpload.length && 'cursor-pointer'
          }`}
          type="blue-square"
          disabled={
            isSubmittedToApi || !!!videoListFromUpload.length ? true : false
          }
          onClick={updateOnClick}
        >
          {isSubmittedToApi ? '登録中...' : '登録'}
        </Button>
      </div>
    </div>
  );
};

export default VideoList;
