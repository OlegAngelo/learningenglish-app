import API from './base';

const ProficiencyApi = {
  getOverallProficiency: () => {
    return API.get(`/training/proficiency/overall`);
  },
  getOverallProficiencyByUnit: (unitId) => {
    return API.get(`/training/proficiency/overall/${unitId}`);
  },
  getProficiencyForAllUnits: () => {
    return API.get(`/training/proficiency`);
  },
  updateVocabularyChecklist: (updatedChecklist) => {
    const options = {
      method: 'POST',
      url: '/training/update-checklist',
      data: {
        list: updatedChecklist,
      },
    };

    return API.request(options);
  },
  getChecklist: ({ learningType, ...params }) => {
    return API.get('/training/proficiency/checklist', {
      params: {
        learningType,
        ...params,
      },
    });
  },
};

export default ProficiencyApi;
