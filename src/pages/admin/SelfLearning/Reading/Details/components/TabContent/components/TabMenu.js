import { Fragment, useContext, useEffect } from 'react';

const TabMenu = ({children}) => {
  return (
    <Fragment>
      <ul className="flex text-center font-bold text-18 list-none">
        {children.map(element => {
          return element;
        })}
      </ul>
    </Fragment>
  )
}

export default TabMenu
