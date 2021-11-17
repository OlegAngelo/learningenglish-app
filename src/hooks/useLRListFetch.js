import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import LectureApi from '../api/LectureApi';

export default function useLRListFetch(onFinishCallback) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const type = location.pathname === '/self-learning/listening' ? 'listening' : 'reading';
  const tag = type === 'reading' ? 'チャンクリーディング' : 'ディクテーション';

  useEffect(() => {
    setLoading(true);
    setError(false);

    let params = {
      page: pageNumber,
      keyword: tag,
      genre: type,
    };

    LectureApi.fetchUserSLLectureList(params)
      .then((res) => {
        setLectureList((prevState) => {
          return [...new Set([...prevState, ...res.data.data])];
        });
        setHasMore(res.data.data.length > 0);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        onFinishCallback();
      })
      .catch((e) => {
        setError(true);
      });
  }, [pageNumber]);

  return {
    loading,
    error,
    hasMore,
    lectureList,
    setLectureList,
    pageNumber,
    setPageNumber,
  };
}
