export const getResultDetail = (resultDetailIndex, results, category) => {
  return resultDetailIndex > -1 ? results[category][resultDetailIndex] : null;
};

export const getSubTitle = (resultDetail) => {
  return resultDetail &&
    `${
       resultDetail.user_proficiency.training_vocabularyable.meaning
       ? resultDetail.user_proficiency.training_vocabularyable.meaning
       : resultDetail.user_proficiency.training_vocabularyable.translation
    }`;
};
