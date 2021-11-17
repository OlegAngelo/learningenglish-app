import React from 'react';

import CommentaryBubbleIcon from '../../../../../shared/icons/CommentaryBubble';

import styles from './QuestionnaireFooter.module.css';

const CommentaryBubble = ({ className, ...props }) => {
  return (
    <div className={`relative flex flex-row-reverse ${className}`}>
      <CommentaryBubbleIcon {...props} />
    </div>
  );
}

export default CommentaryBubble;
