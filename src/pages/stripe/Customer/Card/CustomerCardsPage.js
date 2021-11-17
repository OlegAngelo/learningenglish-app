import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';

import CustomerApi from '../../../../api/stripe/sample/CustomerApi';

import Breadcrumb from '../../../../shared/Breadcrumb/Breadcrumb';
import Table from '../../../../shared/Table/Table';

import style from './CustomerCardsPage.module.css';

const CustomerCardsPage = () => {
  const customerId = useParams()?.custId;
  const history = useHistory();
  const location = useLocation();
  const [customerCards, setCustomerCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( async () => {
    try {
      const response = await CustomerApi.getCustomerCardList({customerId});
      setCustomerCards(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  const openCardDetails = (customerId, cardId) => {
    history.push({
      pathname: `/stripe/customer/${customerId}/payment-method/${cardId}`,
      state: {
        prevQuery: location.search,
      },
    });
  };

  const customerCardData = () => {
    if (customerCards?.length) {
      return customerCards.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.brand}</td>
            <td>
              <div
                className="cursor-pointer text-adminPrimary-400"
                onClick={() => openCardDetails(item.customer, item.id)}
              >
                *********** {item.last4}
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.funding}</td>
          </tr>
        );
      });
    };
  };

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="Customers" to="/stripe/customers" />
        <Breadcrumb text="Customer Details" to={`/stripe/customer/${customerId}`} />
        <Breadcrumb text="Card" to="#3" active last />
      </div>

      <div className="pb-4">
        <span className="font-hiragino text-20 leading-px-20 font-bold text-base-dark">
          Available Payment Methods
        </span>
        
        <div className="pt-px-16">
          {isLoading ? (
            <div className="text-14 text-adminGray-500">Loading data...</div>
          ): (
            customerCards?.length ? (
              <Table type="paginated" className={`shadow-card ${style.table}`}>
                <tbody>
                  <tr>
                    <th>Brand</th>
                    <th>Credit Card Number</th>
                    <th>Card Holder</th>
                    <th>Funding</th>
                  </tr>

                  {isLoading ? (
                    <tr>
                      <td colSpan="4">Loading data...</td>
                    </tr>
                  ) : (
                    customerCardData()
                  )}
                </tbody>
              </Table>
            )
            : ('NO PAYMENT METHODS AVAILABLE')
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCardsPage;
