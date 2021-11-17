import React, { Fragment } from 'react';

import styles from './Commentary.module.css';

const Commentary = ({ name, response, isTranslate, translatedName, translatedResponse }) => {
  return (
    <Fragment>
      <div className={`${styles.paragraphWrapper} font-hiragino-kaku`}>
        <p className={`text-14`}>
          <b>{name} : </b>
          {response}
        </p>
        {
          isTranslate &&
          <p className={`text-primary-500 text-13 mt-2`}>
            <b>{translatedName}: </b>
            {translatedResponse}
          </p>
        }
      </div>
    </Fragment>
  )
}

export default Commentary
