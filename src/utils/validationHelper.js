import moment from "moment";

export const arrayEqual = (sentence, correctAnswer) => {
  return JSON.stringify(sentence.split(' ')) === JSON.stringify(correctAnswer.split(' '));
};

export const checkAnswer = (is_correct, timerProps) => {
  return is_correct && timerProps.seconds != 0;
};

export const isIncorrectChoice = (choice, selected) => {
  return selected === choice.jp_item && !choice.is_correct;
};

export const isIncorrectEnItemChoice = (choice, selected) => {
  return selected === choice.en_item && !choice.is_correct;
};

// # Date Validations

const formatToDateTime = (date) => moment(date).format('YYYY-MM-DD HH:mm');
const formatToDate = (date) => moment(date).format('YYYY-MM-DD');

export const isDateAfterTo = ({ date1, date2, formatDate = false }) => {
  const date1Formatted = formatDate ? formatToDate(date1.value) : date1.value;
  const date2Formatted = formatDate ? formatToDate(date2.value) : date2.value;

  if (moment(date1Formatted).isAfter(moment(date2Formatted)))
    return `${date2.label}は${date1.label}より後である必要があります。`;

  return true;
};

export const isTimeSameOrAfterTo = ({ date1, date2, formatDate = false }) => {
  const time1Formatted = formatDate ? formatToDateTime(date1.value) : date1.value;
  const time2Formatted = formatDate ? formatToDateTime(date2.value) : date2.value;

  if (moment(time1Formatted).isSameOrAfter(moment(time2Formatted)))
    return `${date2.label}は${date1.label}より後である必要があります。`;

  return true;
};
