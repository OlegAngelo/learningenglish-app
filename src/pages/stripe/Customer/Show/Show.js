import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';

import CustomerApi from '../../../../api/stripe/sample/CustomerApi';

import Breadcrumb from '../../../../shared/Breadcrumb/Breadcrumb';

import Table from '../../../../shared/Table/Table';

import style from './Show.module.css';

const Show = () => {
  const customerId = useParams()?.custId;
  const history = useHistory();
  const location = useLocation();
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await CustomerApi.getCustomer(customerId);

        setCustomer(response?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getCustomer();
  }, []);

  const openCustomerCardList = (customerId) => {
    history.push({
      pathname: `/stripe/customer/${customerId}/payment-methods`,
      state: {
        prevQuery: location.search,
      },
    });
  }

  const customerData = () => {
    if (
      customer &&
      typeof customer === 'object' &&
      Object.keys(customer).length
    ) {
      return (
        <Fragment>
          <tr>
            <td>ID</td>
            <td>{customer?.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{customer?.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{customer?.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{customer?.phone}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {customer?.address
                ? `${customer?.address?.city}, ${customer?.address?.country}, ${customer?.address?.postal_code}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Discount</td>
            <td>{customer?.discount || ''}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>{customer?.balance}</td>
          </tr>
          <tr>
            <td>Card</td>
            <td>
              <div
                className="cursor-pointer text-adminPrimary-400"
                onClick={() => openCustomerCardList(customer.id)}
              >
                Open Card List
              </div>
            </td>
          </tr>
        </Fragment>
      );
    }
  };

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="Customers" to="/stripe/customers" />
        <Breadcrumb text="Customer Details" to="#2" active last />
      </div>

      <div className="pb-4">
        <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
          {customer?.name}
        </span>

        <div className="pt-px-16">
          {isLoading ? (
            <div className="text-14 text-adminGray-500">Loading data...</div>
          ) : customer &&
            typeof customer === 'object' &&
            Object.keys(customer).length ? (
            <Table type="paginated" className={`shadow-card ${style.table}`}>
              <tbody>{customerData()}</tbody>
            </Table>
          ) : (
            <div className="text-14 text-adminGray-500">No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Show;
