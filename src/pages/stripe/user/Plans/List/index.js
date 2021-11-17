import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Stripe from '../../../../../api/stripe/sample/Stripe';

import Button from '../../../../../shared/Button';
import Menu from '../../../../../shared/Menu';
import Tab from '../../../../../shared/Menu/components/Tab';
import Card from '../../../../../shared/Card';
import Header from '../../../../../shared/Header';
import Table from '../../../../../shared/Table';

const Index = () => {
  const history = useHistory();
  const tab = useParams().tab;
  const [isFetchingSubs, setIsFetchingSubs] = useState(true);
  const [fetchingList, setFetchingList] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [list, setList] = useState(null);

  const currency = {
    'jpy' : '¥',
    'usd' : '$'
  };

  useEffect(() => {
    if (tab === 'plans' ) {
      Stripe.userProductList()
        .then((response) => {
          setList(response.data.data);
          setFetchingList(false);
        });
    } else {
      Stripe.userSubscriptions()
        .then((response) => {
          setSubscriptions(response.data);
          setIsFetchingSubs(false);
        });
    }
  }, [tab]);
  
  const promptSubscription = (e, priceId) => {
    if (window.confirm('Are you sure you want to subscribe?')) {
      setIsSubscribing(true);
      Stripe.createSubscription({ priceId })
        .then((resp) => {
            const { status } = resp;
            if (status === 200) {
              setIsSubscribing(false);
              alert('Subscription Success');
            }
        });
    }

    e.target.blur();
  };

  return (
    <div>
      <Header title='Stripe' hasBack={true} forcedUrl='/'/>

      <Menu bgColor="primary-500" spaceX="16" paddingX="2" paddingY="3">
        <Link to="/stripe/plans">
          <Tab type="rounded2" size="sm">
            Plan
          </Tab>
        </Link>
        <Link to="/stripe/subscriptions">
          <Tab type="rounded2" size="sm" >
            Subscription
          </Tab>
        </Link>
      </Menu>

      { tab === 'plans' ? (
        <div className="p-px-30 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {fetchingList && (
            <div className="col-start-1 col-span-4">
              Loading...
            </div>
          )}
          {isSubscribing && (
            <div className="col-start-1 col-span-4">
              Subscribing... Please wait.
            </div>
          )}
          {(!fetchingList && !list.length) && (
            <div className="col-start-1 col-span-4">
              No Products yet.
            </div>
          )}
          { list?.map((item) => {
            return (
              <div>
                <Card className="py-px-20 flex flex-col items-center justify-center text-adminGray-500">
                    <div>
                      <span className="text-30 font-bold text-adminGray-700">{currency[item.currency]}{item.unit_amount}</span><span className="text-14">/ {item.recurring.interval}</span>
                    </div>
                    <div className="text-14 font-semibold">
                      {item.product_info.name}
                    </div>
                    <Link to={`/stripe/plan/${item.id}/payment`}>
                      <Button
                        className="pt-px-30"
                        innerClass="min-w-px-92"
                        innerClass="cursor-pointer"
                        type="blue-square"
                      >
                        Subscribe
                      </Button>
                    </Link>
                </Card>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="p-px-50">
          <Table type="paginated" className="shadow-card w-full">
            <tbody>
                <tr className="text-12">
                  <th className="text-left py-px-11 pt-px-12">Subscription Id</th>
                  <th className="py-px-11 pt-px-12">Registration Date</th>
                  <th className="py-px-11 pt-px-12">Current Period Start</th>
                  <th className="py-px-11 pt-px-12">Current Period End</th>
                  <th className="py-px-11 pt-px-12">Status</th>
                </tr>
                {subscriptions?.map((subscription) => {
                  return (
                    <tr key={subscription.id}>
                      <td>{subscription.id}</td>
                      <td className="text-center">{moment.unix(subscription.created).format('MM/DD/YYYY')}</td>
                      <td className="text-center">{moment.unix(subscription.current_period_start).format('MM/DD/YYYY')}</td>
                      <td className="text-center">{moment.unix(subscription.current_period_end).format('MM/DD/YYYY')}</td>
                      <td className="text-center">{subscription.status}</td>
                    </tr>
                  )
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
      )}
    </div>
  )
}

export default Index;
