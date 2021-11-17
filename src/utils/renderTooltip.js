import React, { useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import ReactTooltip from 'react-tooltip';

/**
 * @param {string} e.g. "The <w25>brown</25> fox"
 * @returns {string} e.g. "The brown fox"
 */
export const removeWTag = (content) => {
  content = content.replace(/(<w>|<\/w>)/g, ''); // remove tags <w></w>
  return content.replace(/(<w\d+>|<\/w\d+>)/g, ''); // remove tags <w1></w1>
};

/**
 * Remove extra whitespaces in a string (e.g. \n, \t, <space>)
 * @param {string} e.g. "My holiday\nwas great!" or "   My holiday    was great!"
 * @returns {string} e.g. "My holiday was great!"
 */
export const removeWhitespace = (content) => {
  let finalContent = content.replace(/\n/g, '<br />');
  return finalContent.replaceAll(/\s+/g, ' ').trim();
};

/**
 * Get all the indices that has newline.
 * @param {string} e.g. Hey jude, \nDon't make it bad.\n
 * @return {array} [7, 28]
 */
export const getIndicesThatHasNewLine = (content) => {
  var regex = /\s/gi, result, indices = [];
  while ((result = regex.exec(content))) {
    indices.push(result.index);
  }
  return indices;
};

/**
 * Replace special unicode characters in a string (e.g. Smart Quotes(’))
 * @param {string} e.g. "I’m very excited."
 * @returns {string} e.g. "I'm very excited "
 */
 export const replaceUnicode = (content) => {
  content = content.replace(/[\u2018\u2019]/g, "'"); // replace single smart quotes to straight qoutes
  content = content.replace(/[\u201C\u201D]/g, '"'); // replace double smart quotes to straight qoutes
  return content;
};

/**
 * @param {string} e.g. "The <w25>brown</25> fox"
 * @returns {string} e.g. "The w25brown fox"
 */
 export const identifierTag = (content) => {
  return content.replace(/<\/w\d+>|<(?=w\d+>)/g, '');
};

export const renderAlign = (content) => {
  content = content.replace(/<c>/g, "<center>").replace(/<\/c>/g,"</center>");  // replace tags <c></c>
  content = content.replace(/<l>/g, "<div style='text-align: left;'>").replace(/<\/l>/g,"</div>");  // replace tags <l></l>
  content = content.replace(/<r>/g, "<div style='text-align: right;'>").replace(/<\/r>/g,"</div>");  // replace tags <r></r>
  return content;
};

/**
 * Find string index | return false if not found.
 * @param {string} haystack
 * @param {string} needle 
 * @param {string} offset 
 * @returns {integer|boolean}
 */
 export const strpos = (haystack, needle, offset) => {
  var i = (haystack + '').indexOf(needle, offset || 0);
  return i === -1 ? false : i;
};

/**
 * Get all words that are wrap within by specified delimiter
 * @param {string} e.g. "The brown <w1>fox</w1> jumps <w2>over</w2> the lazy fox." 
 * @param {string} e.g. '<w'
 * @param {string} e.g. '</w'
 * @returns {array} [0] 1>fox [2] 2>over 
 */
export const strings_in_between = (str, startDelimiter, endDelimiter) => {
  var contents = [];
  var startDelimiterLength = startDelimiter.length;
  var endDelimiterLength = endDelimiter.length;
  var startFrom = 0;
  var contentStart = 0;
  var contentEnd = 0;

  while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
    contentStart += startDelimiterLength;
    contentEnd = strpos(str, endDelimiter, contentStart);
    if (false === contentEnd) {
      break;
    }
    contents.push(str.substr(contentStart, contentEnd - contentStart));
    startFrom = contentEnd + endDelimiterLength;
  }

  return contents;
};

/**
 * Get the indexes and word of each important words (from. strings_in_between())
 * @param {array} ['1>fox', '2>over']
 * @return {array} [{ index: 1, word: 'fox' }, { index: 2, word: 'over' }]
 */
 export const indexes_and_words = (arr) => {
  let indexes_and_words = [];
  arr.map((data) => {
    indexes_and_words = [
      ...indexes_and_words,
      {
        index: parseInt(data.match(/\d+/)[0]),
        word: data.match(/(\d+>)(.*)$$/)[2],
      },
    ];
  });

  return indexes_and_words;
};

/**
 * Remove special characters, and return word.
 * @param {string} e.g. not ~ yet 
 * @returns {string} e.g. not yet
 */
export const word = (str) => {
  let finalStr = str.replace(/(.*) ～/, '$1');
  return finalStr.replace(/[{()}]/g, '').trim();
};

/**
 * Copy tags from sentence and transfer it in each chunks
 * @param {string} sentence e.g. Since <w21>they<w/21> are still <w22>preserved</w22> in the rocks for us to see
 * @param {array} parts e.g. ["Since they are still", "preserved in the rocks for us to see"]
 * @returns {array} e.g. ["Since <w21>they<w/21> are still", "<w22>preserved</w22> in the rocks for us to see"]
 */
export const addTagsInChunks = (sentence, parts) => {
  let regex = /<w\d+>(.*?)<\/w\d+>/g;
  let matches = [],
    tags = [];
  var match = regex.exec(sentence);
  while (match != null) {
    tags.push(match[0]);
    matches.push(match[1]);
    match = regex.exec(sentence);
  }

  let lastSeen = 0;
  for (let i = 0; i < parts.length; i++) {
    for (let j = lastSeen; j < matches.length; j++) {
      const regex = new RegExp(`\\b${matches[j]}\\b`);
      if (parts[i].match(regex)) {
        lastSeen++;
        parts[i] = parts[i].replaceAll(matches[j], tags[j]);
      } else if (j > lastSeen) {
        break;
      }
    }
  }
  return parts;
};

/**
 * Generate escape sequences for regex
 * @param {string} e.g. How are you? 
 * @returns {string} e.g. How are you\?
 */
export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Return content with tooltip tags
 * @param {array} list of important words from DB
 * @param {content} content sentence
 * @return {markup} content with tooltip tags
 */
 export const renderTooltip = (wordsData, content, designatedPage = 'exercise') => {
  let importantWords = [];

  const tag_strings = strings_in_between(content, '<w', '</w');
  const important_words = indexes_and_words(tag_strings);

  const important_words_definitions =
    wordsData ?? JSON.parse(localStorage.getItem('reading_important_words_definitions'));

  localStorage.setItem('reading_important_words', JSON.stringify(important_words));
  localStorage.setItem('reading_important_words_definitions', JSON.stringify(important_words_definitions));

  let contentWithoutTags = identifierTag(content);

  important_words.forEach((item, index) => {
    const db_important_word = important_words_definitions.find(
      (word) => word.number === item.index
    );
    const ifJapaneseEmpty = important_words_definitions.find(word => word.number === item.index + 1);
    let englishWord = item.word;
    const tooltipWord = db_important_word?.word ?? item.word;
    const japaneseWord = db_important_word?.word_jp ?? ifJapaneseEmpty?.word_jp;

    /**
     * Regex definitions:
     * \\bw${item.index}>${escapeRegExp(englishWord)}> - word that starts with "w25>Bridge"
     * (?!\\s+<|<|#) - should not corresponds with space-arrow, and hash " <", "#"
     */
    var regex = {
      'preview' : new RegExp(`w${item.index}>${escapeRegExp(englishWord)}`, 'i'),
      'exercise' : new RegExp(`\\bw${item.index}>${escapeRegExp(englishWord)}\?(?!\\s+<|<|#)`, 'i'),
      'chunks': new RegExp(`\\bw${item.index}>${escapeRegExp(englishWord)}\?(?!\\s+#)`, 'i'),
      'others' : new RegExp(`\\b${escapeRegExp(englishWord)}\\b(?!\\s+<|<|#)`, 'i')
    };

    importantWords.push(tooltipWord);
    contentWithoutTags = contentWithoutTags.replace(
      regex[designatedPage],
      `<span
        id="${tooltipWord}#${japaneseWord}#${englishWord.trim()}#${index}"
      >${englishWord.trim()}</span>`
    );
  });

  return HTMLReactParser(contentWithoutTags, {
    replace: domNode => {
      let shouldHightlight = false;
      let wordContent;
      let importantWord;
      let importantWordTrans;

      if (domNode.attribs?.id) {
        let importantWordDataContent;
        [ importantWord, importantWordTrans, importantWordDataContent ] = domNode.attribs.id.split('#');

        if (importantWords.includes(importantWord)) {
          wordContent = importantWordDataContent || importantWord;
          shouldHightlight = true;
        }
      }
      
      if (shouldHightlight) {
        return (
          <span
            data-for="toolTip"
            className="font-bold border-b-px-1 text-secondary-40 border-secondary-40 tooltip"
            data-tip={`<b>${importantWord}</b> <br/> ${importantWordTrans}`}
          >{wordContent}</span>
        );
      }
    }
  });
}

const CustomToolTip = () => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <ReactTooltip
      id="toolTip"
      place="top"
      effect="solid"
      html={true}
      backgroundColor="#C9EBE8"
      textColor="black"
      className="custom-tooltip"
      arrowColor="transparent"
      offset={{ top: -10, left: 5 }}
      clickable={true}
    />
  );
};

export default CustomToolTip;
