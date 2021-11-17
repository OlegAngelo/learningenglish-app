/**
 * 
 * @param {Word} item 
 * @returns string
 * 
 * If there are more than one punctuation period in a word return the whole word including
 * the two period, else, remove the punctuation and return the word without it.
 */
export const word = (item) => {
  return item.replace(/[^.]/g, "").length > 1 ? item : item.replace(/[.,:!?]/g, "");
};

/**
 * 
 * @param {Word} item 
 * @returns string
 * 
 * If there are more than one punctuation period in a word, return an empty string,
 * else, return the punctuation mark.
 */
export const punctuationMark = (item) => {
  return item.replace(/[^.]/g, "").length > 1 ? "" : item.match(/[.,:!?]/g);
};
