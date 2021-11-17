export const checkIfFromLecture = (questionType) => {
  return questionType === 'lecture-training' || questionType === 'lecture-training-preview';
}
