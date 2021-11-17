import HTMLReactParser from 'html-react-parser';

import { removeHTMLTags, trimTags } from '../../../../../../../../utils/readingUtil';
import {
  strings_in_between,
  indexes_and_words,
} from '../../../../../../../../utils/renderTooltip';

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
      const wordChunk = chunksArr[chunkIndex].wordsArr[chunkSubIndex];
      const wordChunkWithoutTags = removeHTMLTags(wordChunk);

      // detect header line
      if (!!wordScript.match(/(-)\1+/g)) {
        i++;
        output += wordScript;
        continue;
      }

      const wordScriptProps = wordScriptComputed(removeHTMLTags(wordScript));
      const {
        textWithPunctuation: wordScriptWithoutTags,
        textWithoutPunctuationMark: wordScriptWithoutPunctuation,
      } = wordScriptProps;

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
      let { isImportantWord, isLastImportantWord, isFirstImportantWord, importantWord } =
        importantWordProps;

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
      wordsArr: data.chunk.trim().split(' '),
    };
  });
};

const prepareImportantWordsData = (script, importantWordsFromDB) => {
  let importantWordsArr = strings_in_between(script, '<w', '</w');
  importantWordsArr = indexes_and_words(importantWordsArr);
  return importantWordsArr.map((data) => {
    return {
      ...data,
      arr: data.word.split(' '),
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
  const importantWord =
    importantWordArrHasExceeded || importantWordsArr[wordIndex].arr[wordSubIndex];
  const onlyOneImportantWord =
    importantWordArrHasExceeded || importantWordsArr[wordIndex].arr.length === 1;
  let isImportantWord =
    importantWord === wordChunk || wordScriptWithoutPunctuation.includes(importantWord);
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
    isChunkIncorrect: !chunksArr[chunkIndex].isCorrect,
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
  const punctuationMark = text.match(/([.?!,])$/g);
  const textWithoutPunctuationMark = text.replace(/[.?!,]$/g, '');

  return {
    textWithPunctuation: text,
    textWithoutPunctuationMark,
    punctuationMark: !!punctuationMark ? punctuationMark[0] : null,
    hasPunctuationMark: !!punctuationMark,
    hasWTag: text.match(/(<w\d+>|<\/w\d+>)/g),
  };
};

const renderStyles = (props) => {
  const {
    textWithoutPunctuationMark: wordScriptWithoutPunctuation,
    punctuationMark: wordScriptPunctuation,
    wordScript,
    isFirstChunkWord,
    isChunkIncorrect,
    isLastImportantWord,
    isLastChunkWord,
    scriptCounter,
    scriptArr,
  } = props;

  let append = '';
  const {
    startItalic,
    endItalic,
    startBold,
    endBold,
    startRight,
    endRight,
    startCenter,
    endCenter,
  } = tagRange(wordScript);

  if (startRight) append += `<div class="text-right">`;
  else if (startCenter) append += `<div class="text-center">`;

  if (isFirstChunkWord)
    append += `<label class="${
      isChunkIncorrect ? 'incorrect font-bold text-exam-error' : ''
    }">`;

  if (startBold) append += '<b>';
  if (startItalic) append += '<i>';

  const punctuationMark = wordScriptPunctuation ? wordScriptPunctuation.trim() : '';
  append += wordScriptWithoutPunctuation;

  append += `${!isLastChunkWord && !isLastImportantWord ? ' ' : ''}`;

  if (endItalic) append += '</i>';
  if (endBold) append += '</b>';

  append += punctuationMark ? `` : ` `;

  if (isLastChunkWord) {
    const isLastWord = scriptCounter === scriptArr.length - 1;
    const match = wordScriptWithoutPunctuation.match(/<br\/>/g);
    const slash = ` <span class="text-14 font-normal text-basic-300 slash">/</span> `;

    if (isLastWord)
      append += `${punctuationMark}</label>`;
    else if (match && isLastImportantWord)
      append = append.replace(/(<br\/>)(?!.*\1)/g, `${punctuationMark}</label>${slash}<br>`);
    else if (match)
      append = append.replace(/(<br\/>)(?!.*\1)/g, `${punctuationMark}</label>${slash}<br>`);
    else if (isLastImportantWord && isLastChunkWord)
      append += `${punctuationMark}</label>${slash}`;
    else
      append += `${punctuationMark}</label>${slash}`;
  } else if (punctuationMark) append = append.trim() + punctuationMark + ' ';

  if (endRight || endCenter) append += `</div>`;

  return append;
};

const doesHaveWTag = (text) => !!text.match(/(<w\d+>|<\/w\d+>)/g);
