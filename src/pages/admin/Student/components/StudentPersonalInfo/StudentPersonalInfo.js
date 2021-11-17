import Info from '../Info';
import style from './StudentPersonalInfo.module.css';

const StudentPersonalInfo = () => {
  return (
    <div className={`mt-6 grid grid-cols-3 gap-3`}>
      <Info
        label="名前"
        content="佐藤 佑樹"
        classInfo="text-left font-bold font-hiragino text-12 leading-none text-adminGray-400 overflow-ellipsis overflow-hidden align-baseline"
        classContent="text-left font-bold font-hiragino text-14 leading-none text-adminGray-900 overflow-ellipsis overflow-hidden align-baseline pb-8"
      />
      <Info
        label="メールアドレス"
        content="yuki.sato@edgeschool.co.jp"
        classInfo="text-left font-bold font-hiragino text-12 leading-none text-adminGray-400 overflow-ellipsis overflow-hidden align-baseline"
        classContent={`text-left font-hiragino text-14 leading-none text-400 overflow-ellipsis overflow-hidden align-baseline pb-8 ${style.contentText}`}
      />
      <div className="ml-28">
        <Info
          label="年齢"
          content="23"
          classInfo="text-left font-bold font-hiragino text-12 leading-none text-adminGray-400 overflow-ellipsis overflow-hidden align-baseline"
          classContent={`text-left font-hiragino text-14 leading-none text-400 overflow-ellipsis overflow-hidden align-baseline pb-8 ${style.contentText}`}
        />
      </div>
    </div>
  );
};

export default StudentPersonalInfo;
