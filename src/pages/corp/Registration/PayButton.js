import React, {useContext} from 'react'
import { RegisterFormContext } from './RegistrationForm';
import Button from '../../../shared/Button/Button';

const PayButton = () => {
  const {handleSubmit} = useContext(RegisterFormContext);
  return (
    <div>
      <Button
        className="classes_to_btn_wrapper"
        onClick={() => handleSubmit()}
        type="blue-square"
      >
        Checkout
      </Button>
    </div>
  )
}

export default PayButton
