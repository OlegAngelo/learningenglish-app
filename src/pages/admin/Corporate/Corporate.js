import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

import CorporatePersonalInfo from './components/CorporatePersonalInfo/CorporatePersonalInfo';
import CorporateInformation from './components/CorporateInformation/CorporateInformation';
import CorporateGoals from './components/CorporateGoals/CorporateGoals';
import CorporatePlanInfo from './components/CorporatePlanInfo/CorporatePlanInfo';
import Board from './components/Board/Board';
import Breadcrumb from '../../../shared/Breadcrumb/Breadcrumb';
import ArrowBackIcon from '../../../shared/icons/ArrowBackIcon';
import Menu from '../../../shared/Menu/Menu';
import Tab from '../../../shared/Menu/components/Tab/Tab';
import style from './Corporate.module.css';

const Corporate = () => {
  const location = useLocation();
  const currentTab = useParams().tab;
  const id = useParams().id;

  const tabs = [
    {
      name: '基本情報',
      link: `/admin/corporates/${id}/basic-information`,
      type: 'basic-information',
    },
    {
      name: '学習ログ',
      link: `/admin/corporates/${id}/learning-log`,
      type: 'learning-log',
    },
  ];

  return (
    <div className={`flex-1 w-full bg-adminGray-100 ${style.corporateContainer}`}>
      <div className="flex pb-px-16 pl-px-32 pt-px-24">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="学習者" to="/admin/users" />
        <Breadcrumb text="学習者詳細" to="#3" active last />
      </div>

      <Board className={style.board}>
        <div className="w-max h-px-59 flex items-center border-adminGray-200">
          <Link to={`/admin/users${location.state?.prevQuery ?? ''}`}>
            <ArrowBackIcon
              className="mx-px-16"
              color="#9CA3AF"
              width="24px"
              height="24px"
            />
          </Link>
          <span className="text-background-300 font-bold leading-none text-20 pl-px-4">
            学習者情報
          </span>
        </div>
        <hr />

        <div className={`flex mt-px-16 mb-px-24 relative mb-30 ${style.topButtonContainer}`}>
          <Menu spaceX="7" paddingX="0" paddingY="0" className="flex">
            {tabs.map((tab, index) => {
              return (
                <Link
                  to={tab.link}
                  key={index}
                  className={`w-px-220 ${style.menu}`}
                >
                  <Tab
                    type="flat2"
                    isActive={tab.type === currentTab}
                    className={`${style.padding} text-background-300`}
                  >
                    {tab.name}
                  </Tab>
                </Link>
              );
            })}
          </Menu>
        </div>

        {currentTab === 'basic-information' && (
          <div className={`flex mt-px-16 mb-px-24 relative mb-30 ${style.boardBody}`}>
             <div className={`w-full ${style.boardRowContent}`}>
              <CorporatePersonalInfo />
              <CorporateInformation />
              <CorporateGoals />
              <CorporatePlanInfo />
             </div>
          </div>
        )}
      </Board>
    </div>
  );
};

export default Corporate;
