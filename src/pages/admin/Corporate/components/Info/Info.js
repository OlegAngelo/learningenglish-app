import React from 'react';

import style from './Info.module.css';

const Info = ({ label, content }) => {
  return (
    <div className="w-px-255 h-px-42">
      <p className="text-left font-bold font-hiragino text-12 leading-none text-adminGray-400 overflow-ellipsis overflow-hidden align-baseline">{label}</p>
      <p 
        className={`${label === "名前" || label === "現在の目標"? "text-adminGray-900 font-bold" : "text-adminGray-400"}
        pt-4 text-left font-hiragino text-14 leading-none overflow-ellipsis overflow-hidden align-baseline
        pb-8 ${label === "法人名"? style.contentCorporate : style.contentText}`}
      >{content}</p>
    </div>
  );
};

export default Info;
