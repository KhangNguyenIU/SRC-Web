import React from 'react';
import styles from '@styles/Message/Typing.module.scss';
import { detectWhoIsTyping } from 'utils';
import { Avatar } from '@mui/material';

export default function TypingLoadingMessage({ isTypingList }) {
  return (
    <React.Fragment>
      <div className={`${styles.messageContent}  ${styles.isTyping}`}>
        <div className={styles.messagePart}>
          <Avatar src={isTypingList[0].avatar} />
          <div className={styles.messageTypingWrapper}>
            <div className={styles.messageTyping}>
              <div className={styles.dotFlashing}></div>
            </div>
            <p className={styles.isTypingText} style={{ color: 'white' }}>
              {detectWhoIsTyping(isTypingList)}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
