import Info from '../Info/Info';
import GoalCard from './GoalCard';
import style from './CorporateGoals.module.css';

const CorporateGoals = () => {
  return (
    <div className="mt-32">
      <p className="text-left font-bold font-hiragino text-18 text-background-300 leading-none">
        目標
      </p>
      <div className="pt-5">
        <Info
          label="現在の目標"
          content="プレゼン　内容理解"
        />
      </div>
      <div className="mt-10">
        <p className="text-left font-bold font-hiragino text-12 leading-none text-adminGray-400 overflow-ellipsis overflow-hidden align-baseline">
          達成済みの目標
        </p>
        <div className={`grid gap-x-1 grid-cols-6 ${style.cardInfo}`}>
          <GoalCard
            label="高校英語"
            content="内容理解"
            completed={true} 
          />
          <GoalCard
            label="プレゼン"
            content="内容理解"
            completed={false} 
          />
          <GoalCard
            label="英語原文での"
            content="情報収集"
            completed={true} 
          />
          <GoalCard
            label="準備をしたうえで"
            content="会議・プレゼン"
            completed={false} 
          />
          <GoalCard
            label="英語会議"
            content="内容理解"
            completed={false} />
          <GoalCard
            label="テキスト"
            content="コミュニケー ション"
            completed={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default CorporateGoals;
