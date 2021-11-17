import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import Table from '../../../shared/Table/Table';
import Button from '../../../shared/Button/Button';
import ConfirmationModal from '../../../shared/ConfirmationModal/ConfirmationModal';
import AlertModal from '../../../shared/AlertModal/AlertModal';

import style from './Refund.module.css';

const Refund = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [isFetchingTransactions, setIsFetchingTransactions] = useState(true);
  const [isRefunding, setIsRefunding] = useState(false);
  const [isShowRefundConfirmation, setIsShowRefundConfirmation] = useState(false);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [isRefundSuccess, setIsRefundSuccess] = useState(true);

  useEffect(() => {
    fetchPaymentList();
  }, []);

  const fetchPaymentList = () => {
    const options = {
      url: `${process.env.REACT_APP_SERVER_API}/api/stripe/payment-list`,
      method: 'GET',
    };

    setIsFetchingTransactions(true);

    axios.request(options)
      .then(res => {
        setTransactionList(res.data.data);
        setIsFetchingTransactions(false);
      
      }).catch(err => {
        console.error(err)
      });
  }

  const onConfirmRefund = () => {
    if (isRefunding) return;

    const options = {
      url: `${process.env.REACT_APP_SERVER_API}/api/stripe/refund`,
      method: 'POST',
      data: {
        charge_id: selectedId
      },
    };

    setIsShowRefundConfirmation(false);
    setIsRefunding(true);

    axios.request(options)
      .then(res => {
        fetchPaymentList();
        setIsRefunding(false);
        setIsRefundSuccess(true);
        setIsShowAlertModal(true);
      
      }).catch(err => {
        console.error(err);
        setIsRefundSuccess(true);
      });
  }

  const refundPayment = (adminId) => {
    setSelectedId(adminId);
    setIsShowRefundConfirmation(true);
  };

  // Create our number formatter.
  const toCurrency = (value, currency) => {
    const numberFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });

    return numberFormatter.format(value);
  };

  return (
    <div className="p-6">
      <ConfirmationModal
        showConfirmationModal={isShowRefundConfirmation}
        setShowConfirmationModal={setIsShowRefundConfirmation}
        message={"Are you sure want to refund this transaction?"}
        submitText="Confirm"
        cancelText="Cancel"
        onSubmit={() => {
          onConfirmRefund();
        }}
      />

      <AlertModal
        isShowModal={isShowAlertModal}
        setIsShowModal={setIsShowAlertModal}
        isSuccess={isRefundSuccess}
        message={isRefundSuccess ? "Refund success" : "Something went wrong please try again"}
      />

      <div className="font-hiragino text-16">Transactions:</div>
      <div>
        <Table type="paginated" className={`shadow-card ${style.table}`}>
            <tbody>
              <tr className="text-left">
                <th className={`text-12 py-px-11 pt-px-12 ${style.th2}`}>
                  Amount
                </th>
                <th className={`text-12 py-px-11 ${style.td3}`}>
                  Description
                </th>
                <th className={`text-12 py-px-11 ${style.td4}`}></th>
              </tr>
              {isFetchingTransactions ? (
                <tr className="m-5 text-adminGray-500">
                  <td colSpan="3" className="text-center">
                    Loading
                  </td>
                </tr>
              ) : (
                <Fragment>
                  {transactionList.length ? (
                    transactionList.map((transaction, key) => {
                      return (
                        <tr style={{ height: '48px' }} key={key}>
                          <td className={`text-14 py-px-11 ${style.td2}`}>
                              {toCurrency(transaction.amount/100, transaction.currency)}
                          </td>
                          <td className={`text-12 py-px-11 ${style.td3}`}>
                            {transaction.description || transaction.payment_intent}
                          </td>
                          <td className={`flex justify-end ${style.td4}`}>
                            { transaction.refunded
                              ? (
                                <div>Refunded</div>
                              ) : (
                                <Button
                                  className=""
                                  innerClass="cursor-pointer"
                                  type="blue-square"
                                  disabled={isRefunding}
                                  onClick={()=>refundPayment(transaction.id)}
                                >
                                  Refund
                                </Button>
                              )
                            }
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="m-5 text-adminGray-500">
                      <td colSpan="6" className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </tbody>
          </Table>
      </div>
    </div>
  );
};

export default Refund;
