import API from './base';

const UnitApi = {
  getUnitList: () => {
    return API.get(`/training/course-list`);
  },
  getSelectedUnit: (id) => {
    return API.get(`/training/muscle-courses/${id}`);
  },
};

export default UnitApi;
