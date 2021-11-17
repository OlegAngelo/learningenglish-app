import React from 'react'
import 'react-datasheet/lib/react-datasheet.css';
import Card from '../../../shared/Card/Card';
import RegistrationForm from './RegistrationForm';
import './SampleRegistration.css';
import Plans from './Plans';
import UserGridForm from './UserGridForm';
import BasicInfo from './BasicInfo';
import PayButton from './PayButton';

const SampleRegistration = () => {

  return (
    <div className="px-px-32 pt-px-24 flex h-full w-full bg-adminGray-100">
      <RegistrationForm>
        <div className="w-full p-5">
          <Card className="p-5">
            <BasicInfo />
            <UserGridForm />
            <PayButton />
          </Card>
        </div>

        <div className="w-full p-5">
          {/* Subscription Plan */}
          <Plans />
        </div>
      </RegistrationForm>
    </div>
  );
};

export default SampleRegistration;
