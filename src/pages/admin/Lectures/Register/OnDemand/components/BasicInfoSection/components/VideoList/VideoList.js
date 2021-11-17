import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import Button from '../../../../../../../../../shared/Button';
import AddBoxIcon from '../../../../../../../../../shared/icons/AddBoxIcon';
import Table from '../../../../../../../../../shared/Table/Table';
import DeleteIcon from '../../../../../../../../../shared/icons/DeleteIcon';
import UploadModal from '../../../../../../components/UploadModal';
import AlertModal from '../../../../../../../../../shared/AlertModal';
import UploadLoadingScreen from '../../../../../../../../../shared/UploadLoadingScreen';

import { createOnDemandVideo, deleteVimeoVideo } from '../../../../../../../../../redux/lectures/slice';
import useUploadFile from '../../../../../../components/hooks/useUploadFile';
import style from '../../../../OnDemand.module.css';

const VideoList = (props) => {
  const dispatch = useDispatch();
  const { id: liveId } = useParams();
  const msgSuccessDeleteVideo = "動画を消去しました";
  const {
    setIsSaveBtnDisabled,
    videoTitle,
    setVideoTitle,
    videoList,
    setVideoList,
  } = props;

  const fileType = {
    video : null,
  };

  let uploadFunction = 'uploadOnDemandVideo';

  const useUploadFileProps = {
    createOnDemandVideo,
    fileType,
    uploadFunction,
    setVideoList,
    videoTitle,
    setVideoTitle,
  }

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

  const removeVideoFromList = (key) => {
    dispatch(deleteVimeoVideo({
      vimeoVideoId: videoList[key].vimeoVideoId,
    }))
      .then(({ payload }) => {
        let { status } = payload;
        if (status === 200) {
          setAlertMessage(msgSuccessDeleteVideo);
          setIsSuccessRequest(true);
          setIsShowAlertModal(true);
          let filteredVideo = videoList.filter( (item, idx) => idx !== key);
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
    videoList.length ? setIsSaveBtnDisabled(false) : setIsSaveBtnDisabled(true);
  }, [videoList]);

  return (
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
        <UploadLoadingScreen 
          percentage={uploadPercentage}
        />
      )}
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={alertMessage}
      />
      
      {/* # Title */}
      <div className="mb-px-20">
        <p className="text-adminGray-400 text-12 font-bold mb-px-8">
          小テーマ（動画タイトル） <span className="text-adminRed-400">*</span>
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
      { videoList.length > 0 && (
        <Fragment>
          <div className="my-px-20">
            <Table type="paginated" className={`shadow-card w-full ${style.table}`}>
              <tbody>
                <tr className="text-left text-12">
                  <th className={`py-px-11 pt-px-12 ${style.td1}`}>タイトル</th>
                  <th className={`py-px-11 pt-px-12 ${style.td2}`}>最終更新日時</th>
                  <th className={`py-px-11 pt-px-12 ${style.td3}`}>視聴回数</th>
                  <th className={`py-px-11 pt-px-12 ${style.td4}`}>視聴人数</th>
                  <th className={`py-px-11 pt-px-12 ${style.td5}`}></th>
                </tr>
                {videoList?.map((video,key) => {
                  return (
                    <tr>
                      <td className="text-14 text-adminPrimary-400">
                        <Link to="#">
                          {video.title}
                        </Link>
                      </td>
                      <td className="flex flex-col">
                        <div>
                          {video.updated_at_date}
                        </div>
                        <div>
                          {video.updated_at_time}
                        </div>
                      </td>
                      <td>
                        {video.num_views}
                      </td>
                      <td>
                        {video.num_viewers}
                      </td>
                      <td>
                        <DeleteIcon
                          className="h-px-20 w-px-20 cursor-pointer" 
                          onClick={() => removeVideoFromList(key)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>  
          </div>
          <div className="flex">
            <Link to={`/admin/lectures/register/on-demand/${liveId ? `${liveId}/` : ''}exercises`}>
              <Button
                innerClass="cursor-pointer"
                type="blue-square"
                onClick={(e) => e.target.blur()}
              >
                確認問題の登録へ
              </Button>
            </Link>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default VideoList;
