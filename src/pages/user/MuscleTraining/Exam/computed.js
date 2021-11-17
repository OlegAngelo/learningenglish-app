import questionHelper from '../../../../utils/questionHelper';

export const displayResultMessage = ({
  isFromAdmin,
  timerSeconds,
  hasTimeLimit,
  isShowCommentary,
  timerMaxSeconds
}) => {
  if (isFromAdmin) {
    const percentage = 100;      
    return questionHelper.getResponseText(percentage, timerSeconds);
  }
    
  return questionHelper.getResponseText(
    questionHelper.calculateTimerPercentage(!hasTimeLimit || isShowCommentary, timerSeconds, timerMaxSeconds),
    timerSeconds,
  );
};
