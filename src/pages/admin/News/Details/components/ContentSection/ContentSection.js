import React from 'react';
import { useSelector } from 'react-redux';

import BoardComponent from '../BoardComponent';

import styles from './ContentSection.module.css';

const ContentSection = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const { newsDetails } = useSelector(state => state.news);
  const { content, translation, important_words } = newsDetails || {};

  const displayImportantWords = () => {
    return important_words ? 
      important_words.map( (item, key) => {
        return (
          <tr key={key}>
            <td className="break-all">{item.important_word}</td>
            <td className="pb-px-4">
              <input
                style={{ width: '280px' }}
                type="text"
                name="title"
                id="title"
                className="p-px-11 rounded-px-2 text-gray-900 focus:outline-none"
                defaultValue={item.important_word_translation}
                readOnly
              />
            </td>
          </tr>
        );
      })
    : '-';
  }

  return (
    <BoardComponent>
      <div className="my-px-40">
        <ul className="grid  grid-cols-3 text-center font-bold text-18 list-none">
          <li
            className={openTab == 1 && `${styles.borderBottom}`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            <a href="link1">
              <h3 className="pt-px-21 pb-px-21 py-px-74">記事本文</h3>
            </a>
          </li>
          <li
            className={openTab == 2 ? `${styles.borderBottom}` : ''}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            href="#link2"
            role="tablist"
          >
            <a href="link2">
              <h3 className="pt-px-21 pb-px-21 py-px-74">日本語訳</h3>
            </a>
          </li>
          <li
            className={openTab == 3 ? `${styles.borderBottom}` : ''}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
            data-toggle="tab"
            href="#link3"
            role="tablist"
          >
            <a href="link3">
              <h3 className="pt-px-21 pb-px-21 py-px-74">語注リスト</h3>
            </a>
          </li>
        </ul>
        <div className={`mt-px-40 ${styles.contentWidth}`}>
          <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
            <textarea
              style={{ height: '500px', width: '542px' }}
              className="m-w-full text-14 leading-px-24 font-normal text-basic-100 p-px-12 whitespace-pre-wrap focus:outline-none"
              cols="80"
              name="content"
              id="content"
              defaultValue={content}
              readOnly
            />
          </div>
          <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
            <textarea
              style={{ height: '500px', width: '542px' }}
              className="m-w-full text-14 leading-px-24 font-normal text-basic-100 p-px-12 whitespace-pre-wrap focus:outline-none"
              cols="80"
              name="content"
              id="content"
              defaultValue={translation}
              readOnly
            />
          </div>
          <div
            className={openTab === 3 ? 'block -mt-px-28' : 'hidden'}
            id="link3"
          >
            <table className={styles.tableWords}>
              <tbody>
                { displayImportantWords() }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BoardComponent>
  );
};

export default ContentSection;
