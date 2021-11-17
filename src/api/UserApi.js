import API from './adminBase';

const UserApi = {
  getStudentList: ( {recordsPerPage, ...params} ) => {
    const options = {
      method: 'GET',
      url: `/admin/students`,
      params: {
        recordsPerPage,
        ...params
      },
    };

    return API.request(options);
  },
};

export default UserApi;
