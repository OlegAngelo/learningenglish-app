import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Breadcrumb from '../../../shared/Breadcrumb';
import Card from '../../../shared/Card';
import ArrowBackIcon from '../../../shared/icons/ArrowBackIcon';
import EditIcon from '../../../shared/icons/EditIcon';
import DeleteIcon from '../../../shared/icons/DeleteIcon';

import styles from './AdministratorDetail.module.css';

const AdministratorDetail = () => {
  const location = useLocation();
  
  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full bg-adminGray-100">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="管理者" to="/admin/administrators" />
        <Breadcrumb text="管理者情報" to="#3" active last/>
      </div>

      <div className={`bg-white rounded-px-4 max-w-px-928 ${styles.cardWrapper}`}>
        <Card>
          <div className="h-px-59 flex items-center justify-between border-b-px-1 border-adminGray-200">
            <div className="flex">
              <Link to={`/admin/administrators${location.state?.prevQuery ?? ''}`}>
                <ArrowBackIcon
                  className="mx-px-16"
                  color="#9CA3AF"
                  width="24px"
                  height="24px"
                />
              </Link>
              <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
                管理者情報
              </span>
            </div>
            <div className="pr-6">
              <EditIcon />
              <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 mr-4 ml-1">編集</span>
              <DeleteIcon />
              <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">削除</span>
            </div>
          </div>
          <div className={styles.cardContent}>
            <div className="mb-10">
              <div className="text-12 leading-px-12 text-adminGray-400 pb-4 font-theme-bold">名前</div>
              <div className="text-14 text-adminGray-900 leading-px-14 font-theme-regular">佐藤 佑樹</div>
            </div>
            <div className="mb-10">
              <div className="text-12 leading-px-12 text-adminGray-400 pb-4 font-theme-bold">メールアドレス</div>
              <div className={`text-14 text-adminGray-900 leading-px-14 font-theme-regular ${styles.cardDetail}`}>yuki.sato@edgeschool.com</div>
            </div>
            <div className="mb-10">
              <div className="text-12 leading-px-12 text-adminGray-400 pb-4 font-theme-bold">パスワード</div>
              <div className={`text-14 text-adminGray-900 leading-px-14 font-theme-regular ${styles.cardDetail}`}>••••••••••••</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AdministratorDetail;
