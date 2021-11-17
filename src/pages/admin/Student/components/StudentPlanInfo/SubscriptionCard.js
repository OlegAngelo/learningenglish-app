import style from './SubscriptionCard.module.css'

const SubscriptionCard = ({ label, content }) => {
  return (
    <div className={`bg-white rounded-px-4 border rounded-r p-4 ${style.card}`}>
      <p className="text-left font-bold font-hiragino text-12 text-adminGray-400 leading-none">{label}</p>
      <p className="pt-px-12 text-left font-normal font-hiragino text-16 leading-none text-adminGray-800">{content}</p>
    </div>
  );
};

export default SubscriptionCard;
