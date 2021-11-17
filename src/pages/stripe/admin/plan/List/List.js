import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Stripe from '../../../../../api/stripe/sample/Stripe';

import Breadcrumb from '../../../../../shared/Breadcrumb/Breadcrumb';
import Button from '../../../../../shared/Button/Button';
import Table from '../../../../../shared/Table/Table';

const List = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFetchingSubs, setIsFetchingSubs] = useState(true);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);

  useEffect(() => {
    Stripe.subscriptions().then((resp) => {
      setSubscriptions(resp.data.data);
      setIsFetchingSubs(false);
    });
    Stripe.productList().then((resp) => {
      setProducts(resp.data.data);
      setIsFetchingProducts(false);
    });
  }, []);

  return (
    <div className="px-px-32 pt-px-24 flex-1 h-full w-full pb-px-20">
      <div className="h-px-25 flex mb-px-16">
        <Breadcrumb text="ダッシュボード" to="/admin" />
        <Breadcrumb text="Stripe" to="#5" active last />
      </div>

      <div className="py-px-20 flex flex-row-reverse">
        <Link to="/admin/stripe/plan/create">
          <Button innerClass="min-w-px-92" innerClass="cursor-pointer" type="blue-square">
            Add Product
          </Button>
        </Link>
      </div>

      <div className="mt-px-20">
        <div>Product &amp; Prices</div>
        <Table type="paginated" className="shadow-card w-full">
          <tbody>
            <tr className="text-12">
              <th className="text-left py-px-11 pt-px-12">Product</th>
              <th className="py-px-11 pt-px-12">Price</th>
              <th className="py-px-11 pt-px-12">Interval</th>
              <th className="py-px-11 pt-px-12">Inverval Count</th>
            </tr>
            {products?.map((product, idx) => {
              return (
                <tr key={idx}>
                  <td>{product.product_info.name}</td>
                  <td className="text-center">{product.unit_amount}</td>
                  <td className="text-center">{product.recurring.interval}</td>
                  <td className="text-center">{product.recurring.interval_count}</td>
                </tr>
              );
            })}
            {!products.length && !isFetchingProducts && (
              <tr className="m-5 text-adminGray-500">
                <td colSpan="9" className="text-center">
                  No data
                </td>
              </tr>
            )}
            {isFetchingProducts && (
              <tr className="m-5 text-adminGray-500">
                <td colSpan="9" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="mt-px-20 pb-20">
        <div>Subscriptions</div>
        <Table type="paginated" className="shadow-card w-full">
          <tbody>
            <tr className="text-12">
              <th className="text-left py-px-11 pt-px-12">Customer Id</th>
              <th className="text-left py-px-11 pt-px-12">Subscription Id</th>
              <th className="py-px-11 pt-px-12">Registration Date</th>
              <th className="py-px-11 pt-px-12">Current Period Start</th>
              <th className="py-px-11 pt-px-12">Current Period End</th>
              <th className="py-px-11 pt-px-12">Status</th>
            </tr>
            {subscriptions?.map((subscription) => {
              return (
                <tr key={subscription.id}>
                  <td>{subscription.customer.id}</td>
                  <td>{subscription.id}</td>
                  <td className="text-center">
                    {moment.unix(subscription.created).format('MM/DD/YYYY')}
                  </td>
                  <td className="text-center">
                    {moment.unix(subscription.current_period_start).format('MM/DD/YYYY')}
                  </td>
                  <td className="text-center">
                    {moment.unix(subscription.current_period_end).format('MM/DD/YYYY')}
                  </td>
                  <td className="text-center">{subscription.status}</td>
                </tr>
              );
            })}
            {!subscriptions.length && !isFetchingSubs && (
              <tr className="m-5 text-adminGray-500">
                <td colSpan="9" className="text-center">
                  No data
                </td>
              </tr>
            )}
            {isFetchingSubs && (
              <tr className="m-5 text-adminGray-500">
                <td colSpan="9" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default List;
