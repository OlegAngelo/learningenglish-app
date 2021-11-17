import { Fragment, useState, useEffect } from 'react'
import { useParams } from "react-router";

import Breadcrumb from '../../../../../shared/Breadcrumb/Breadcrumb';
import HeaderSection from './components/HeaderSection/HeaderSection';
import MainContent from './components/MainContent/MainContent';
import ReadableInfoSection from './components/ReadableInfoSection/ReadableInfoSection';
import EditableInfoSection from './components/EditableInfoSection/EditableInfoSection';
import TabContent from './components/TabContent/TabContent';
import TabMenu from './components/TabContent/components/TabMenu';
import Content from './components/TabContent/components/Content';
import TabMenuItem from './components/TabContent/components/TabMenuItem';
import ArticleTab from './components/ArticleTab/ArticleTab';
import ChunkItemsTab from './components/ChunkItemsTab/ChunkItemsTab';
import ImportantWordsTab from './components/ImportantWordsTab/ImportantWordsTab';
import useReadingEdit from '../../../../../hooks/useReadingEdit';
import AdminReadingApi from '../../../../../api/SelfLearning/Reading/AdminReadingApi';
import AlertModal from '../../../../../shared/AlertModal/AlertModal';
import FormWrapper from './components/FormWrapper/FormWrapper';
  
const Details = () => {
  const { readingId } = useParams();
  const [readingSentence, setReadingSentence] = useState();
  const [summary, setSummary] = useState();
  const [chunks = [], setChunks] = useState();
  const [readingWords = [], setReadingWords] = useState();
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);

  localStorage.setItem('levelId', readingId);

  const { rules, submitToApi, isSubmitted } = useReadingEdit({
    setIsShowAlertModal,
    setIsSuccessRequest,
  });

  const registerLiveMessage = {
    true: '正常に更新しました。',
    false: '無効な入力をされた項目があります。',
    noInternet: 'エラーが発生しました。後ほど再度お試しください。',
  };

 
  const onClickAlertOk = () => {
      if (isSuccessRequest === true) window.location.href = '/admin/reading';
  };

  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await AdminReadingApi.getSummary(readingId);

        setReadingSentence(response.data.data);
        setReadingWords(response.data.data.words);
        setChunks(response.data.data.chunks);
        setSummary(response.data.summary);

      } catch (error) {
        console.log(error);
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
          <Breadcrumb text="Reading" to="/admin/reading" />
          <Breadcrumb text="詳細" to="#3" active last />
        </div>

        <div className="pb-12 bg-adminGray-100">
          <div
            className={`bg-white mx-8 rounded-px-4 shadow-card`}
          >
            <FormWrapper
              action={submitToApi}
              rules={rules}
              isSubmitted={isSubmitted}
              callbackWhenError={() => {
                setIsShowAlertModal(true);
                setIsSuccessRequest(false);
              }}
            >
              <HeaderSection />
              <MainContent>
                <ReadableInfoSection item={readingSentence} summary={summary}/>
                <EditableInfoSection item={readingSentence} />
                <TabContent>
                  <TabMenu>
                    <TabMenuItem text="本文" name="tab-1"/>
                    <TabMenuItem text="チャンク" name="tab-2"/>
                    <TabMenuItem text="語注リスト" name="tab-3"/>
                  </TabMenu>
                  <Content>
                    <ArticleTab item={readingSentence} name="tab-1" />
                    <ChunkItemsTab chunks={chunks} name="tab-2" />
                    <ImportantWordsTab items={readingWords} name="tab-3" />
                  </Content>
                </TabContent>
              </MainContent>
            </FormWrapper>
          </div>
        </div>

        <AlertModal 
          isShowModal={isShowAlertModal}
          setIsShowModal={setIsShowAlertModal}
          isSuccess={isSuccessRequest === true}
          message={registerLiveMessage[isSuccessRequest]}
          handleOnClickOk={onClickAlertOk}
          onClickOutsideClose={false}
        />
      </div>
    </Fragment>
  )
};

export default Details;
