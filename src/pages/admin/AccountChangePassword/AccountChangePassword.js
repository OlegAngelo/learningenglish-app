import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../../shared/Breadcrumb';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import Input from '../../../shared/Input';
import ArrowBackIcon from '../../../shared/icons/ArrowBackIcon';

const AccountChangePassword = () => {

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full bg-adminGray-100">
      <div className="h-px-27 flex mb-px-16 mt-px-7 ml-0.5">
        <Breadcrumb text="ダッシュボード" to="#1" />
        <Breadcrumb text="アカウント" to="#2" />
        <Breadcrumb text="パスワード変更" to="#3" active last />
      </div>

      <Card className="max-h-px-378">
        <div className="h-px-53 flex items-center border-b-px-1 border-adminGray-200">
          <Link to="#">
            <ArrowBackIcon
              className="mx-px-15"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-1 ml-0.5">
            パスワード変更
          </span>
        </div>

        <div className="ml-px-96">
          <Input
            type="text"
            placeholder="半角英数字8文字以上"
            label={<Fragment>新しいパスワード <i className="text-adminRed-400">*</i></Fragment>}
            className="pt-px-16"
            onChange={() => {}}
          />
          <Input
            type="text"
            placeholder="半角英数字8文字以上"
            label={<Fragment>新しいパスワード（確認 <i className="text-adminRed-400">*</i></Fragment>}
            hint="もう一度入力してください"
            className="pt-px-41"
            onChange={() => {}}
          />
          <Button
            className="pt-px-60 pb-px-40"
            innerClass="min-w-px-92"
            innerClass="cursor-pointer"
            type="blue-square"
          >
            登録
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AccountChangePassword;
