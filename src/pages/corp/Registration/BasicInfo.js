import React, { Fragment, useContext } from 'react'
import InputDate from '../../../shared/InputDate/InputDate';
import { RegisterFormContext } from './RegistrationForm';

const BasicInfo = () => {
  const {setStartAt, setGroup} = useContext(RegisterFormContext);

  return (
    <Fragment>
      {/* when user will start */}
      <div className="my-5">
        <label for="start_at">Start At:</label>
        <InputDate onChange={setStartAt}/>
      </div>

      <div className="my-5">
        <label for="group">Group:</label>
        <div>
          <input
            id="group"
            type="text"
            className={`bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14`}
            onChange={(e) => setGroup(e.target.value)}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default BasicInfo
