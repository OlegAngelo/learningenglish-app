import React, { Fragment, useContext, useState } from 'react'
import ReactDataSheet from 'react-datasheet';
import { RegisterFormContext } from './RegistrationForm';

import './ReactDataSheet.css';

const UserGridForm = () => {
  const {grid, onContextMenu, onCellsChanged} = useContext(RegisterFormContext);

  return (
    <div className="my-5">
      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.value}
        onContextMenu={onContextMenu}
        onCellsChanged={onCellsChanged}
        className="react-data-sheet w-full"
      />
    </div>
  )
}

export default UserGridForm;
