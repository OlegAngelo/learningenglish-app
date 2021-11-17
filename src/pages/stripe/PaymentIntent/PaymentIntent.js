import { Fragment, useState } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import StripeContainer from '../components/StripeContainer/StripeContainer';
import style from './PaymentIntent.module.css';

const PaymentIntent = () => {
  const [ showItem, setShowItem ] = useState(false);

  return (
    <Fragment>
      <Sidebar />

      <div className={`px-px-32 pt-px-24 flex-1 h-full w-auto bg-adminGray-100 ${style.dashboardContainer}`}>
        <p className={`${style.dashboardText} text-14 text-adminGray-500 pb-px-18`}>For Testing Purposes Only</p>
        <p className="text-20 text-base-dark leading-px-18 font-bold pb-px-33">Item Information</p>
        {showItem? 
          <StripeContainer />
          :
          <Fragment>
            <h1 className="ml-10">Amount : $20</h1>
            <h1 className="ml-10">Course : Introduction to English Language System</h1>

            <button 
              className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-auto" 
              onClick={() => setShowItem(true)}
            >Purchase Course</button>
          </Fragment>
        }
      </div>
    </Fragment>
  );
};

export default PaymentIntent;
