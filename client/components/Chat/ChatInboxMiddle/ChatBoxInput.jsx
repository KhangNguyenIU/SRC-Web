import React, { useState } from 'react';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@styles/ChatInboxMiddle.module.scss';
import { loadingType, messageType } from '@constants';

import { CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Grow from '@mui/material/Grow';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

export default function ChatBoxInput({
  textInput,
  setTextInput,
  handleSendMessage,
  typeOfMessage,
  setTypeOfMessage,
  socket,
  currentChatRoom,
}) {
  const user = useSelector((state) => state.user);
  const [fileInput, setFileInput] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const onLoadImage = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInput(file);
    setTypeOfMessage(messageType.IMAGE);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setTextInput(reader.result);
    };
  };

  const clearInput = () => {
    setTextInput('');
    setFileInput('');
    setPreviewSource('');
    setTypeOfMessage(messageType.TEXT);
  };

  const handleChangeInput = (input) => {
    setTextInput(input);

    if (socket) {
      if (input.length > 0 && !!currentChatRoom?.id) {
        socket.emit('user-typing', {
          chatRoomId: currentChatRoom.id,
          user: user,
        });
      } else {
        socket.emit('user-stop-typing', {
          chatRoomId: currentChatRoom.id,
          user: user,
        });
      }
    }
  };

  const onSendMessage = () => {
    if (textInput !== '') {
      handleSendMessage();
      clearInput();
    }
  };
  return (
    <React.Fragment>
      {openEmoji && (
        <EmojiPicker
          lazyLoadEmojis={true}
          onEmojiClick={(e) => handleChangeInput(e.emoji)}
          style={{ position: 'absolute', bottom: '50px', right: '0' }}
        />
      )}
      <div className={styles.chatboxInput}>
        <div className={styles.chatInputTool}>
          <AddCircleOutlinedIcon />
          <div className={styles.imageTool}>
            <label htmlFor="input-image" className={styles.imageTool}>
              <ImageIcon />
            </label>
          </div>
          <IconButton onClick={() => setOpenEmoji((state) => !state)}>
            <EmojiEmotions style={{ position: 'relative' }}></EmojiEmotions>
          </IconButton>

          <input
            type="file"
            accept="image/*"
            id="input-image"
            hidden
            onChange={onLoadImage}
          />
        </div>

        <div className={styles.inputField}>
          {!previewSource || typeOfMessage === messageType.TEXT ? (
            <Grow in={typeOfMessage === messageType.TEXT}>
              <input
                type="text"
                value={textInput}
                className={styles.messageInput}
                onChange={(e) => handleChangeInput(e.target.value)}
                placeholder="Aa"
              />
            </Grow>
          ) : (
            <Grow in={!!previewSource && typeOfMessage === messageType.IMAGE}>
              <div className={styles.imagePreview}>
                <div className={styles.imagePreviewBox}>
                  <img src={previewSource || ''} alt="preview" />

                  <div className={styles.overlay}>
                    <IconButton onClick={clearInput} styles={styles.closeIcon}>
                      <CloseIcon sx={{ color: 'black' }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grow>
          )}
        </div>

        {loading.state && loading.type === loadingType.MESSAGE ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          <IconButton onClick={onSendMessage}>
            <SendIcon color="secondary" />
          </IconButton>
        )}
      </div>
    </React.Fragment>
  );
}
