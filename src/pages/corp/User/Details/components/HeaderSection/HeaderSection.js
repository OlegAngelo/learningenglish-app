import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ArrowBackIcon from '../../../../../../shared/icons/ArrowBackIcon';
import Button from '../../../../../../shared/Button/Button';
import { FormWrapperContext } from '../FormWrapper/FormWrapper';
import DeleteIcon from '../../../../../../shared/icons/DeleteIcon';

const HeaderSection = () => {
  const location = useLocation();
  const { handleSubmit } = useContext(FormWrapperContext);

  return (
    <Fragment>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <Link to={`/corp/users/${location.state?.prevQuery ?? ''}`}>
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
            学習者情報
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex items-center">
            <div className="cursor-pointer">
              <DeleteIcon />
              <span className="text-adminGray-500 font-theme-regular leading-px-14 text-14 ml-1">
                削除
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderSection;
