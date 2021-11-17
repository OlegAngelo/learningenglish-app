import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const StripeContainer = ({children}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
};

export default StripeContainer;
