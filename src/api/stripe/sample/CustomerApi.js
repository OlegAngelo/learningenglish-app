import API from "../../adminBase";

const CustomerApi = {
  getCustomers: (params) => {
    const options = {
      method: "GET",
      url: `/stripe/customers`,
      params: {
        ...params,
      },
    };

    return API.request(options);
  },

  getCustomer: (id) => {
    const options = {
      method: "GET",
      url: `/stripe/customers/${id}`,
    };

    return API.request(options);
  },

  getCustomerCardList: (params) => {
    const options = {
      method: "GET",
      url: `/stripe/customers/sources`,
      params: {
        ...params,
      },
    }
    
    return API.request(options);
  },

  getCustomerCardDetails: (params) => {
    const options = {
      method: "GET",
      url: `/stripe/customers/${params.customerId}/sources/${params.cardId}`,
    }
    
    return API.request(options);
  },

  updateCustomerCardDetails: (params) => {
    const options = {
      method: "POST",
      url: `/stripe/customers/sources/update`,
      params: {
        ...params
      }
    }
    
    return API.request(options);
  }
};

export default CustomerApi;
