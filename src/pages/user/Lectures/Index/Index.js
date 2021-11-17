import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderSection from './components/HeaderSection';
import Footer from '../../../../shared/Footer/Footer';
import ContentSection from './components/ContentSection/ContentSection';

import { setShowFilters, resetShowFilters } from '../../../../redux/userLectures/slice'; 
import useUserLectureHistory from '../../../../hooks/useUserLectureHistory';

const Lectures = () => {
  const dispatch = useDispatch();
  useUserLectureHistory();
  const { showFilters, isFetchingUserLecturesList } = useSelector(state => state.userLectures);
  const [isTyping, setIsTyping] = useState(false);

  const headerSectionProps = {
    isTyping,
    setIsTyping
  };

  const updateScrollDir = () => {
    if (isFetchingUserLecturesList) return;

    const scrollY = window.pageYOffset;
    if (scrollY < 0 || isTyping) return;

    dispatch(setShowFilters({
      showFilters: false,
      pageYOffset: scrollY
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollDir);
  
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, [isTyping, showFilters, isFetchingUserLecturesList]);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', updateScrollDir);
      dispatch(resetShowFilters());
    };
  }, []);

  return (
    <div className="h-screen">
      <HeaderSection {...headerSectionProps} />
      <ContentSection />
      <div className="fixed left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Lectures;
