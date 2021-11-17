import Card from '../Card/Card';
import style from './StudentInformation.module.css';

const StudentInformation = () => {
  return (
    <div className={`mt-12 ${style.card}`}>
      <p className="text-left font-bold font-hiragino text-18 text-background-300 leading-none">
        情報
      </p>
      <div className="h-px-16" />
      <div className={`grid gap-x-4 grid-cols-3 ${style.cardInfo}`}>
        <Card label="会員登録日（メアド登録日）" content="2020/12/01" />
        <Card label="7日間無料登録日（クレカ登録日）" content="2020/12/01" />
        <Card label="利用状況" content="利用中" />
        <Card label="TOEIC検定スコア" content="550~630" />
        <Card label="CASEC検定スコア" content="600~649" />
      </div>
    </div>
  );
};

export default StudentInformation;
