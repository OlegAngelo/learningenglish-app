import { Fragment, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ArrowBackIcon from '../../../../../../../shared/icons/ArrowBackIcon';
import DeleteIcon from '../../../../../../../shared/icons/DeleteIcon';
import Button from '../../../../../../../shared/Button/Button';
import { resetReadingList } from '../../../../../../../redux/selfLearning/reading/admin/slice';
import { FormWrapperContext } from '../FormWrapper/FormWrapper';

const HeaderSection = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {handleSubmit} = useContext(FormWrapperContext);

  return (
    <Fragment>
      <div
        className={`flex items-center justify-between border-b-px-1 border-adminGray-200 h-px-54`}
      >
        <div className="flex">
          <Link
            to={`/admin/reading/${location.state?.prevQuery ?? ''}`}
            onClick={() => dispatch(resetReadingList())}
          >
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-base-dark font-bold leading-px-20 text-20 mt-px-3">
            詳細
          </span>
        </div>
        <div className="pr-px-24">
          <div className="flex items-center">
            <Button
              className="m-3"
              innerClass="px-px-34"
              type="blue-square"
              onClick={() => handleSubmit()}
            >
                登録
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default HeaderSection;
