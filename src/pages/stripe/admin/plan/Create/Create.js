import React from 'react';
import { useForm } from 'react-hook-form';

import Stripe from '../../../../../api/stripe/sample/Stripe';

import Breadcrumb from '../../../../../shared/Breadcrumb/Breadcrumb';

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const rules = {
    productName: { required: true },
    amount: { required: true },
    interval: { required: true },
    intervalCount: { required: true, min: 1 },
  };

  const onSubmit = (data, event) => {
    Stripe.createProduct(data).then((response) => {
      const { status } = response;
      if (status === 200) {
        alert('Success!');
        reset();
      } else {
        alert('Error');
      }
    });
  };

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full pb-px-20">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="Stripe" to="/admin/stripe/plans" />
        <Breadcrumb text="Create" to="#5" active last />
      </div>
      <div className="p-px-20 bg-basic-400">
        <div className="py-px-20 font-bold text-adminGray-500">Create Product</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Product Name: <span className="text-adminRed-400">*</span>
            </p>
            <input
              type="text"
              name="productName"
              ref={register(rules.productName)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            />
            {errors.productName && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Amount: <span className="text-adminRed-400">*</span>
            </p>
            <input
              type="number"
              name="amount"
              ref={register(rules.amount)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            />
            {errors.amount && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Interval: <span className="text-adminRed-400">*</span>
            </p>
            <select
              name="interval"
              ref={register(rules.interval)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            >
              <option value="">-</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            {errors.interval && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <div className="mb-px-20">
            <p className="text-adminGray-400 text-12 font-bold mb-px-8">
              Interval Count: <span className="text-adminRed-400">*</span>
            </p>
            <input
              type="number"
              name="intervalCount"
              ref={register(rules.intervalCount)}
              className="bg-adminGray-50 w-px-350 rounded-px-2 border-px-2 p-px-10 text-14"
            />
            {errors.intervalCount && (
              <div className="text-exam-error text-10">This field is required</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-adminPrimary-400 text-white rounded mt-px-20 py-px-5 px-px-20"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
