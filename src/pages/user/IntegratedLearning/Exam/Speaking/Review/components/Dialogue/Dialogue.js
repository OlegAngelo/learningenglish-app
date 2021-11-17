import React, { Fragment } from 'react';

import PolygonIcon from '../../../../../../../../shared/icons/PolygonIcon';

import styles from './Dialogue.module.css';

const Dialogue = ({ dialogue, className = '', state }) => {
  return (
    <Fragment>
      <div
        className={`px-4 flex items-center text-basic-100 ${
          state === 'feedback'
            ? `bg-secondary-500 ${styles.feedbackDialogueCard}`
            : 'bg-white mt-px-18'
        } ${className} ${styles.dialogueCard}`}
      >
        <div
          className={`${styles.dialogueText} text-14 font-normal whitespace-pre-line`}
        >
          {dialogue}
        </div>
      </div>
      <div className={`flex justify-center ${styles.icon}`}>
        <PolygonIcon
          width="30"
          height="28"
          color={state === 'feedback' ? '#03DAC6' : '#FFFFFF'}
        />
      </div>
    </Fragment>
  );
};

export default Dialogue;
