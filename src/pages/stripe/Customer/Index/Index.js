import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import CustomerApi from '../../../../api/stripe/sample/CustomerApi';

import Table from '../../../../shared/Table/Table';

import style from './Index.module.css';

const Index = () => {
  const history = useHistory();
  const location = useLocation();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await CustomerApi.getCustomers();

        setCustomers(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getCustomers();
  }, []);

  const getUrl = (data) => {
    history.push({
      pathname: `/stripe/customer/${data?.id}`,
      state: {
        prevQuery: location.search,
      },
    });
  };

  const customersData = () => {
    if (customers.length) {
      return customers.map((item, index) => {
        return (
          <tr key={index}>
            <td>
              <div
                className="cursor-pointer text-adminPrimary-400"
                onClick={() => getUrl(item)}
              >
                {item.id}
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.balance}</td>
          </tr>
        );
      });
    }

    return (
      <tr>
        <td colSpan="4">No data</td>
      </tr>
    );
  };

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full">
      <div className="h-px-25 flex mb-px-16">
        <p
          className={`${style.pageDescription} text-14 text-adminGray-500 pb-px-18`}
        >
          TEST PAGE FOR STRIPE API - CUSTOMERS
        </p>
      </div>

      <div className="pb-4">
        <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
          List of Customers
        </span>

        <div className="pt-px-16">
          <Table type="paginated" className={`shadow-card ${style.table}`}>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
              </tr>

              {isLoading ? (
                <tr>
                  <td colSpan="4">Loading data...</td>
                </tr>
              ) : (
                customersData()
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Index;
