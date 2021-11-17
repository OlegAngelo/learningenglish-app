import React from 'react';
import { Link } from 'react-router-dom'

import Header from '../../../../../../shared/Header';
import Button from '../../../../../../shared/Button';
import CloseIcon from '../../../../../../shared/icons/CloseIcon';

const Preview = () => {

  //temporary
  const content = `Can you imagine ice that does not melt and is not wet?
  Then you can imagine dry ice. Dry ice is made by freezing a gas called carbon dioxide. 
  Dry ice is quite different from ordinary ice, which is simply frozen water. 
  Dry ice was first manufactured in 1925. It has since fulfilled the strongest hopes of its inventor. It can be used for making artificial fog in the movies (when steam is passed over dry ice, a very dense vapor rises), and for destroying insects in grain supplies.
  `;
  
  return (
    <div className="bg-background-200 pb-px-110 min-h-full">
      <Header title={`Level 1 Reading`} hasBack={false}>
        <Link to="/self-learning">
          <CloseIcon />
        </Link>
      </Header>

      <div className="mx-px-8 mt-px-30 mb-px-40 flex justify-center font-bold text-px-16 text-primary-500">
        学習する英文のプレビュー
      </div>
      <div className="mx-px-10 px-px-16 pt-px-16 pb-px-24 bg-basic-400">
        <div className="text-basic-100 text-18 flex justify-center font-bold pb-px-32">Dry Ice</div>
        <div className="break-words whitespace-pre-line">{content}</div>
      </div>
      <div className="fixed bottom-0 pb-px-50 flex items-center justify-center w-full z-10">
        <Button
          type="darkblue-square"
        >
          学習を始める
        </Button>
      </div>
    </div>
  );
};

export default Preview;
