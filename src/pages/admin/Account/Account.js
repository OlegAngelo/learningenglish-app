import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../shared/Breadcrumb';
import Card from '../../../shared/Card';
import ArrowBackIcon from '../../../shared/icons/ArrowBackIcon';
import EditIcon from '../../../shared/icons/EditIcon';

import styles from './Account.module.css';

const Account = () => {
  return (
    <div className="px-px-32 pt-px-30 flex-1 h-full w-full bg-adminGray-100">
      <div className="h-px-25 flex mb-px-19">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="アカウント" to="#2" active last/>
      </div>

      <Card>
        <div className={`flex items-center justify-between border-b-px-1 border-adminGray-200 ${styles.cardHeader}`}>
          <div className="flex">
            <Link to="#">
              <ArrowBackIcon
                className="mx-px-16"
                color="#9CA3AF"
                width="24px"
                height="24px"
              />
            </Link>
            <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
              アカウント情報
            </span>
          </div>
          <div className={styles.cardEditButton}>
            <EditIcon />
            <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">パスワード変更</span>
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
  )
}

export default Account;
