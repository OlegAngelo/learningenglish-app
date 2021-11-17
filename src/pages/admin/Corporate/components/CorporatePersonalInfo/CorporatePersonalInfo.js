import Info from '../Info';
import style from './CorporatePersonalInfo.module.css';

const CorporatePersonalInfo = () => {
  return (
    <div className={`mt-6 grid grid-cols-3 gap-3 ${style.info}`}>
      <Info
        label="名前"
        content="佐藤 佑樹"
      />
      <Info
        label="メールアドレス"
        content="yuki.sato@edgeschool.co.jp"
      />
      <div className="ml-28">
        <Info
          label="年齢"
          content="23"
        />
      </div>
      <Info
        label="法人名"
        content="EDGe School"
      />
      <Info
        label="グループ"
        content="グループ名0000000001"
      />
    </div>
  );
};

export default CorporatePersonalInfo;
