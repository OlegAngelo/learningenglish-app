import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import CustomerApi from '../../../../../../api/stripe/sample/CustomerApi';

import Breadcrumb from '../../../../../../shared/Breadcrumb/Breadcrumb';

const EditCustomerCardDetailsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [cardDetails, setCardDetails] = useState([]);
  const cardId = useParams()?.pmId;
  const customerId = useParams()?.custId;
  const [isLoading, setIsLoading] = useState(false);

  const rules = {
    cardHolder: { required: true },
    expMonth: { required: true },
    expYear: { required: true },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    CustomerApi.updateCustomerCardDetails({
      ...data,
      customerId: customerId,
      cardId: cardId,
    })
    .then((response) => {
      setCardDetails(response?.data);
      const { status } = response;
      if (status == 200) {
        alert('Success');
        history.goBack();
      }
    }).catch((error) => {
      alert(error.response.data.message);
      setIsLoading(false);
    });
  };

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="Customers" to="/stripe/customers" />
        <Breadcrumb text="Customer Details" to={`/stripe/customer/${customerId}`} />
        <Breadcrumb text="Card" to={`/stripe/customer/${customerId}/payment-methods`} />
        <Breadcrumb text="Card Details" to={`/stripe/customer/${customerId}/payment-method/${cardId}`} />
        <Breadcrumb text="Edit" to="#5" active last />
      </div>
      <div className="p-px-20 bg-basic-400">
        <div className="py-px-20 font-bold text-adminGray-500">Edit Credit Card</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Card Holder: <span className="text-adminRed-400">*</span>
            </p>
            <input
              type="text"
              defaultValue={location.state.name}
              name="cardHolder"
              ref={register(rules.creditCardNumber)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            />
            {errors.creditCardNumber && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Expiry Month: <span className="text-adminRed-400">*</span>
            </p>
            <input
              type="number"
              defaultValue={location.state.exp_month}
              name="expMonth"
              ref={register(rules.expMonth)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            />
            {errors.expMonth && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Expiry Year: <span className="text-adminRed-400">*</span>
            </p>
            <input
              type="number"
              defaultValue={location.state.exp_year}
              name="expYear"
              ref={register(rules.expYear)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            />
            {errors.expYear && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-adminPrimary-400 text-white rounded mt-px-20 py-px-5 px-px-20"
          >
            {isLoading ? 'Saving data...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerCardDetailsPage;
