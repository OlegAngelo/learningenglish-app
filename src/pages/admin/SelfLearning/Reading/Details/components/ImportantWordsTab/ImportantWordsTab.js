import { Fragment, useContext } from 'react';
import parse from 'html-react-parser';

import { TabContext } from '../TabContent';
import styles from './ImportantWordsTab.module.css';

const ImportantWordsTab = ({items, name: tabName }) => {
  const {tabPosition} = useContext(TabContext);

  const readingWords = () => {
    return items.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className={styles.word}>{parse(item.word)}</div>
          <div className={`${styles.word} ${styles.translated}`}>{item.word_jp}</div>
        </Fragment>
      )
    });
  }
  
  const notActive = tabPosition !== tabName ? 'hidden' : '';

  return (
    <div className={`block -mt-px-28 ${notActive}`}>
      <div className="grid grid-cols-2 gap-4">
        {readingWords()}
      </div>
    </div>
  )
}

export default ImportantWordsTab
