import HTMLReactParser from 'html-react-parser';

import { removeHTMLTags, trimTags } from '../../../../../../../utils/readingUtil';
import {
  removeWTag,
  renderAlign,
  removeWhitespace,
  strings_in_between,
  indexes_and_words,
} from '../../../../../../../utils/renderTooltip';

/**
 * Get the unique chunks by name and count duplicates
 * @param {array} chunks e.g. [{chunk:'name-1'},{chunk:'name-2'},{chunk:'name-1'},]
 * @returns {array} e.g. [{chunk:'name-1', total:2},{chunk:'name-2', total:1}]
 */
export const filterDuplicateChunks = (chunks) => {
  return Array.from(
    chunks
      .reduce((arr, data) => {
        const { chunk, count = 0, total = 0 } = arr.get(data.chunk) || data;
        return arr.set(data.chunk, { chunk, count, total: total + 1 });
      }, new Map())
      .values()
  );
};

/**
 * Replace smart quotes with double quotes
 * @param {string} text e.g "I’m very excited."
 * @returns {string} e.g 'I"m very excited.'
 */
export const formatQuotes = (text) => {
  return text.replace(/[\u201C\u201D]/g, '"');
};

/**
 * Render html content from script
 * @param {string} script
 * @returns {string}
 */
export const jpContent = (script, chunksResult) => {
  let distinctChunks = filterDuplicateChunks(chunksResult);
  let tempScript = script;

  tempScript = removeWTag(tempScript);
  tempScript = renderAlign(tempScript);
  tempScript = removeWhitespace(tempScript);
  tempScript = formatQuotes(tempScript);

  chunksResult.map((line, index) => {
    let line_chunk = line.chunk.chunk.replace(/\n/g, ' ');
    line_chunk = formatQuotes(removeWhitespace(line_chunk));

    const chunk = distinctChunks.filter((data) => data.chunk === line.chunk)[0];
    const replaceWith = `<span class="text-14 ${
      line.is_understood ? 'font-normal text-basic-100' : 'font-bold text-exam-error'
    }">${line.chunk.chunk_jp}</span>`;
    let occurence = 0;
    tempScript = tempScript.replaceAll(line_chunk, (match) =>
      occurence++ === chunk?.count ? replaceWith : match
    );

    distinctChunks = distinctChunks.map((data) => {
      if (data.chunk === line.chunk.chunk) {
        data.count = data.count + 1;
      }
      return data;
    });
  });

  return HTMLReactParser(tempScript);
};

export const englishContent = (script, chunks, importantWordsFromDB) => {
  let scriptArr = prepareScriptData(script);
  let chunksArr = prepareChunksData(chunks);
  let importantWordsArr = prepareImportantWordsData(script, importantWordsFromDB);

  let output = '';
  let chunkIndex = 0;
  let chunkSubIndex = 0;
  let wordIndex = 0;
  let wordSubIndex = 0;
  let tooltipHasStarted = false;

  for (let i = 0; i < scriptArr.length; i++) {
    if (chunkIndex > chunksArr.length) continue;
    while (true) {
      if (chunkIndex >= chunksArr.length) break;

      const wordScript = scriptArr[i].replace(/\n/g, '');
      const wordChunk = chunksArr[chunkIndex].wordsArr[chunkSubIndex].trim();
      const wordChunkWithoutTags = removeHTMLTags(wordChunk);

      // detect header line
      if (!!wordScript.match(/(-)\1+/g)) {
        i++;
        output += wordScript;
        continue;
      }

      const wordScriptProps = wordScriptComputed(removeHTMLTags(wordScript));
      const { wordScriptWithoutTags, wordScriptWithoutPunctuation } = wordScriptProps;

      let props = {
        wordChunk,
        wordScriptWithoutPunctuation,
        importantWordsArr,
        wordIndex,
        wordSubIndex,
        chunkIndex,
        chunkSubIndex,
        chunksArr,
        doesHaveWTag: doesHaveWTag(wordScript),
        scriptCounter: i,
        scriptArr,
      };

      let importantWordProps = importantWordComputed(props);
      let { isImportantWord, isLastImportantWord } = importantWordProps;

      const chunkWordProps = chunkWordComputed({
        ...importantWordProps,
        ...props,
        chunksArr,
        chunkIndex,
        chunkSubIndex,
      });
      const { isFirstChunkWord, isLastChunkWord, isBetweenChunkFirst } = chunkWordProps;
      const { startImportant, endImportant } = tagRange(wordScript);

      if (startImportant) tooltipHasStarted = true;

      output += renderStyles({
        ...props,
        ...wordScriptProps,
        ...chunkWordProps,
        ...importantWordProps,
        wordScript,
        tooltipHasStarted,
      });

      if (endImportant) tooltipHasStarted = false;

      ++chunkSubIndex;

      // when other important word is in other chunk
      if (isBetweenChunkFirst) {
        ++i;
        ++wordIndex;
        wordSubIndex = 0;
        if (!isLastChunkWord) continue;
      }
      if (isLastImportantWord && isFirstChunkWord) {
        ++chunkIndex;
        chunkSubIndex = 0;
        continue;
      }

      // update variables
      if (isImportantWord) ++wordSubIndex;
      if (isLastImportantWord) {
        wordSubIndex = 0;
        ++wordIndex;
      }
      if (wordChunkWithoutTags === wordScriptWithoutTags && !isLastChunkWord) ++i;
      if (chunkSubIndex >= chunksArr[chunkIndex].wordsArr.length) {
        chunkSubIndex = 0;

        if (chunkIndex + 1 >= chunksArr.length) {
          ++chunkIndex;
          continue;
        }

        break;
      }
    }

    ++chunkIndex;
    if (i >= scriptArr.length) break;
  }

  return HTMLReactParser(output);
};

const prepareScriptData = (content) => {
  let scriptNoTags = trimTags(content);
  let scriptArr = scriptNoTags.replace(/\n/g, '<br/> ');
  scriptArr = scriptArr.replace(/\s<br/g, '<br');
  scriptArr = scriptArr.replace(/\s+/g, ' ');
  return scriptArr.split(' ');
};

const prepareChunksData = (chunks) => {
  return chunks.map((data) => {
    return {
      ...data,
      wordsArr: data.chunk.chunk.trim().split(' '),
    };
  });
};

const prepareImportantWordsData = (script, importantWordsFromDB) => {
  let importantWordsArr = strings_in_between(script, '<w', '</w');
  importantWordsArr = indexes_and_words(importantWordsArr);
  return importantWordsArr.map((data) => {
    const trimmedData = data.word.trim();
    return {
      ...data,
      arr: trimmedData.split(' '),
      definition: importantWordsFromDB.filter((word) => word.number === data.index)[0],
    };
  });
};

const importantWordComputed = (props) => {
  const {
    wordChunk,
    wordScriptWithoutPunctuation,
    importantWordsArr,
    wordIndex,
    wordSubIndex,
    doesHaveWTag,
  } = props;
  const importantWordArrHasExceeded = wordIndex >= importantWordsArr.length;
  const importantWord = importantWordArrHasExceeded || importantWordsArr[wordIndex].arr[wordSubIndex];
  const onlyOneImportantWord = importantWordArrHasExceeded || importantWordsArr[wordIndex].arr.length === 1;
  let isImportantWord = importantWord === wordChunk || wordScriptWithoutPunctuation.includes(importantWord);

  if (onlyOneImportantWord) isImportantWord = doesHaveWTag;

  const isFirstImportantWord = isImportantWord && wordSubIndex === 0;
  const isLastImportantWord =
    isImportantWord && !importantWordArrHasExceeded
      ? wordSubIndex === importantWordsArr[wordIndex].arr.length - 1
      : false;

  return {
    importantWordArrHasExceeded,
    importantWord,
    isImportantWord,
    isFirstImportantWord,
    isLastImportantWord,
    onlyOneImportantWord,
    wordDefinition:
      importantWordArrHasExceeded || importantWordsArr[wordIndex].definition,
    importantWordHasPunctuation: !!String(importantWord).match(/[.?!,;]/g),
  };
};

const chunkWordComputed = (props) => {
  const {
    wordChunk,
    chunksArr,
    chunkIndex,
    chunkSubIndex,
    isImportantWord,
    isLastImportantWord,
  } = props;

  const isFirstChunkWord = chunkSubIndex === 0;
  const isLastChunkWord = chunkSubIndex === chunksArr[chunkIndex].wordsArr.length - 1;

  return {
    isFirstChunkWord,
    isLastChunkWord,
    isBetweenChunkFirst: isImportantWord && isLastImportantWord && isFirstChunkWord,
    isBetweenChunkLast: isImportantWord && !isLastImportantWord && isLastChunkWord,
    isChunkIncorrect: !chunksArr[chunkIndex].is_understood,
    chunkWordHasPunctuation: !!wordChunk.match(/[.?!,]$/g),
  };
};

const tagRange = (text) => {
  const startItalic = !!text.match(/<I>/g);
  const endItalic = !!text.match(/<\/I>/g);
  const startBold = !!text.match(/<b>/g);
  const endBold = !!text.match(/<\/b>/g);
  const startImportant = !!text.match(/<w\d+>/g);
  const endImportant = !!text.match(/<\/w\d+>/g);
  const startRight = !!text.match(/<r>/g);
  const endRight = !!text.match(/<\/r>/g);
  const startCenter = !!text.match(/<c>/g);
  const endCenter = !!text.match(/<\/c>/g);

  return {
    startItalic,
    endItalic,
    startBold,
    endBold,
    startImportant,
    endImportant,
    startRight,
    endRight,
    startCenter,
    endCenter
  };
};

const wordScriptComputed = (text) => {
  const punctuationMark = text.match(/[.?!,;]/g);

  return {
    wordScriptWithoutTags: text.trim(),
    wordScriptWithoutPunctuation: text.replace(/[.?!,;]/g, '').trim(),
    wordScriptPunctuation: !!punctuationMark ? punctuationMark[0] : null,
    wordScriptHasPunctuation: !!punctuationMark,
    wordScriptHasHyphen: !!text.match(/[-]/g),
    hasWTag: text.match(/(<w\d+>|<\/w\d+>)/g),
  };
};

const renderStyles = (props) => {
  const {
    wordScriptWithoutPunctuation,
    wordScriptPunctuation,
    wordScriptHasHyphen,
    wordScript,
    isFirstChunkWord,
    isChunkIncorrect,
    isLastImportantWord,
    isLastChunkWord,
    onlyOneImportantWord,
    wordDefinition,
    tooltipHasStarted,
    scriptCounter,
    scriptArr,
    importantWordHasPunctuation,
  } = props;

  let append = '';
  const {
    startItalic,
    endItalic,
    startBold,
    endBold,
    startImportant,
    endImportant,
    startRight,
    endRight,
    startCenter,
    endCenter,
  } = tagRange(wordScript);
  const { word, word_jp } = wordDefinition || {};
  const forceStartImportant = tooltipHasStarted && isFirstChunkWord;

  if (startRight) append += `<div class="text-right">`;
  else if (startCenter) append += `<div class="text-center">`;

  if (isFirstChunkWord)
    append += `<label class="${isChunkIncorrect ? 'incorrect font-bold text-exam-error' : ''}">`;

  const importantWordHtmlToReplace = `<span data-for="${word ? 'toolTip' : ''}" class="font-bold border-b-px-1 text-secondary-40 border-secondary-40 tooltip" data-tip="<b>${word}</b> <br/> ${word_jp}">`;
  if (!wordScriptHasHyphen && (startImportant || forceStartImportant))
    append += importantWordHtmlToReplace;
  if (wordScriptHasHyphen)
    append += wordScript.replace(/<w\d+>/g, importantWordHtmlToReplace);

  if (startBold) append += '<b>';
  if (startItalic) append += '<i>';

  const punctuationMark =
    wordScriptPunctuation && !wordScriptHasHyphen ? wordScriptPunctuation.trim() : '';
  if (!wordScriptHasHyphen) append += wordScriptWithoutPunctuation;

  append += `${!isLastChunkWord && !isLastImportantWord ? ' ' : ''}`;

  if (endItalic) append += '</i>';
  if (endBold) append += '</b>';

  if (endImportant) {
    append = onlyOneImportantWord ? append.trim() : append;
    append += punctuationMark ? `</span>` : `</span> `;
  }

  if (isLastChunkWord) {
    const isLastWord = scriptCounter === scriptArr.length - 1;
    const match = wordScriptWithoutPunctuation.match(/<br\/>/g);
    const slash = ` <span class="text-14 font-normal text-basic-300 slash">/</span> `;

    if (isLastWord)
      append += `${punctuationMark}</label>`;
    else if (match && !importantWordHasPunctuation)
      append = append.replace(/(<br\/>)(?!.*\1)/g, `</span>${punctuationMark}</label>${slash}<br>`);
    else if (match)
      append = append.replace(/(<br\/>)(?!.*\1)/g, `${punctuationMark}</span></label>${slash}<br>`);
    else if (isLastImportantWord && isLastChunkWord)
      append += `${punctuationMark}</label>${slash}`;
    else
      append += `${punctuationMark}</label>${slash}`;
  } else if (punctuationMark) append = append.trim() + punctuationMark + ' ';

  if (endRight || endCenter) append += `</div>`;

  return append;
};

const doesHaveWTag = (text) => !!text.match(/(<w\d+>|<\/w\d+>)/g);
