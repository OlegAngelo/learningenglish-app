import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from '../../../../../shared/Breadcrumb';
import MainContent from './components/MainContent';
import HeaderSection from './components/HeaderSection';
import ReadableInfoSection from './components/ReadableInfoSection';
import PhraseListSection from './components/PhraseListSection';
import AdminListeningApi from '../../../../../api/SelfLearning/Listening/AdminListeningApi';

const SetDetails = () => {
  const { id } = useParams();

  const [listeningSet, setListeningSet] = useState({});
  const [phrases, setPhrases] = useState([]);
  const [isFetchingList, setIsFetchingList] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await AdminListeningApi.getSummary(id);
        setListeningSet(response.data);
        setPhrases(response.data.phrases);
        setIsFetchingList(false);
      } catch (error) {
        console.log(error.response);
      }
    }

    getSummary();
  }, []);

  return (
    <Fragment>
      <div className="flex-1 w-full bg-adminGray-100 pb-px-100 overflow-scroll overflow-x-hidden">
        <div className="flex pb-px-16 pl-px-32 pt-px-24">
          <Breadcrumb text="ダッシュボード" to="/admin" />
          <Breadcrumb text="Listening" to="/admin/listening" />
          <Breadcrumb text="詳細" to="#3" active last />
        </div>

        <div className="pb-12 bg-adminGray-100">
          <div className={`bg-white mx-8 rounded-px-4 shadow-card`}>
            <HeaderSection />
            <MainContent>
              <ReadableInfoSection listeningSet={listeningSet}/>
              <PhraseListSection 
                phrases={phrases} 
                listeningSet={listeningSet}
                isFetchingList={isFetchingList} 
              />
            </MainContent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SetDetails;
