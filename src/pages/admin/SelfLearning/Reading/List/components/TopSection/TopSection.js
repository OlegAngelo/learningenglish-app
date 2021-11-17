import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

import UploadSection from '../UploadSection';
import Button from '../../../../../../../shared/Button';
import SearchIcon from '../../../../../../../shared/icons/SearchIcon';

import useComponentVisible from '../../../../../../../utils/useComponentVisible';

import style from './TopSection.module.css';

const TopSection = () => {
  const history = useHistory();
  const URLParams = new URLSearchParams();
  const [searchText, setSearchText] = useState('');
  const [prevSearchText, setPrevSearchText] = useState('');
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const { 
    level = URLParams.level ?? 1,
    perPage = URLParams.perPage ?? 10,
    keyword ='',
    page = URLParams.page ?? 1,
  } = queryString.parse(useLocation().search);
  const itemsPerPage = [10, 30, 50];

  const onLevelChange = (level) => {
    URLParams.append('page', 1);
    URLParams.append('level', level);
    URLParams.append('perPage', perPage);
    URLParams.append("keyword", keyword);
    history.push({ search: URLParams.toString() });
    localStorage.removeItem('isReadingAscending');
    localStorage.setItem('isReadingAscending', true);
  };

  const handlePerPageChange = (e) => {
    URLParams.append('page', 1);
    URLParams.append('level', level);
    URLParams.append('perPage', e.target.value);
    URLParams.append("keyword", keyword);
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
  
  useEffect(() => {
    keyword && setSearchText(keyword);
    keyword && setPrevSearchText(keyword);
  }, []);

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    setPrevSearchText(searchText);

    URLParams.append("page", 1);
    URLParams.append("level", level)
    URLParams.append('perPage', perPage);
    URLParams.append("keyword", searchText);
    history.push({search: URLParams.toString()})
  };

  useEffect(() => {
    if (searchText.length === 0 && searchText !== prevSearchText) {
      URLParams.append("page", 1);
      URLParams.append("level", level);
      URLParams.append('perPage', perPage);
      URLParams.append("keyword", searchText);
      history.push({search: URLParams.toString()})
    }
  }, [searchText]);

  useEffect(() => {
    if (keyword === '') setSearchText('');
  }, [keyword]);

  return (
    <div>
      <div className="flex justify-between pt-px-12">
        <div className="flex">
          <div>
            { isComponentVisible && !searchText && <SearchIcon className={`z-10 absolute ${style.searchIcon}`} /> }
            <input
              type="text"
              className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 px-px-11 py-px-12 text-14"
              ref={ref}
              onFocus={()=> setIsComponentVisible(false)}
              value={searchText}
              onChange={event => setSearchText(event.target.value)} 
              onKeyDown={handleSearchTextSubmit}
              defaultValue={keyword}
            />
          </div>
          <div className="ml-px-16">
            <div className={`${style.selectDrop}`}>
              表示件数：
              <select
                className={`w-px-76 font-semibold bg-adminGray-50 focus:outline-none py-px-6 cursor-pointer ${style.selectArrow}`}
                onChange={(e) => handlePerPageChange(e)}
                value={perPage}
              >
                {perPageOptions()}
              </select>
            </div>
          </div>
        </div>
        <div className="flex">
          <UploadSection />
        </div>
      </div>
      <div className="flex mt-px-16 mb-px-24">
        <Button
          innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${
            style.button
          } ${level != 1 && style.buttonInactive}`}
          type={level == 1 ? "blue-flexible" : "white-flexible"}
          withoutFocus
          onClick={() => onLevelChange(1)}
        >
          Level 1
        </Button>
        <Button
          className="ml-px-8"
          innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${
            style.button
          } ${level != 2 && style.buttonInactive}`}
          type={level == 2 ? "blue-flexible" : "white-flexible"}
          withoutFocus
          onClick={() => onLevelChange(2)}
        >
          Level 2
        </Button>
        <Button
          className="ml-px-8"
          innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${
            style.button
          } ${level != 3 && style.buttonInactive}`}
          type={level == 3 ? "blue-flexible" : "white-flexible"}
          withoutFocus
          onClick={() => onLevelChange(3)}
        >
          Level 3
        </Button>
        <Button
          className="ml-px-8"
          innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${
            style.button
          } ${level != 4 && style.buttonInactive}`}
          type={level == 4 ? "blue-flexible" : "white-flexible"}
          withoutFocus
          onClick={() => onLevelChange(4)}
        >
          Level 4
        </Button>
      </div>
    </div>
  );
};

export default TopSection;
