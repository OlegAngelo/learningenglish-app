import React from 'react';

import Header from "../../../../shared/Header/Header";
import StripeContainer from '../StripeContainer/StripeContainer';
import PaymentForm from './Form/Form';

const Payment = () => {
  return (
    <>
      <Header title='Payment Form' hasBack={true} forcedUrl='/stripe/plans'/>
      <StripeContainer>
        <PaymentForm />
      </StripeContainer>
    </>
  );
};

export default Payment;
