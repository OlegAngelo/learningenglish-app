import React, { useState } from 'react';

import BoardComponent from '../BoardComponent';
import Button from '../../../../../../../shared/Button';
import AddBoxIcon from '../../../../../../../shared/icons/AddBoxIcon';

import style from './UploadSection.module.css';

const UploadSection = ({setShowUploadModal}) => {
  const [summary, setSummary] = useState(`東京の森喜朗社長
  オリンピック組織委員会は、女性が話しすぎると言った後、国際人権擁護団体から性差別の「金メダル」を与えられました。
  ヒューマン・ライツ・ウォッチは、2月4日のニュースリリースでこの賞を発表しました。日本オリンピック委員会と森喜朗委員長が議長を務める組織委員会は、「男女共同参画とアスリートの虐待を阻止する上で重要な役割を果たす」が、「日本の女性はスポーツ連盟のリーダーシップにおいて著しく過小評価されている」と発表した。読んだ。
  2月3日のオンラインJOCミーティング中、森、
  83は、委員会が理事会でジェンダーの多様性を推進していることについて不満を述べ、女性は「強い競争意識」を持っており、ある女性メンバーが手を挙げて話すと、「誰もが何かを言うことになります」と述べました。失言しがちな元首相は、批判の高まりに直面し、2月4日、「不適切な」コメントを謝罪し、撤回したが、辞任しないと述べた。
  「#MeTooの虐待に関する世界的な評価により、体操、水泳、レスリングを含む日本の女性アスリートは、嫌がらせや虐待を非難しました」と、ニューヨークを拠点とする権利グループは、性的暴力に対する世界的な運動に言及しました。`);
  const [url, setUrl] = useState(
    'https://us04web.zoom.us/j/77910938474?pwd=ZTY1VFZLUVdZdmZSZzdPeWtzRVlGUT09'
  );

  const onClickUploadImage = (e) => {
    e.preventDefault();
    setShowUploadModal('image');
  };

  return (
    <BoardComponent>
      {/* # Tags */}
      <div className="mb-px-40">
        <p className="text-base-dark text-18 font-bold mb-px-16">タグ</p>
        <div className="flex">
          <AddBoxIcon color="#0D89EE" height="15" width="15" className="cursor-pointer"/>
          <span className="text-12 font-bold text-adminPrimary-400 ml-px-7 cursor-pointer">
            タグを追加
          </span>
        </div>
      </div>

      {/* # Thumbnail */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-16">サムネイル画像 <span className="text-adminRed-400">*</span></p>
        <p className="text-basic-100 text-12 mb-px-14">なし</p>

        <Button
          innerClass="cursor-pointer"
          type="blue-square"
          icon={<AddBoxIcon width="16" height="16" />}
          onClick={(e) => onClickUploadImage(e)}
        >
          画像をアップロード
        </Button>
      </div>

      {/* # Summary */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-6">概要テキスト</p>

        <textarea
          className={`m-w-full text-14 leading-px-24 font-normal text-basic-100 bg-adminGray-50 p-px-12 whitespace-pre-wrap focus:outline-none ${style.textArea}`}
          cols="80"
          name="content"
          id="content"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
      </div>

      {/* # URL */}
      <div className="mb-px-40">
        <p className="text-adminGray-400 text-12 font-bold mb-px-8">
          URL <span className="text-adminRed-400">*</span>
        </p>
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-1 border-adminGray-300 font-px-14 leading-px-14 p-px-11 text-14 ${style.inputText}`}
        />
      </div>

      {/* # Handouts */}
      {/* <div className="mb-px-40">
        <p className="text-base-dark text-18 font-bold mb-px-16">配布物</p>
        <p className="text-adminGray-400 text-12 font-bold mb-px-14">資料</p>

        <Button
          innerClass="cursor-pointer"
          type="blue-square"
          icon={<AddBoxIcon width="16" height="16" />}
          onClick={(e) => e.target.blur()}
        >
          資料をアップロード
        </Button>
      </div> */}

      <div className="mb-px-40">
        <Button 
          innerClass={`cursor-pointer ${style.button}`} 
          type="blue-square"
          onClick={(e) => e.target.blur()}
        >
          登録
        </Button>
      </div>
    </BoardComponent>
  );
};

export default UploadSection;
