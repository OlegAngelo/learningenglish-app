import React, { useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';

import Button from '../../../../../../shared/Button';
import AddBoxIcon from '../../../../../../shared/icons/AddBoxIcon';
import SearchIcon from '../../../../../../shared/icons/SearchIcon';

import useComponentVisible from '../../../../../../utils/useComponentVisible';

import style from '../../List.module.css';
import ChevronDownIcon from '../../../../../../shared/icons/ChevronDownIcon';

const TopSection = () => {
  const history = useHistory();
  const URLParams = new URLSearchParams();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const [searchText, setSearchText] = useState('');
  const [prevSearchText, setPrevSearchText] = useState('');
  const {
    page = 1,
    keyword = '',
    orderBy = 'desc',
    orderByColumn = 'created_at',
    perPage = URLParams.perPage ?? 10,
    category = URLParams.category ?? '',
  } = queryString.parse(useLocation().search);
  const { isFetchingLecturesList } = useSelector(
    (state) => state.lectures
  );

  useEffect(() => {
    keyword && setSearchText(keyword);
    keyword && setPrevSearchText(keyword);
  }, []);

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    setPrevSearchText(searchText);
    
    URLParams.append("page", 1);
    URLParams.append("keyword", searchText);
    URLParams.append("orderBy", orderBy);
    URLParams.append("orderByColumn", orderByColumn);
    URLParams.append("perPage", perPage);
    URLParams.append("category",category);
    history.push({search: URLParams.toString()})
  };

  useEffect(() => {
    if (searchText.length === 0 && !isFetchingLecturesList && searchText !== prevSearchText) {

      URLParams.append("page", 1);
      URLParams.append("orderBy", orderBy);
      URLParams.append("orderByColumn", orderByColumn);
      URLParams.append("perPage", perPage);
      URLParams.append("category",category);
      history.push({search: URLParams.toString()})
    }
  }, [searchText]);

  // clear search text field if user click again the lectures list page sidebar button
  useEffect(() => {
    if (keyword === '') setSearchText('');
  }, [keyword]);

  const handleRecordsPerPage = (event) => {
    if (isFetchingLecturesList) return;
    
    URLParams.append("page", 1);
    URLParams.append("keyword", searchText);
    URLParams.append("orderBy", orderBy);
    URLParams.append("orderByColumn", orderByColumn);
    URLParams.append("perPage", event.target.value);
    URLParams.append("category",category);
    history.push({search: URLParams.toString()})
  }

  const handleCategoryChange = (event) => {
    URLParams.append("page", 1);
    URLParams.append("keyword", searchText);
    URLParams.append("orderBy", orderBy);
    URLParams.append("orderByColumn", orderByColumn);
    URLParams.append("perPage", perPage);
    URLParams.append("category", event.target.value);
    history.push({search: URLParams.toString()})
  }

  return (
    <div>
      <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
        大教室　授業一覧
      </span>
      <div className={`flex justify-between pt-px-12 ${style.table}`}>
        <div className="flex">
          <div>
            { isComponentVisible && !searchText && <SearchIcon className={`z-10 absolute ${style.searchIcon}`} /> }
            <div className="w-1/3">
              <input
                type="text"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                value={searchText}
                onChange={event => setSearchText(event.target.value)} 
                onKeyDown={handleSearchTextSubmit}
                ref={ref}
                onFocus={()=> setIsComponentVisible(false)}
                defaultValue={keyword}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <Link to="/admin/lectures/register/live">
            <Button
              className="mr-px-10"
              innerClass="cursor-pointer"
              type="blue-square"
              icon={<AddBoxIcon width="16" height="16" />}
            >
              LIVE授業を登録
            </Button>
          </Link>
          <Link to="/admin/lectures/register/on-demand/overview">
            <Button
              innerClass="cursor-pointer"
              type="blue-square"
              icon={<AddBoxIcon width="16" height="16" />}
            >
              オンデマンド授業動画を登録
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex mt-px-8">
        <div className={`bg-adminGray-50 rounded-px-2 border-px-2 border-adminGray-200 text-12 px-px-11 relative inline-flex items-center ${style.selectDrop}`}>
          <span className={`font-semibold ${style.filterText}`}>表示件数：</span>
          <select
            className={`w-px-76 ${style.filters}`}
            onChange={handleRecordsPerPage}
            value={perPage}
          >
            <option value="10" >10件</option>
            <option value="30" >30件</option>
            <option value="50" >50件</option>
          </select>
        </div>
        <div className={`ml-px-8 bg-adminGray-50 rounded-px-2 border-px-2 border-adminGray-200 text-12 px-px-11 relative inline-flex items-center ${style.selectDrop}`}>
          <span className={`font-semibold ${style.filterText}`}>カテゴリ：</span>
          <select
            className="w-px-202"
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">ALL</option>
            <option value="live">LIVE</option>
            <option value="grammar">文法</option>
            <option value="listening">Listening</option>
            <option value="reading">Reading</option>
            <option value="speaking">Speaking</option>
            <option value="writing">Writing</option>
            <option value="culture">異文化</option>
            <option value="tips">ビジネス英語Tips</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
