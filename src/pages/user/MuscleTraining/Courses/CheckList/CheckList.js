import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { fetchChecklist } from '../../../../../redux/checklist/slice';
import { word, phrase, isFetching } from '../../../../../redux/checklist/selectors';
import { lastMotivationTimestamp } from '../../../../../redux/training/selectors';

// Utils
import { getUrlBasedOnLastTrainingTime } from '../../../../../utils/trainingHelper';

import Footer from '../../../../../shared/Footer';
import Header from '../../../../../shared/Header';
import Loading from '../../../../../shared/Loading';
import Menu from '../../../../../shared/Menu';
import Tab from '../../../../../shared/Menu/components/Tab';
import ItemCard from '../../../../../shared/ItemCard';
import SearchIcon from '../../../../../shared/icons/SearchIcon';

import LearnedWordsPhrase from './components/LearnedWordsPhrase';
import ToggleSwitch from '../../../../../shared/ToggleSwitch';

import style from './CheckList.module.css';

const CheckList = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { category } = useParams();
  const wordChecklist = useSelector(word);
  const phraseChecklist = useSelector(phrase);
  const fetchingData = useSelector(isFetching);
  const motivationTimestamp = useSelector(lastMotivationTimestamp);
  const [searchText, setSearchText] = useState('');
  const [prevSearchText, setPrevSearchText] = useState('');
  const [transitionStyles, setTransitionStyles] = useState('shrinkedSearchBar');
  const [isToggledOn, setIsToggledOn] = useState(true);
  const [selected, setSelected] = useState(category);
  const wordRoute = '/proficiency/knowledge/check-list/word';
  const phraseRoute = '/proficiency/knowledge/check-list/phrase';
  const noDataFound = 'が見つかりませんでした。';

  const isWord = () => {
    return selected === 'word';
  };

  const getChecklist = () => {
    return isWord() ? wordChecklist : phraseChecklist;
  };

  const toggleTab = (type) => {
    setSearchText('');
    setSelected(type);
  };

  const startQuickStart = async () => {
    const questionType = 'checklist';
    const route = `/training/muscle-exam?learningType=${selected}&questionType=${questionType}`;

    localStorage.setItem('unit_id', null);
    localStorage.setItem('prev_route', `/proficiency/knowledge/check-list/${selected}`);
    localStorage.setItem('selected_question_type', questionType);

    history.push(getUrlBasedOnLastTrainingTime(motivationTimestamp, route, selected));
  };

  const dispatchFetchChecklist = (searchText = null) => {
    const payload = {
      learningType: selected,
      searchText,
    };

    dispatch(fetchChecklist(payload));
  };

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;

    dispatchFetchChecklist(searchText);
  };

  useEffect(() => {
    // Fetch all checklist when search field is empty.
    if (searchText.length === 0 && prevSearchText.length === 1) {
      dispatchFetchChecklist();
    }

    setPrevSearchText(searchText);
  }, [searchText]);

  useEffect(() => {
    let checklistTab = [
      '/proficiency/knowledge/check-list/phrase',
      '/proficiency/knowledge/check-list/word'
    ];
    let breadcrumbs = localStorage.getItem('breadcrumbs').split(',');

    if (checklistTab.includes(breadcrumbs[0])) {
      breadcrumbs[0] = location.pathname
      localStorage.setItem('breadcrumbs', breadcrumbs);
    }

    dispatchFetchChecklist();
  }, [selected]);

  const onFocusChange = (event) => {
    if (event === 'focusIn') return setTransitionStyles('searchBar');
    setTransitionStyles('shrinking');
  };

  const getToggleStyle = () => {
    if (transitionStyles === 'shrinkedSearchBar') return { display: 'inherit' }; 

    if (transitionStyles === 'shrinking') {
      setTimeout(() => {
        setTransitionStyles('shrinkedSearchBar');
      }, 500);
    }
  };

  return (
    <div className="pb-28 bg-background-200 h-screen">
      <div className={`fixed w-full z-10 ${fetchingData && style.header}`}>
        <div>
          <Header
            hasBack={true}
            title="筋トレ Check List"
          />
        </div>
        <div className={`-mt-px-1 ${style.phraseMenu}`}>
          <Menu bgColor="primary-500" spaceX="7" paddingX="4" paddingY="3">
            <Link to={wordRoute}>
              <Tab
                to={wordRoute}
                type="rounded4"
                isActive={isWord()}
                onClick={() => toggleTab('word')}
              >
                単語
              </Tab>
            </Link>
            <Link to={phraseRoute}>
              <Tab
                to={phraseRoute}
                type="rounded4"
                isActive={!isWord()}
                onClick={() => toggleTab('phrase')}
              >
                フレーズ
              </Tab>
            </Link>
          </Menu>
        </div>
      </div>

      <div className={`${style.container}`}>
        <div className={`flex flex-col items-center justify-center px-4 fixed w-full z-50 bg-background-200 py-px-19 ${style.phraseMenu}`}>
          <ItemCard
            bgColor="bg-primary-500 text-basic-400"
            width={null}
            height="48px"
            className="flex-col items-center justify-center w-full mx-16 cursor-pointer"
            onClick={() => startQuickStart()}
          >
            { isWord() ? 'リストの単語をまとめて復習' : 'リストのフレーズをまとめて復習' }
          </ItemCard>
          <div className="mt-7 py-1.5 w-full flex">
            <div
              className={`relative ${style[transitionStyles]}`}
              onFocus={() => onFocusChange('focusIn')}
              onBlur={() => onFocusChange('focusOut')}
            >
              <SearchIcon
                fill="#044071"
                width="20"
                height="20"
                className="absolute inset-y-0 right-0 flex items-center mt-px-5 mr-px-17"
                onClick={handleSearchTextSubmit}
              />
              <input
                type="text"
                placeholder={`${isWord() ? '単語' : 'フレーズ'}を検索`}
                className="py-1.5 px-4 pr-10 w-full rounded-full h-px-32"
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                onKeyDown={handleSearchTextSubmit}
              />
            </div>
            <div
              className={`flex pl-px-17 hidden`}
              style={getToggleStyle()}
            >
              <div className="font-hiragino font-bold text-14 text-primary-500 pr-px-8 pt-px-5">意味の表示</div>
              <div className="pt-px-1">
                <ToggleSwitch setIsToggledOn={setIsToggledOn} on />
              </div>
            </div>
          </div>
        </div>

        {fetchingData ? (
          <Loading
            height="h-4/5"
            rootPosition="absolute"
            className="bg-background-200 ${style.learnedLogs}"
            iconClass="bg-primary-500 text-primary-500"
            zIndex="z-0"
          />
        ) : (
          getChecklist()?.length ? (
            <LearnedWordsPhrase
              className={style.learnedCheckList}
              category={category}
              data={getChecklist()}
              isToggledOn={isToggledOn}
            />
          ) : (
            <p className={`mt-14 font-bold text-14 text-center text-primary-500 ${style.learnedCheckList}`}>
              {`${isWord() ? '単語' : 'フレーズ'}${noDataFound}`}
            </p>
          )
        )}
      </div>

      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default CheckList;
