import UserAPI from '../../base';
import API from '../../adminBase';

const Stripe = {
  userProductList: () => {
    const options = {
      method: 'GET',
      url: '/stripe/product-list',
    };

    return UserAPI.request(options);
  },
  //temporary
  registerUser: (payload) => {
    const options = {
      method: 'POST',
      url: '/stripe/register',
      data: {
        ...payload
      }
    };

    return UserAPI.request(options);
  },
  getCustomer: (payload) => {
    const options = {
      method: 'GET',
      url: '/stripe/get-customer',
      params: {
        ...payload
      }
    };

    return UserAPI.request(options);
  },
  createSubscription: (payload) => {
    const options = {
      method: 'POST',
      url: '/stripe/create-subscription',
      params: {
        ...payload
      }
    };

    return UserAPI.request(options);
  },
  userSubscriptions: () => {
    const options = {
      method: 'GET',
      url: '/stripe/subscriptions',
    };

    return UserAPI.request(options);
  },

  // ADMIN /////////////////////////
  subscriptions: () => {
    const options = {
      method: 'GET',
      url: '/admin/stripe/subscriptions',
    };

    return API.request(options);
  },
  createProduct: (payload) => {
    const options = {
      method: 'POST',
      url: '/admin/stripe/create-product',
      params: {
        ...payload
      }
    };

    return API.request(options);
  },
  productList: () => {
    const options = {
      method: 'GET',
      url: '/admin/stripe/product-list',
    };

    return API.request(options);
  },
};

export default Stripe;
