import React from 'react';
import ReactPaginate from 'react-paginate';

import ArrowPrevIcon from '../../shared/icons/ArrowPrevIcon';
import ArrowForwardIcon from '../../shared/icons/ArrowForwardIcon';

import style from './Paginator.module.css';

const Paginator = ({ page = 1, pageCount, onPageChange}) => {
  return (
    <ReactPaginate
      containerClassName={`flex justify-between text-adminGray-500 h-px-44 ${style.pagination}`}
      pageClassName="font-bold py-px-12"
      pageLinkClassName="py-px-12 px-px-16"
      breakClassName="font-bold py-px-12"
      breakLinkClassName="py-px-12 px-px-16"
      previousClassName={"w-full self-center"}
      nextClassName={"w-full flex self-center justify-end"}
      activeClassName={`${style.selected}`}

      previousLabel={
        <button className={`${(page == 1 ? style.disabled : '')}`}>
          <span className={style.arrowPrev}>
            <ArrowPrevIcon className="mb-px-5" />
          </span>
          前のページ
        </button>
      }
      nextLabel={
        <button className={`${(page == pageCount ? style.disabled : '')}`}>
          次のページ
          <span className={style.arrowForward}>
            <ArrowForwardIcon className="mb-px-5" />
          </span>
        </button>
      }

      pageCount={pageCount}
      forcePage={page-1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
    />
  );
};

export default Paginator;
