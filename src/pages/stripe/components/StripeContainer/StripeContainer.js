import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from '../PaymentForm/PaymentForm';

const StripeContainer = () => {
  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_API_PUBLIC_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
};

export default StripeContainer;
