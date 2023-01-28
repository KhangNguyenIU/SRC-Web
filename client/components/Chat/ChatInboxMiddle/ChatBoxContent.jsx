import React, { useRef } from 'react';

import styles from '@styles/ChatInboxMiddle.module.scss';
import MessageText from './Message/MessageText';
import Message from './Message';
import { useEffect } from 'react';

export default function ChatBoxContent({ currentChatRoom }) {
  // console.log({currentChatRoom})
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatRoom]);
  return (
    <React.Fragment>
      <div className={styles.chatboxContent}>
        {!!currentChatRoom?.messages?.length &&
          currentChatRoom?.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        <div ref={chatBoxRef}></div>
      </div>
    </React.Fragment>
  );
}
