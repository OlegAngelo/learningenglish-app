import HTMLReactParser from 'html-react-parser';

export const strpos = (haystack, needle, offset) => {
  var i = (haystack + '').indexOf(needle, offset || 0);
  return i === -1 ? false : i;
};

export const strings_in_between = (str, startDelimiter, endDelimiter) => {
  var contents = [];
  var startDelimiterLength = startDelimiter.length;
  var endDelimiterLength = endDelimiter.length;
  var startFrom = 0;
  var contentStart = 0;
  var contentEnd = 0;

  while (false !== strpos(str, startDelimiter, startFrom)) {
    contentStart = strpos(str, startDelimiter, startFrom) + startDelimiterLength;
    contentEnd = strpos(str, endDelimiter, contentStart);
    if (false === contentEnd) {
      break;
    }
    contents.push(str.substr(contentStart, contentEnd - contentStart));
    startFrom = contentEnd + endDelimiterLength;
  }

  return contents;
};

export const indexes_and_words = (arr) => {
  let indexes_and_words = [];
  arr.map((data) => {
    indexes_and_words = [
      ...indexes_and_words,
      {
        index: parseInt(data.match(/\d+/)[0], 10),
        word: data.match(/(\d+>)(.*)$$/)[2],
      },
    ];
    return data;
  });

  return indexes_and_words;
};

export const removeWTag = (content) => {
  content = content.replace(/(<w>|<\/w>)/g, '');
  return content.replace(/(<w\d+>|<\/w\d+>)/g, '');
};

export const trimTags = (text) => {
  const regex = /(<[^<>\/]+>)\s+|\s+(<\/[^<>]+>)/g;
  return text.replace(regex, '$1$2');
};

export const removeHTMLTags = (text) => {
  const regex = /(<[^<>\/]+>)|(<\/[^<>]+>)/g;
  let finalText = text.replace(regex, '');
  return removeWTag(finalText);
};

export const renderTooltips = (content) => {
  return HTMLReactParser(content, {
    replace: (domNode) => {
      let displayWord;
      let word;
      let wordTranslation;

      if (domNode.attribs?.id) {
        [word, wordTranslation, displayWord] = domNode.attribs.id.split('#');
      }

      return (
        <span
          data-for="toolTip"
          className="font-bold border-b-px-1 text-secondary-40 border-secondary-40 tooltip"
          data-tip={`<b>${word}</b> <br/> ${wordTranslation}`}
        >
          {displayWord}
        </span>
      );
    },
  });
};
