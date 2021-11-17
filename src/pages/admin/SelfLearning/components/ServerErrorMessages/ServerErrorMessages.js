import React, { useState } from 'react';
import _ from 'lodash';

import ExpandLessIcon from '../../../../../shared/icons/ExpandLessIcon';
import ExpandMoreIcon from '../../../../../shared/icons/ExpandMoreIcon';

import style from './ServerErrorMessages.module.css';

const ServerErrorMessages = ({ errors, autoCollapse = false }) => {
  const [showMessages, setShowMessages] = useState(autoCollapse);

  if (_.isEmpty(errors)) return null;

  if (typeof errors === 'string') {
    return (
      <div className={`w-full rounded mb-px-15 ${style.error}`}>
        <div
          className={`py-px-5 px-px-10 text-12 flex justify-between items-center ${style.errorHeader}`}
        >
          <p className="text-12">{errors}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full rounded mb-px-15 ${style.error}`}>
      <div
        className={`py-px-5 px-px-10 text-12 flex justify-between items-center cursor-pointer ${style.errorHeader}`}
        onClick={() => setShowMessages(!showMessages)}
      >
        <p className="text-12">
          エクセルファイルの中に入力された無効なデータがあります。詳細はこちらをクリックしてください。
        </p>
        {showMessages ? (
          <ExpandLessIcon height="9" width="9" />
        ) : (
          <ExpandMoreIcon height="9" width="9" />
        )}
      </div>
      <div>
        {showMessages &&
          errors.map((data) => (
            <div className="text-12 py-px-2 px-px-10 border-t">{data}</div>
          ))}
      </div>
    </div>
  );
};

export default ServerErrorMessages;
