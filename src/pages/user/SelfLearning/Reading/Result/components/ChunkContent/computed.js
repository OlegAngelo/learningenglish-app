import HTMLReactParser from 'html-react-parser';

import {
  strings_in_between,
  indexes_and_words,
  removeHTMLTags,
  trimTags,
} from '../../../../../../../utils/readingUtil';

export const jpContent = (chunks) => {
  let content = '';
  chunks.map((item) => {
    const chunkItem = item.chunk.chunk_jp;
    let phrase;

    if (item.is_understood) phrase = `<div> ${chunkItem} </div>`;
    else phrase = `<div class="incorrect text-exam-error font-bold"> ${chunkItem} </div>`;
    content += phrase;
  });
  return HTMLReactParser(content);
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
        doesHaveWTag: doesHaveWTag(wordScript),
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
  let scriptArr = scriptNoTags.replace(/\n/g, '\n ');
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
  let isImportantWord = importantWord === wordChunk || importantWord === wordScriptWithoutPunctuation;

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
    importantWordHasPunctuation: !!String(importantWord).match(/[.?!,]$/g),
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
  const startImportant = !!text.match(/<w\d+>/g);

  const startBold = !!text.match(/<b>/g);
  const endBold = !!text.match(/<\/b>/g);
  const endImportant = !!text.match(/<\/w\d+>/g);

  return {
    startItalic,
    endItalic,
    startBold,
    endBold,
    startImportant,
    endImportant,
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
    wordScriptHasPunctuation,
    wordScriptHasHyphen,
    importantWordHasPunctuation,
    wordScript,
    isFirstChunkWord,
    isChunkIncorrect,
    isLastImportantWord,
    isLastChunkWord,
    onlyOneImportantWord,
    wordDefinition,
    tooltipHasStarted,
  } = props;

  let append = '';
  const {
    startItalic,
    endItalic,
    startBold,
    endBold,
    startImportant,
    endImportant,
  } = tagRange(wordScript);
  const { word, word_jp } = wordDefinition || {};
  const forceStartImportant = tooltipHasStarted && isFirstChunkWord;

  if (isFirstChunkWord)
    append += `<div class="${isChunkIncorrect ? 'incorrect font-bold text-exam-error' : ''}">`;

  const importantWordHtmlToReplace = `<span data-for="${word ? 'toolTip' : ''}" class="font-bold border-b-px-1 text-secondary-40 border-secondary-40 tooltip" data-tip="<b>${word}</b> <br/> ${word_jp}">`;
  if (!wordScriptHasHyphen && (startImportant || forceStartImportant))
    append += importantWordHtmlToReplace;
  if (wordScriptHasHyphen)
    append += wordScript.replace(/<w\d+>/g, importantWordHtmlToReplace);

  if (startBold) append += '<b>';
  if (startItalic) append += '<i>';

  if (!wordScriptHasHyphen) {
    const punctuationMark = wordScriptPunctuation ?? '';
    append +=
      wordScriptWithoutPunctuation +
      `${(wordScriptHasPunctuation && !isLastImportantWord) || importantWordHasPunctuation ? punctuationMark : ''}`;
  }
  append += `${!isLastChunkWord && !isLastImportantWord ? ' ' : ''}`;

  if (endItalic) append += '</i>';
  if (endBold) append += '</b>';

  if (endImportant) {
    append = onlyOneImportantWord ? append.trim() : append;
    append += `</span>`;
    if (isLastImportantWord)
      append += `${wordScriptHasPunctuation && !importantWordHasPunctuation ? wordScriptPunctuation : ''} `;
  }
  if (isLastChunkWord) append += '</div>';

  return append;
};

const doesHaveWTag = (text) => !!text.match(/(<w\d+>|<\/w\d+>)/g);
