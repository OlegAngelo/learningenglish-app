import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../../../shared/Header';
import Loading from '../../../../../shared/Loading';
import ListItem from '../../components/ListItem';
import FilterSection from './components/FilterSection';
import ListItemModal from '../../components/ListItemModal';

import {
  fetchLevel,
  fetchReadingSentences,
  resetStates,
} from '../../../../../redux/selfLearning/reading/list/slice';
import style from './List.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const List = () => {
  const dispatch = useDispatch();
  const levelId = useParams().levelId;
  const [showModal, setShowModal] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);
  const {
    isFetchingSentences,
    sentences,
  } = useSelector((state) => state.selfLearningReadingList);

  const status = useQuery().get('status') ?? 'unspecified';

  useEffect(() => {
    dispatch(resetStates());
    dispatch(fetchLevel(levelId));
    localStorage.setItem('reading_level_id', levelId);

    return () => {
      dispatch(resetStates());
    };
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    dispatch(fetchReadingSentences({levelId, status})).finally(() => setIsFiltering(false));
  }, [status]);

  const props = {
    showModal,
    setShowModal,
    minutesLeft,
    setMinutesLeft,
    isClearIconShow: true
  };

  return (
    <div className="w-full h-screen flex flex-col flex-1">
      <ListItemModal {...props} />

      {isFetchingSentences
        ? <Loading
          className={`top-4 bg-background-200 ${style.loading}`}
          iconClass="bg-primary-500 text-primary-500"
        />
        : 
        <Fragment>
          <div className="fixed top-0 z-20 bg-background-200 w-screen">
            <Header
              title="Reading"
              hasBack={true}
              forcedUrl="/self-learning/reading"
            />
            <FilterSection />
          </div>
          <div className={`bg-background-200 pb-px-50 flex-1 ${style.listMarginTop}`}>
            {isFiltering ?
              (<Loading
                className={`flex items-center relative bg-background-200 z-50`}
                iconClass="bg-primary-500 text-primary-500"
              />) 
              : (sentences.length > 0
                  ? sentences.map((item) => (
                    <ListItem
                      item={item}
                      key={item.id}
                      redirectTo={`/self-learning/reading/${item.id}/exercise`}
                      {...props}
                    />
                  ))
                : <div className="text-center pt-8 text-12">問題が見つかりません</div>
              )
            }
          </div>
        </Fragment>
      }
    </div>
  );
};

export default List;
