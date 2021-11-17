import React, {Fragment} from 'react'

import { formatDateByElapse } from '../../../../../../utils/date';

import style from './OverlayInfo.module.css';

const OverlayInfo = ({ show = false, startDate }) => {
  return (
    <Fragment>
      { show && (
        <Fragment>
          <div className={style.overlayInfo}></div>
          <div className={style.overlayText}>
            <span className="font-bold">{formatDateByElapse(startDate)}</span>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OverlayInfo
