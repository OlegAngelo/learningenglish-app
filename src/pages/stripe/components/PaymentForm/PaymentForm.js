import { Fragment } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#91e3ff",
      color: "#404040",
      fontWeight: 500,
      fontSize: "16px",
      width: '100px',
      fontSmoothing: "antialized",
      ":-webkit-autofill": { color: "fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const PaymentForm = () => {
  const [ success, setSuccess ] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const API_v1 = `${process.env.REACT_APP_SERVER_API}/api/stripe/payment`;
        const API_v2 = `${process.env.REACT_APP_SERVER_API}/api/stripe/paymentv2`;
        
        const response = await axios.post(API_v2, {
          amount: 20 * 100,
          id
        });
  
        if (response.status === 200) {
          console.log('Successful Payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Fragment>
      {!success?
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow ml-10">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          
          <button 
            className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-auto"
          >Pay Now</button>
        </form>
        :
        <div>
          <div class="bg-green-100 border border-green-400 text-white-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Congratulation!</strong>
            <span class="block sm:inline"> Payment is successful.</span>
          </div>

          <div className="mt-5">
            <h1 className="ml-10 ">
              <a href="https://dashboard.stripe.com/test/developers" target="_blank">Check Stripe Overview</a>
            </h1>
            <h1 className="ml-10">
              <a href="https://dashboard.stripe.com/test/events" target="_blank">Check Stripe Events</a>
            </h1>
          </div>

          <button 
            className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-auto" 
            onClick={() => handleClick()}
          >Test Again</button>
        </div>
      }
    </Fragment>
  )
};

export default PaymentForm;
