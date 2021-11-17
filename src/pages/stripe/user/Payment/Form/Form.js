import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import queryString from 'query-string';

import Stripe from '../../../../../api/stripe/sample/Stripe';

import Card from '../../../../../shared/Card/Card';
import Input from '../../../../../shared/Input/Input';

const Form = () => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const URLParams = new URLSearchParams();
  const { id: priceId } = useParams();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [checkingCustomer, setCheckingCustomer] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [errorCoupon, setErrorCoupon] = useState('');

  const currency = {
    'jpy' : '¥',
    'usd' : '$'
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    setProcessing(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (error) {
      setError(`Payment failed ${error.message}`);
      setProcessing(false);
    } else {
      subscribePlan(paymentMethod);
    }
  };

  const subscribePlan = ({ id }) => {
    const payload = {
      paymentMethod: id,
      priceId,
      couponCode,
    };

    Stripe.createSubscription(payload)
    .then((resp) => {
        const { status } = resp;
        if (status === 200) {
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          alert('Subscription Success');
          history.goBack();
        }
      }).catch((e) => {
        setErrorCoupon(e.response.data.exceptionMessage)
        setProcessing(false)
      })
  };

  useEffect(() => {
    Stripe.getCustomer({ priceId })
      .then((resp) => {
        if (resp.data.customer?.data) {
          setCardList(resp.data.customer.data)
        }
        setCheckingCustomer(false);
        setProductDetails(resp.data.product)
      });
  }, []);
  
  return (
    <>
      { checkingCustomer && (
        <div className="p-px-20">
          Checking Customer Info...
        </div>
      )}
      { productDetails && (
        <div className="flex flex-col items-center justify-center py-px-20 text-adminGray-500">
          <div className="font-semibold">
            {productDetails.product.name} Subscription
          </div>
          <div>
            <span className="text-30 font-bold text-adminGray-700">{currency[productDetails.currency]}{productDetails.unit_amount}</span><span className="text-14">/ {productDetails.recurring.interval}</span>
          </div>
        </div>
      )}
      { (!checkingCustomer && cardList.length > 0) && (
        <div className="flex flex-col items-center justify-center py-px-20">
          {cardList?.map((card) => {
            return (
              <div><span className="font-semibold text-adminGray-400">{card.card.brand}</span> - {card.card.last4}</div>
            )
          })}

          <Input
            label='Enter Coupon here:'
            type="text"
            name="coupon"
            className='mt-3'
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {errorCoupon}

          <button
            className="bg-adminPrimary-400 text-white rounded font-bold mt-px-20 py-px-5 px-px-20"
            onClick={() => {
              setProcessing(true);
              subscribePlan(cardList[0]);
            }}
          >
            {processing ? 'Processing...' : 'Pay now' }
          </button>
        </div>
      )}
      { (!checkingCustomer && !cardList.length) && (
        <form id="payment-form" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center py-px-20">
            <div className="flex flex-col items-center justify-center py-px-20">
              <Card className="w-px-350 p-px-20">
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
              </Card>
            </div>

              <Input
                label='Enter Coupon here:'
                type="text"
                name="coupon"
                className='mt-3'
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {errorCoupon}

            <button
              disabled={processing || disabled || succeeded}
              id="submit"
              className="bg-adminPrimary-400 text-white rounded font-bold mt-px-20 py-px-5 px-px-20"
            >
              {processing ? 'Processing...' : 'Pay now' }
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
              <div className="text-exam-error py-px-20">
                {error}
              </div>
            )}
            {/* Show a success message upon completion */}
            <p className={succeeded ? "pt-px-20" : "pt-px-20 hidden"}>
              Payment succeeded, see the result in your <a href={`https://dashboard.stripe.com/test/payments`} className="text-adminPrimary-400">Stripe dashboard.</a> Refresh the page to pay again.
            </p>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
