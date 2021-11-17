import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

import SearchIcon from '../../../../../../shared/icons/SearchIcon';

import useComponentVisible from '../../../../../../utils/useComponentVisible';

import style from './TopSection.module.css';

const TopSection = () => {
  const history = useHistory();
  const URLParams = new URLSearchParams();
  const [searchText, setSearchText] = useState('');
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const {
    level = URLParams.level ?? 1,
    perPage = URLParams.perPage ?? 10,
    keyword = '',
  } = queryString.parse(useLocation().search);
  const itemsPerPage = [10, 30, 50];
  const groups = ['0000000002 - 利用中'];

  const handlePerPageChange = (e) => {
    URLParams.append('page', 1);
    URLParams.append('level', level);
    URLParams.append('perPage', e.target.value);
    URLParams.append('keyword', keyword);
    history.push({ search: URLParams.toString() });
  };

  const perPageOptions = () => {
    return itemsPerPage.map(function (page, index) {
      return (
        <option value={page} key={index}>
          {page}件
        </option>
      );
    });
  };

  const groupOptions = () => {
    return groups.map((group, index) => {
      return (
        <option value={group} key={index}>
          {group}
        </option>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between pt-px-12">
        <div className="flex">
          <div>
            {isComponentVisible && !searchText && (
              <SearchIcon className={`z-10 absolute ${style.searchIcon}`} />
            )}
            <input
              type="text"
              className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 px-px-11 py-px-12 text-14"
              ref={ref}
              onFocus={() => setIsComponentVisible(false)}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={() => {}}
              defaultValue={keyword}
            />
          </div>
          <div className="ml-px-16 w-px-160">
            <div className={`${style.selectDrop}`}>
              表示件数：
              <select
                className={`w-px-72 font-semibold bg-adminGray-50 focus:outline-none py-px-6 cursor-pointer ${style.selectArrow}`}
                onChange={(e) => handlePerPageChange(e)}
                value={perPage}
              >
                {perPageOptions()}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-px-8 py-2 w-px-255">
        <div className={`${style.selectDrop}`}>
          グループ名
          <select
            className={`w-px-160 font-semibold bg-adminGray-50 focus:outline-none py-px-6 cursor-pointer ${style.selectArrow}`}
            onChange={(e) => () => {}}
          >
            {groupOptions()}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
