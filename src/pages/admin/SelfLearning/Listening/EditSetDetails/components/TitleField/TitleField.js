import React, { Fragment, useEffect } from 'react';

const TitleField = ({ 
  register, 
  errors, 
  id, 
  name ,
}) => {
  return (
    <Fragment>
      <div className="mb-px-40">
        <div className="mb-2">
          <label
            htmlFor={id}
            className="text-adminGray-400 text-12 font-bold mb-px-8"
          >
            日本語訳 <span className="text-adminRed-400">*</span>
          </label>
        </div>

        <input
          type="text"
          name={name}
          id={id}
          className="bg-adminGray-50 h-px-36 w-px-350 tracking-input rounded-px-2 
            border-px-2 border-adminGray-200 font-px-14 leading-px-14 p-px-11 text-14"
          ref={register}
        />
        {errors && <p className="text-red-500 mt-px-2">{errors.message}</p>}
      </div>
    </Fragment>
  );
};

export default TitleField;
