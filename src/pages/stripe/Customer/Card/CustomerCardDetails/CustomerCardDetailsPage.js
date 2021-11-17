import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';

import CustomerApi from '../../../../../api/stripe/sample/CustomerApi';

import Breadcrumb from '../../../../../shared/Breadcrumb/Breadcrumb';
import Table from '../../../../../shared/Table/Table';

import style from './CustomerCardDetailsPage.module.css';

const CustomerCardDetailsPage = () => {
  const cardId = useParams()?.pmId;
  const customerId = useParams()?.custId;
  const history = useHistory();
  const location = useLocation();
  const [cardDetails, setCardDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCustomerCardDetails = async () => {
    try {
      const response = await CustomerApi.getCustomerCardDetails({
        customerId: customerId,
        cardId: cardId,
      });
      setCardDetails(response?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCustomerCardDetails();
  }, []);

  const onClickEditCardDetails = async (customerId, cardId) => {
    history.push({
      pathname: `/stripe/customer/${customerId}/payment-method/${cardId}/edit`,
      state: {
        ...cardDetails,
      },
    });
  };

  const cardDetailsData = () => {
    if (cardDetails) {
      return (
        <Fragment>
          <tr>
            <td>Card ID</td>
            <td>{cardDetails?.id}</td>
          </tr>
          <tr>
            <td>Credit Card Number(exp. mm / exp. year)</td>
            <td>
              ********{cardDetails?.last4} ({cardDetails?.exp_month}/
              {cardDetails?.exp_year})
            </td>
          </tr>
          <tr>
            <td>Brand</td>
            <td>{cardDetails?.brand}</td>
          </tr>
          <tr>
            <td>Card Holder</td>
            <td>{cardDetails?.name}</td>
          </tr>
          <tr>
            <td>Funding</td>
            <td>{cardDetails?.funding}</td>
          </tr>
          <tr>
            <td>Address City</td>
            <td>
              {cardDetails?.address_city ? cardDetails?.address_city : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>Address Country</td>
            <td>
              {cardDetails?.address_country
                ? cardDetails?.address_country
                : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>Address State</td>
            <td>
              {cardDetails?.address_state ? cardDetails?.address_state : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>Address Line 1</td>
            <td>
              {cardDetails?.address_line1 ? cardDetails?.address_line1 : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>Address Line 2</td>
            <td>
              {cardDetails?.address_line2 ? cardDetails?.address_line2 : 'N/A'}
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
        <Breadcrumb
          text="Customer Details"
          to={`/stripe/customer/${customerId}`}
        />
        <Breadcrumb
          text="Card"
          to={`/stripe/customer/${customerId}/payment-methods`}
        />
        <Breadcrumb text="Card Details" to="#4" active last />
      </div>

      <div className="pb-4">
        <span className="font-hiragino text-20 leading-px-20 py-2 font-bold text-base-dark">
          Card Details
        </span>

        <span>
          {isLoading ? (
            ''
          ) : (
            <button
              className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto"
              onClick={() => onClickEditCardDetails(customerId, cardId)}
            >
              Edit
            </button>
          )}
        </span>

        <div className="pt-px-16">
          {isLoading ? (
            <div className="text-14 text-adminGray-500">Loading data...</div>
          ) : cardDetails ? (
            <Table type="paginated" className={`shadow-card ${style.table}`}>
              <tbody>{cardDetailsData()}</tbody>
            </Table>
          ) : (
            <div className="text-14 text-adminGray-500">No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCardDetailsPage;
