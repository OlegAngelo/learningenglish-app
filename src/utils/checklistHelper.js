import proficiencyApi from '../api/ProficiencyApi';

export const localStorageKey = 'updated_checklist';

export const pushToUpdatedChecklist = (userProficiencyVocabulary) => {
  let updatedChecklist = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];

  updatedChecklist = [
    ...updatedChecklist.filter(item => {
      return item.userProficiencyVocabularyId !== userProficiencyVocabulary.id;
    }),
    {
      userProficiencyVocabularyId: userProficiencyVocabulary.id,
      isChecked: !userProficiencyVocabulary.is_checked,
    },
  ];

  localStorage.setItem(localStorageKey, JSON.stringify(updatedChecklist));
};

export const updateChecklist = (updatedChecklist, removeLocalStorage = false) => {
  proficiencyApi.updateVocabularyChecklist(updatedChecklist)
    .then(() => {
      if (removeLocalStorage) {
        localStorage.removeItem(localStorageKey);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const saveUpdatedChecklist = () => {
  const updatedChecklist = JSON.parse(localStorage.getItem(localStorageKey));

  if (updatedChecklist) {
    updateChecklist(updatedChecklist, true);
  }
};
