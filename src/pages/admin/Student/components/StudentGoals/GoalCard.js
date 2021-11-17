import style from './GoalCard.module.css';

const GoalCard = ({label, content, completed}) => {
  return (
    <div className={`rounded-px-2 border p-4 ${completed? style.completed : style.notCompleted}`}>
      <p className="text-left font-normal font-hiragino text-12 text-400 leading-none">{label}</p>
      <div className="pt-px-6" />
      <p className="text-left font-normal font-hiragino text-12 text-400 leading-none">{content}</p>
    </div>
  );
};

export default GoalCard;
