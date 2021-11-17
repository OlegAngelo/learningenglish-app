import React, { useContext } from 'react'
import { RegisterFormContext } from './RegistrationForm';

const Plans = () => {
  const {products, setProductInfo} = useContext(RegisterFormContext)
  
  return (
    <div id="plans">
      {
        products.map(item => (
          <label>
            <input
              type = "radio"
              name = "plan"
              id = "planA"
              className = "item"
              onChange={() => setProductInfo(item)}
            />
            <div className="item_content">
              <span className="check_icon"></span>
              <div>{item.name} {item.price}</div>
            </div>
          </label>
        ))
      }
    </div>
    
  )
}

export default Plans
