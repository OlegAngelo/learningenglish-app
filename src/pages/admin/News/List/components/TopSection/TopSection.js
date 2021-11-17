import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../../../../../shared/Button/Button';
import AddBoxIcon from '../../../../../../shared/icons/AddBoxIcon';
import SearchIcon from '../../../../../../shared/icons/SearchIcon';
import SaveAllIcon from '../../../../../../shared/icons/SaveAllIcon';

import useComponentVisible from '../../../../../../utils/useComponentVisible';

import style from '../../List.module.css';
import ChevronDownIcon from '../../../../../../shared/icons/ChevronDownIcon';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TopSection = ({ setUploadModal, setShowDownloadModal }) => {
  const history = useHistory();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const [searchText, setSearchText] = useState('');
  const [prevSearchText, setPrevSearchText] = useState('');
  const {
    isFetchingNewsList,
    news,
  } = useSelector(state => state.news);
  const keyword = useQuery().get('keyword') ?? '';
  const records = useQuery().get('records') ?? 10;
  const page = useQuery().get('page') ?? 1;

  useEffect(() => {
    keyword && setSearchText(keyword);
    keyword && setPrevSearchText(keyword);
  },[])

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    setPrevSearchText(searchText);
    let recordsParam = records ? `&records=${records}` : '';
    history.push(`/admin/news?page=1&keyword=${searchText}${recordsParam}`);
  };

  useEffect(() => {
    if (searchText.length === 0 && !isFetchingNewsList && searchText !== prevSearchText) {
      history.push(`/admin/news?page=1&records=${records}`);
    }
  }, [searchText]);

  // clear search text field if user click again the news list page sidebar button
  useEffect(() => {
    if (keyword === '') setSearchText('');
  }, [keyword]);

  const handleNumberOfRecords = (event) => {
    if (isFetchingNewsList) return;
    let keywordParam = keyword ? `&keyword=${keyword}` : '';
    history.push(`/admin/news?page=1${keywordParam}&records=${event.target.value}`);
  }

  const importOnClickHandler = (event) => {
    setUploadModal(true);
    event.target.blur();
  }

  const exportOnClickHandler = (event) => {
    setShowDownloadModal(true);
    event.target.blur();
  }

  return (
    <div>
      <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
        ニュース一覧
      </span>
      <div className={`flex justify-between pt-px-12 ${style.table}`}>
        <div className="flex">
          <div>
            { isComponentVisible && !searchText && <SearchIcon className={`z-10 absolute ${style.searchIcon}`} /> }
            <div className="w-1/3">
              <input
                type="text"
                className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 px-px-11 py-px-12 text-14"
                value={searchText}
                onChange={event => setSearchText(event.target.value)} 
                onKeyDown={handleSearchTextSubmit}
                ref={ref}
                onFocus={()=> setIsComponentVisible(false)}
              />
            </div>
          </div>
          <div className="ml-px-16">
            <div className={`${style.selectDrop}`}>
              表示件数：
              <select
                className={`w-px-76 font-semibold bg-adminGray-50 focus:outline-none py-px-6 cursor-pointer ${style.selectArrow}`}
                onChange={handleNumberOfRecords}
                value={records}
              >
                <option value="10" >10件</option>
                <option value="30" >30件</option>
                <option value="50" >50件</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex">
          <Button
            className="mr-px-10"
            innerClass={news?.total ? 'cursor-pointer' : ''}
            type="blue-square"
            icon={<SaveAllIcon />}
            onClick={exportOnClickHandler}
            disabled={!news?.total}
          >
            エクセルで出力
          </Button>
          <Button
            innerClass="cursor-pointer"
            type="blue-square"
            icon={<AddBoxIcon width="16" height="16" />}
            onClick={importOnClickHandler}
          >
            記事をアップロード
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
