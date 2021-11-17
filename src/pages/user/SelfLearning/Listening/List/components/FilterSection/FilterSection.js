import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

import ExpandMoreIcon from '../../../../../../../shared/icons/ExpandMoreIcon';
import DropdownModal from '../../../../../../../shared/DropdownModal';

import { labels, params } from '../../../../../../../config/selfLearningReadingListFilter.json';
import { enableScroll, disableScroll } from '../../../../../../../utils/scrollableHelper';


const FilterSection = ({ levelId }) => {
  const history = useHistory();
  const URLParams = new URLSearchParams();
  const [filter, setFilter] = useState(null);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const {
    status = URLParams.status ?? 'unspecified'
  } = queryString.parse(useLocation().search);

  const openModal = () => {
    setShowDropDownModal(true);
    disableScroll();
  }

  const closeModal = () => {
    setShowDropDownModal(false);
    enableScroll();
  }

  const dropdownOnChange = async (value) => {
    setFilter(value);
    closeModal();
    URLParams.append("status", params[value]);
    if (window.location.search === `?${URLParams.toString()}`) {
      window.scroll(0,0);
    } else {
      history.push({search: URLParams.toString()});
    }
  };

  const setJPFilterText = (status) => {
    params.map((item, key) => {
      if (status === item) setFilter(key)
    });
  }

  useEffect(() => {
    setJPFilterText(status)
  }, [])

  return (
    <>
      {showDropDownModal && (
        <DropdownModal
          closeModal={closeModal}
          dropdownOnChange={dropdownOnChange}
          selected={filter}
          labels={labels}
        />
      )}
      
      <h2 className="px-px-16 pt-px-16 text-18 font-bold font-hiragino text-primary-500 bg-background-200">{`Level ${levelId}`}</h2>
      <div className="px-px-16 pt-px-16 pb-px-16 flex items-center bg-background-200">
        <div className="font-bold text-14 text-primary-500 pr-px-8">ステータス</div>
        <div
          className={`flex-1 justify-between flex items-center pl-px-8 pr-px-14 h-px-36 border border-adminGray-300 rounded-px-2 cursor-pointer bg-adminGray-50`}
          onClick={openModal}
        >
          <p className="text-14 text-adminGray-700 h-px-20">
            {labels[filter]}
          </p>
          <ExpandMoreIcon classname="cursor-pointer" height="12" width="12"/>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
