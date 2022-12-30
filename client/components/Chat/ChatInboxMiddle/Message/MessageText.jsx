import React from 'react';
import styles from '@styles/ChatInboxMiddle.module.scss';
import { Avatar } from '@mui/material';
import { messageType } from '@constants';
import Image from 'next/image';
import { useMemo } from 'react';
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
              <Image src={message.content} width={500} height={500} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
