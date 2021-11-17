import React, { useState, useEffect, useContext } from 'react';

import styles from './ArticleTab.module.css';
import { FormWrapperContext } from '../FormWrapper/FormWrapper';
import { TabContext } from '../TabContent';

const ArticleTab = ({ item, name: tabName }) => {
  const {tabPosition} = useContext(TabContext);
  const { register, errors, rules } = useContext(FormWrapperContext);
  const [englishScript, setEnglishScript] = useState('');
  const [japaneseScript, setJapaneseScript] = useState('');

  const notActive = tabPosition !== tabName ? 'hidden' : '';

  useEffect(() => {
    if (item) {
      setEnglishScript(item?.script);
      setJapaneseScript(item?.script_jp);
    }
  }, [item]);

  return (
    <div className={notActive}>
      <div className="mb-px-40">
        <div className="mb-2">
          <label htmlFor="en_translation" className={`text-adminGray-400 text-12 font-bold mb-px-8`}>
            英文 <span className="text-adminRed-400">*</span>
          </label>
        </div>

        <textarea
          style={{ height: '560px', width: '100%' }}
          className={`${styles.textArea} m-w-full text-14 leading-px-24 rounded-px-2 font-normal border-px-2 border-adminGray-200 text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none`}
          name="english_script"
          defaultValue={englishScript}
          ref={register(rules.english_script)}
          onChange={(e) => setEnglishScript(e.target.value)}
        />

        {errors?.english_script?.message && (
          <p className="text-red-500 mt-px-2">{errors.english_script.message}</p>
        )}
      </div>
      <div className="mb-px-40">
        <div className="mb-2">
          <label htmlFor="jp_translation" className={`text-adminGray-400 text-12 font-bold mb-px-8`}>
            日本語訳 
        <span className="text-adminRed-400">*</span>
          </label>
        </div>

        <textarea
          style={{ height: '560px', width: '100%' }}
          className={`${styles.textArea} m-w-full text-14 leading-px-24 rounded-px-2 font-normal border-px-2 border-adminGray-200 text-basic-100 bg-gray-50 p-px-12 whitespace-pre-wrap focus:outline-none`}
          name="jp_script"
          defaultValue={japaneseScript}
          ref={register(rules.jp_script)}
          onChange={(e) => setJapaneseScript(e.target.value)}
        />

        {errors?.jp_script?.message && (
          <p className="text-red-500 mt-px-2">{errors.jp_script.message}</p>
        )}
      </div>
    </div>
  )
}

export default ArticleTab
