import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

import { Box, Modal } from '@mui/material';

import styles from '@styles/ChatInboxMiddle.module.scss';

import Message from './Message';
import TypingLoadingMessage from './Message/TypingLoadingMessage';

export default function ChatBoxContent({ currentChatRoom, isTypingList }) {
  const chatBoxRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [curMedia, setCurMedia] = useState(null);

  useEffect(() => {
    chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatRoom, isTypingList]);

  const onClickImg = (img) => {
    onOpen();
    setCurMedia(img);
  };
  const onClose = () => {
    setOpen(false);
    setCurMedia(null);
  };
  const onOpen = () => setOpen(true);

  return (
    <React.Fragment>
      <div className={styles.chatboxContent}>
        {!!currentChatRoom?.messages?.length &&
          currentChatRoom?.messages.map((message, index) => (
            <Message key={index} message={message} onClickImg={onClickImg} />
          ))}
        <div ref={chatBoxRef}>
          {!!isTypingList.length && (
            <TypingLoadingMessage isTypingList={isTypingList} />
          )}
        </div>
      </div>

      <div className={styles.reviewImg}>
        <Modal open={open} onClose={onClose} style={{ padding: '0px' }}>
          <Box sx={modalBox}>
            <div className={styles.img} style={{width:'100%', height:'100%', textAlign:'center'}}>
              <img src={curMedia?.content} alt="message media"  style={{maxHeight:'100%', maxW
            :'100%', objectFit:'contain'}}/>
            </div>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
}

const modalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: [400, 600, 800, 1000],
  height: [600, 600],
  display: 'flex',
  flexDirection: 'column',
//   backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
};
