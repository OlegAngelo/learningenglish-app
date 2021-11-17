import React, { Fragment } from 'react';

import NextIcon from '../../../../../../../../../../shared/icons/NextIcon';
import SkipIcon from '../../../../../../../../../../shared/icons/SkipIcon';
import KeyboardHideIcon from '../../../../../../../../../../shared/icons/KeyboardIcon';
import KeyboardIcon from '../../../../../../../../../../shared/icons/KeyboardHideIcon';

import style from '../../ContentSection.module.css';

const ProceedFooter = ({ 
  isSkippable, 
  hide, 
  hideIcon, 
  onClickHandler,
  withKeyboardIcon = false,
  showKeyboard = false,
  showKeyboardFunc = () => {},
}) => {

  const ProceedIcon = ({ ...props }) => {
    return isSkippable ? <SkipIcon {...props} /> : <NextIcon {...props} />;
  };

  const ShowKeyBoardIcon = () => {
    return showKeyboard ? <KeyboardIcon /> : <KeyboardHideIcon />;
  };

  if (hide) return null;

  return (
    <footer className={`bg-white fixed bottom-0 w-full flex justify-between ${style.footer}`}>
      <div className="flex-1" />
      <div className="flex-1 flex flex-col justify-center items-center" >
        {withKeyboardIcon && (
          <div onClick={showKeyboardFunc} className="text-center">
            <div><ShowKeyBoardIcon /></div>
            <div className="font-bold text-8 text-primary-400 pt-px-4">キーボード</div>
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center pb-px-10" >
        {!hideIcon && (
          <Fragment>
            <button className={style.footerBtn} onClick={onClickHandler}>
              <ProceedIcon
                className={`text-center mx-auto mt-px-5 ${style.footerIcon}`}
              />
              <div
                className={`text-8 text-center font-bold mx-auto mt-px-4 text-primary-400`}
              >
                {isSkippable ? 'スキップ' : 'NEXT'}
              </div>
            </button>
          </Fragment>
        )}
      </div>
    </footer>
  );
};

export default ProceedFooter;
