import { Fragment } from 'react';

const TabMenu = ({ children }) => {
  return (
    <Fragment>
      <ul className="flex text-center font-bold text-18 list-none w-px-544">
        {children.map((element) => {
          return element;
        })}
      </ul>
    </Fragment>
  );
};

export default TabMenu;
