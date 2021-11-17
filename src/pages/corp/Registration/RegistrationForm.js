import React, { Fragment, useState } from 'react'

import AlertModal from '../../../shared/AlertModal/AlertModal';
import Stripe from '../../../api/stripe/sample/Stripe';

export const RegisterFormContext = React.createContext('');

const RegistrationForm = ({children}) => {
  const products = [
    {
      name: '3 Months',
      price: 100,
      interval: 3,
    },
    {
      name: '6 Months',
      price: 300,
      interval: 6,
    },
    {
      name: '12 Months',
      price: 500,
      interval: 12,
    },
  ];

  const [grid, setGrid] = useState([
    [
      { readOnly: true, value: '' },
      { value: 'First Name', readOnly: true },
      { value: 'Last Name', readOnly: true },
      { value: 'Email', readOnly: true },
    ],
    [
      { readOnly: true, value: 1 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 2 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 3 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 4 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 5 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 6 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 7 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 8 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 9 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
    [
      { readOnly: true, value: 10 },
      { value: '' },
      { value: '' },
      { value: '' },
    ],
  ]);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [startAt, setStartAt] = useState('');
  const [group, setGroup] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  const onCellsChanged = changes => {
    let updatedGrid = grid;
    changes.forEach(({ cell, row, col, value }) => {
      updatedGrid[row][col] = { ...updatedGrid[row][col], value };
    });

    setGrid(updatedGrid);
  };

  const onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;

  const getUserData = (sheetData) => {
    const data = sheetData;
    const newData = data.slice(1, data.length);
    const users = newData.map(item => {
      return {
        firstName: item[1].value,
        lastName: item[2].value,
        email: item[3].value, 
      }
    })
    .filter(item => item.firstName != '' || item.lastName != '' || item.email != '' )
   
    return users;
  }

  const handleSubmit = () => {
    const userData = getUserData(grid);

    Stripe.registerUser({
      users: userData,
      startAt,
      plan: productInfo,
      group
    })
    .then(() => {
      setIsShowModal(true);
    })
  }

  const state = {
    products,
    grid,
    onCellsChanged,
    onContextMenu,
    paymentMethod,
    setPaymentMethod,
    setProductInfo,
    setStartAt,
    setGroup,
    handleSubmit
  }

  return (
    <Fragment>
      <AlertModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        message="Users are registerd"
      />
      <RegisterFormContext.Provider value={state}>
        {children}
      </RegisterFormContext.Provider>
    </Fragment>
  )
}

export default RegistrationForm
