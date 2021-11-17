import React, {Fragment} from 'react'

import style from './LiveLabels.module.css';
import Tag from '../../../../../../shared/Tag';

const LiveLabels = ({showOnlive, showPlanLive, showNew}) => {
  return (
    <Fragment>
      { showOnlive && (
        <div className="mr-2 mb-1">
          <Tag
            className={`text-11 ${style.bgRed}`}
            size="xs"
            width="66px"
            weightBold
            light
          >
            LIVE中
          </Tag>
        </div>
      )}

      { showPlanLive && (
        <div className="mr-2 mb-1">
          <Tag
            className={`text-11 ${style.bgGray}`}
            color="error"
            size="xs"
            width="66px"
            weightBold
            light
          >
            LIVE
          </Tag>
        </div>
      )}

      { showNew && (
        <div className="mr-2 mb-1">
          <Tag
            className={`text-11 ${style.bgOrange}`}
            color="error"
            size="xs"
            width="66px"
            weightBold
            light
          >
            NEW!
          </Tag>
        </div>
      )}
      
    </Fragment>
  )
}

export default LiveLabels
