import React from 'react';
import { useMemo } from 'react';

import styles from '@styles/ChatInboxMiddle.module.scss';
import { Avatar } from '@mui/material';

import { messageType } from '@constants';

export default function MessageText({ message, isMyMessage }) {
  const prefix = useMemo(
    () => (isMyMessage ? styles.isMyMessage : ''),
    [isMyMessage]
  );

  const classes = useMemo(() => {
    return {
      messageContent: `${styles.messageContent} + ${prefix}`,
      messagePart: `${styles.messagePartDir} + ${prefix}`,
      messageText: `${styles.messageText} + ${prefix}`,
    };
  }, [message, isMyMessage]);

  return (
    <React.Fragment>
      <div className={classes.messageContent}>
        <div className={classes.messagePart}>
          {!isMyMessage && <Avatar src={message.postedBy.avatar} />}

          <div className={styles.message}>
            {message.type === messageType.TEXT ? (
              <div className={styles.messageText}>{message.content}</div>
            ) : (
              <div className={styles.messageImage}>
                <img
                  src={message.content}
                  alt="message media"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
