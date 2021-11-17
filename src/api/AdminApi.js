import API from './adminBase';

const AdminApi = {
  getAdminList: (params) => {
    const options = {
      method: 'GET',
      url: `/admins`,
      params: {
        ...params
      },
    };

    return API.request(options);
  },
  getAuthAdmin: () => {
    return API.get(`/admin/profile`);
  },
  deleteAdmin: (adminId) => {
    return API.delete(`/admin/${adminId}`);
  },
  getTeachers: () => {
    return API.get(`/admin/teachers`);
  },
};

export default AdminApi;
