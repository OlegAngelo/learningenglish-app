import { Fragment, useContext } from 'react'
import { TabContext } from '../TabContent';

import styles from '../TabContent.module.css';

const TabMenuItem = ({text, name: tabName}) => {
  const {tabPosition, handleChangeTab} = useContext(TabContext);

  const active = tabPosition === tabName && `${styles.borderBottom}`;

  return (
    <Fragment>
      <li
        className={`cursor-pointer ${active}`}
        onClick={() => handleChangeTab(tabName)}
        data-toggle="tab"
        href="#link1"
        role="tablist"
        style={{'width': '100%'}}
      >
        <span>
          <h3 className="pt-px-21 pb-px-21 py-px-74 text-base-dark">{text}</h3>
        </span>
      </li>
    </Fragment>
  )
}

export default TabMenuItem
