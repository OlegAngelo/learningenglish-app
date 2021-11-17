import React, { useEffect, useState } from 'react';
import { useHistory, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useComponentVisible from '../../../utils/useComponentVisible';
import Breadcrumb from '../../../shared/Breadcrumb';
import SearchIcon from '../../../shared/icons/SearchIcon';
import Button from '../../../shared/Button/Button';
import CorporateUsersTable from './CorporateUsersTable';

import styles from './LearnerList.module.css';

import { fetchStudentList } from '../../../redux/users/slice';
import IndividualUsersTable from './IndividualUsersTable';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LearnerList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const page = useQuery().get('page') ?? 1;
  const keyword = useQuery().get('keyword') ?? '';
  const records = useQuery().get('records') ?? 10;
  const [searchText, setSearchText] = useState('');
  const [isUsingSearch, setIsUsingSearch] = useState(false);
  const [prevSearchText, setPrevSearchText] = useState('');
  const [isCorporate, setIsCorporate] = useState(false);

  const {
    students,
    isFetchingStudentList,
  } = useSelector(state => state.users);

  useEffect(() => {
    keyword && setSearchText(keyword);
    keyword && setPrevSearchText(keyword);
  },[])

  useEffect(() => {
    const payload = {
      page,
      keyword,
      records,
    }
    dispatch(fetchStudentList(payload));
  }, [page, keyword, records])

  useEffect(() => {
    if (searchText.length === 0 && !isFetchingStudentList) {
      history.push(
        `/admin/users?page=${page}&records=${records}&keyword=${keyword}`
      );
    }
    if (searchText.length === 0 && isUsingSearch) {
      history.push(`/admin/users?page=1`);
    }
    setIsUsingSearch(true);
  }, [searchText]);

  useEffect(() => {
    if (localStorage.getItem('prevButton') === 'individual') setIsCorporate(false);
    else setIsCorporate(true);
  }, []);

  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    let recordsParam = records ? `&records=${records}` : '';
    history.push(
      `/admin/users?page=1&keyword=${searchText}${recordsParam}`
    );
    setIsUsingSearch(true);
  };
  
  const onPageChange = ({selected}) => {
    if (isFetchingStudentList) return;
    let keywordParam = keyword ? `&keyword=${keyword}` : '';
    let recordsParam = records ? `&records=${records}` : '';
    history.push(
      `/admin/users?page=${selected + 1}${recordsParam}${keywordParam}`
    );
  };

  // Should use router instead of localStorage
  const getUrl = (student) => {
    if (student.corporate_id == null) {
      history.push({
        pathname: `/admin/users/${student?.id}`,
        state: {
          prevQuery: location.search,
        },
      });
      localStorage.setItem('prevButton', 'individual');
    } else {
      history.push({
        pathname: `/admin/corporates/${student?.corporate_id}/basic-information`,
        state: {
          prevQuery: location.search,
        },
      });
      localStorage.setItem('prevButton', 'corporate');
    }
  };

  const handleNumberOfRecords = (event) => {
    if (isFetchingStudentList) return;
    let keywordParam = keyword ? `&keyword=${keyword}` : '';
    history.push(`/admin/users?page=1${keywordParam}&records=${event.target.value}`);
  };

  const handleUserType = (params) => {
    if (params === 'individual') setIsCorporate(false);
    else setIsCorporate(true);
  };
  
  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="学習者" to="#2" active last  />
      </div>
      <div className="pb-4">
        <div>
          <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
            学習者一覧
          </span>
          <div className={`flex justify-between pt-px-12`}>
            <div className="flex">
              <div>
                {isComponentVisible && !searchText && <SearchIcon className={`z-10 absolute ${styles.search}`} />}
                <div className="w-1/3">
                  <input
                    type="text"
                    className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
                    value={searchText}
                    onChange={event => setSearchText(event.target.value)}
                    onKeyDown={handleSearchTextSubmit}
                    ref={ref}
                    onFocus={()=> setIsComponentVisible(false)}
                  />
                </div>
              </div>
              <div className="ml-px-16">
                <div className={`${styles.selectDrop}`}>
                  表示件数：
                  <select
                    className={`w-px-76 font-semibold bg-adminGray-50 focus:outline-none py-px-6 cursor-pointer ${styles.selectArrow}`}
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
          </div>
          <div className="flex mt-px-16 mb-px-24">
            <Button
              innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${styles.button} ${isCorporate && styles.buttonInactive}`}
              type={!isCorporate? "blue-flexible" : "white-flexible"}
              withoutFocus
              onClick={() => handleUserType('individual')}
            >個人</Button>
            <Button
              className="ml-px-8"
              innerClass={`cursor-pointer px-px-16 py-px-7 font-bold text-12 ${styles.button} ${!isCorporate && styles.buttonInactive}`}
              type={isCorporate ? "blue-flexible" : "white-flexible"}
              withoutFocus
              onClick={() => handleUserType('corporate')}
            >法人</Button>
          </div>
        </div>
        {/* testing area */}
        <div className="pb-px-30">
          { isCorporate? (
            <CorporateUsersTable 
              getUrl={getUrl} 
            />
          ) : (
            <IndividualUsersTable
              getUrl={getUrl}
              onPageChange={onPageChange}
              students={students}
              isFetchingStudentList={isFetchingStudentList}
              keyword={keyword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnerList;
