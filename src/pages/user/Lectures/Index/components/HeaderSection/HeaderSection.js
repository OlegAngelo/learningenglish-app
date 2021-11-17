import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../../../../../shared/Header/Header';
import DropdownModal from '../../../../../../shared/DropdownModal';
import ChevronUpIcon from '../../../../../../shared/icons/ChevronUpIcon';
import ChevronDownIcon from '../../../../../../shared/icons/ChevronDownIcon';

import SearchIcon from '../../../../../../shared/icons/SearchIcon';
import ExpandMoreIcon from '../../../../../../shared/icons/ExpandMoreIcon';
import { enableScroll, disableScroll } from '../../../../../../utils/scrollableHelper';
import { setShowFilters } from '../../../../../../redux/userLectures/slice';
import { linkItems } from '../../../../../../config/lectureLinkItems.json'

import style from './HeaderSection.module.css';

// Config
import { level } from '../../../../../../config/lectureDifficulties.json';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const HeaderSection = ({ setIsTyping }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const URLParams = new URLSearchParams();
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState({
    level : useQuery().get('level') ?? 0,
    keyword : useQuery().get('keyword') ?? '',
  });
  const location = useLocation();
  const { showFilters, pageYOffset } = useSelector(state => state.userLectures);

  const currentTab = useParams().tab;

  const closeModal = () => {
    setShowDropDownModal(false);
    enableScroll();
  };

  const dropdownOnChange = async (value) => {
    setFilter({
      ...filter,
      [showDropDownModal] : value,
    });
    closeModal();
    URLParams.append("level", value);
    URLParams.append("keyword", searchText ?? '');
    history.push({search: URLParams.toString()});
  };

  useEffect(() => {
    if(showDropDownModal)  disableScroll();
  }, [showDropDownModal]);

  useEffect(() => {
    if (searchText === '' || !searchText) {
      let {level} = filter;
      URLParams.append("level", level);
      URLParams.append("keyword", searchText);
      history.push({search: URLParams.toString()});
    }
  }, [searchText]);

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;

    let {level} = filter;
    URLParams.append("level", level);
    URLParams.append("keyword", searchText);
    history.push({search: URLParams.toString()});
  };

  useEffect(() => {
    if (currentTab) {
      document
        .querySelector(`#${currentTab}`)
        .scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  });

  return (
    <div className="fixed w-full top-0 z-10">
      {showDropDownModal && (
        <DropdownModal
          closeModal={closeModal}
          dropdownOnChange={dropdownOnChange}
          selected={filter[showDropDownModal]}
          labels={level}
        />
      )}
      <Header title="大教室" hasBack={true} forcedUrl='/training'>
        {/* #tmp - lecture bookmark */}
        {/* <div className="grid justify-items-center">
          <Heart link="/lectures/bookmarks" />
          <span className="text-basic-400 font-bold text-8 font-hiragino-kaku">
            Bookmarks
          </span>
        </div> */}
      </Header>
      <nav
        className={`${style.scroll} primary-500 text-white text-14 bg-primary-500 -mt-px-1`}
      >
        {linkItems.map((item, index) => (
            <Link
              id={item.tab}
              to={{ pathname: item.to, search: location.search }}
              key={index}
              className={`${style.navItem} ${(currentTab == item.tab ) && style.active }`}
            >
              {item.title}
            </Link>
        ))}
      </nav>

      <div className={`flex ${style.lectureBoxShadow} flex-col items-center justify-center px-4 fixed w-full bg-background-200 py-px-11 `}>
        <div
          className={`flex w-full items-center cursor-pointer ${style.accordion}`}
          onClick={() => dispatch(setShowFilters({
            showFilters: !showFilters,
            pageYOffset,
          }))}
        >
          <div className="text-primary-500 text-14 font-bold w-5/6">検索・難易度絞り込み</div>
          <div className="w-1/6 flex justify-end mr-px-8">
            {showFilters
              ? <ChevronUpIcon
                  color="#044071"
                  width="12"
                  height="7.41"
                />
              : <ChevronDownIcon
                color="#044071"
                width="12"
                height="7.41"
              />
            }
          </div>
        </div>
          
        <div className={`w-full ${!showFilters ? style.accordionPanelHidden : style.accordionPanelShow}`}>
          <div className="pb-1.5 pt-px-19 w-full flex">
            <input
              type="text"
              placeholder={`キーワード検索`}
              className="py-1.5 px-4 pr-10 w-full rounded-full h-px-32"
              onChange={event => setSearchText(event.target.value)}
              onKeyDown={handleSearchTextSubmit}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
            <SearchIcon
              fill="#044071"
              width="20"
              height="20"
              className="absolute right-0 flex items-center mt-px-5 mr-px-30"
              onClick={handleSearchTextSubmit}
            />
          </div>
          <div className="flex w-full items-center mt-px-10">
              <div className="font-bold text-14 text-primary-500 w-1/6">難易度</div>
              <div
                className={`w-5/6 justify-between flex items-center px-px-8 h-px-36 bg-adminGray-50 border-px-2 border-adminGray-300 rounded-px-2 cursor-pointer `}
                onClick={() => setShowDropDownModal('level')}
              >
                <p className="text-14 text-adminGray-700 h-px-20 ">
                  {level[filter.level]}
                </p>
                <ExpandMoreIcon height="7.41" width="12" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeaderSection;
