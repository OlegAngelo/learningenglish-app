import React from 'react';

import Breadcrumb from '../../../../shared/Breadcrumb/Breadcrumb';

import FormWrapper from './components/FormWrapper/FormWrapper';
import HeaderSection from './components/HeaderSection/HeaderSection';
import MainContent from './components/MainContent/MainContent';
import TabContent from './components/TabContent/TabContent';
import TabMenu from './components/TabContent/components/TabMenu';
import TabMenuItem from './components/TabContent/components/TabMenuItem';
import Content from './components/TabContent/components/Content';
import BasicInformation from './components/BasicInformation/BasicInformation';

const Index = () => {
  return (
    <div className="flex-1 w-full bg-adminGray-100 pb-px-100 overflow-scroll overflow-x-hidden">
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/corp" />
        <Breadcrumb text="学習者" to="/corp/users" />
        <Breadcrumb text="学習者詳細" to="#3" active last />
      </div>

      <div className={`bg-white mx-8 rounded-px-4 w-px-928 shadow-card`}>
        <FormWrapper>
          <HeaderSection />
          <MainContent>
            <TabContent>
              <TabMenu>
                <TabMenuItem text="基本情報" name="tab-1" />
                <TabMenuItem text="学習ログ" name="tab-2" />
              </TabMenu>
              <Content>
                <BasicInformation name="tab-1" />
              </Content>
            </TabContent>
          </MainContent>
        </FormWrapper>
      </div>
    </div>
  );
};

export default Index;
