import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import moment from 'moment';

import Breadcrumb from '../../../../shared/Breadcrumb';
import BasicInfoEditSection from './components/BasicInfoEditSection';
import ContentEditSection from './components/ContentEditSection';
import UploadSection from '../Details/components/UploadSection';
import AlertModal from '../../../../shared/AlertModal/AlertModal';

import { updatePublication, fetchNewsDetails } from '../../../../redux/news/slice';

import styles from './NewsDetailsEdit.module.css';

const NewsDetailsEdit = () => {
  const dispatch = useDispatch();
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const newsId = useParams().id;
  const msgSuccessRequest = 'ニュース編集をしました。';
  const msgFailRequest = 'エラーが発生しました。後ほど再度お試しください。';

  useEffect(() => {
    dispatch(fetchNewsDetails(newsId));
  }, []);

  const newsUpdateSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let scheduled_published_at = data.get('date') + ' ' + moment(data.get('time'),'HH:mm:ss').format('HH:mm:ss');
    const payload = {
      newsId,
      scheduled_published_at,
    };
    dispatch(updatePublication(payload))
      .then(({payload}) => {
        let { status } = payload;
        if (status === 200) {
          setIsSuccessRequest(true);
        } else {
          setIsSuccessRequest(false);
        }
        setIsShowAlertModal(true);
      })
      .catch((err) => {
        setIsSuccessRequest(false);
        setIsShowAlertModal(true);
      });
  };

  return (
    <div className="flex-1 w-full bg-adminGray-100 pb-px-100">
      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isSuccessRequest}
        message={isSuccessRequest ? msgSuccessRequest : msgFailRequest}
      />
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="ニュース" to="/admin/news" />
        <Breadcrumb text="ニュース詳細" to="#3" active last />
      </div>
      <div className="pb-12 bg-adminGray-100 ">
        <div className={`bg-white mx-8 rounded-px-4 shadow-card ${styles.board}`}>
          <form
            onSubmit={newsUpdateSubmit}
          >
            <BasicInfoEditSection />
            <UploadSection />
            <ContentEditSection />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsEdit;
