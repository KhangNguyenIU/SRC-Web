import React from 'react';

import styles from '@styles/ChatInboxMiddle.module.scss';
import MessageText from './Message/MessageText';
import Message from './Message';

export default function ChatBoxContent({currentChatRoom}) {
    // console.log({currentChatRoom})
  return (
    <React.Fragment>
      <div className={styles.chatboxContent}>
        {
            !!currentChatRoom.messages.length && currentChatRoom.messages.map((message, index) => (
                <Message
                    key={index}
                    message={message}
                />
            ))
        }
      </div>
    </React.Fragment>
  );
}
