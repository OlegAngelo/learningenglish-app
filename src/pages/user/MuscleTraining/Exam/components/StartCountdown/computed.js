export const displayCountdownMessage = (questionType, learningType) => {
  if (questionType == 'checklist') {
    if (learningType == 'word') {
      return 'リストの単語を復習スタート';
    }
    if (learningType == 'phrase') {
      return 'リストのフレーズを復習スタート';
    }
  } else if (['lecture-training', 'lecture-training-preview'].includes(questionType)) {
    return '確認問題スタート！';
  } else {
    return 'クイックスタート！';
  }
};
