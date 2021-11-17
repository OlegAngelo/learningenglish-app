import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import useComponentVisible from '../../../../../../utils/useComponentVisible';
import SearchIcon from '../../../../../../shared/icons/SearchIcon';
import Button from '../../../../../../shared/Button';
import AccountBoxIcon from '../../../../../../shared/icons/AccountBoxIcon';

import style from './TopSection.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TopSection = () => {
  const history = useHistory();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [searchText, setSearchText] = useState('');
  const [isUsingSearch, setIsUsingSearch] = useState(false);
  const records = useQuery().get('records') ?? 10;

  // To be updated from dynamic data
  const handleSearchTextSubmit = (event) => {
    if (event.type === 'keydown' && event.key !== 'Enter') return;
    let recordsParam = records ? `&records=${records}` : '';
    history.push(
      `/admin/administrators?page=1&keyword=${searchText}${recordsParam}`
    );
    setIsUsingSearch(true);
  };

  return (
    <div className={`flex justify-between pt-px-12 ${style.table}`}>
      <div className='flex'>
        {isComponentVisible && !searchText && (
          <SearchIcon className={`z-10 absolute ${style.searchIcon}`} />
        )}
        <div>
          <div className='w-1/3'>
            <input
              type='text'
              className='bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14'
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={handleSearchTextSubmit}
              ref={ref}
              onFocus={() => setIsComponentVisible(false)}
            />
          </div>
        </div>
        <div className='ml-px-16'>
          <div className={`${style.selectDrop}`}>
            表示件数：
            <select
              className='w-px-76 font-semibold bg-adminGray-50 focus:outline-none py-px-6 cursor-pointer'
              // onChange={}
              // value={records}
            >
              <option value='10'>10件</option>
              <option value='30'>30件</option>
              <option value='50'>50件</option>
            </select>
          </div>
        </div>
      </div>
      <NavLink to='/corp/admins/register'>
        <Button
          innerClass='cursor-pointer'
          type='blue-square'
          icon={<AccountBoxIcon color='white' width='15' height='15' />}
        >
          法人管理者追加
        </Button>
      </NavLink>
    </div>
  );
};

export default TopSection;
