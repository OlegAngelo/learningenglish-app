import SubscriptionCard from './SubscriptionCard';
import style from './CorporatePlanInfo.module.css';

const CorporatePlanInfo = () => {
  return (
    <div className="mb-28">
      <p className="text-left font-bold font-hiragino text-18 text-background-300 leading-none">
        プラン情報
      </p>
      <div className="h-px-16" />
      <div className={`grid gap-x-1 grid-cols-3 ${style.card}`}>
        <SubscriptionCard 
          label="課金プラン" 
          content="サブスク（一ヶ月）2021/11/01終了" 
        />
      </div>
    </div>
  );
};

export default CorporatePlanInfo;
