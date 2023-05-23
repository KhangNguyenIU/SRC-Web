import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@styles/ChatInboxMiddle.module.scss';
import { loadingType, messageType } from '@constants';

import { CircularProgress, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Grow from '@mui/material/Grow';

export default function ChatBoxInput({
  textInput,
  setTextInput,
  handleSendMessage,
  typeOfMessage,
  setTypeOfMessage,
}) {
  const user = useSelector((state) => state.user);
  const [fileInput, setFileInput] = useState('');
  const [previewSource, setPreviewSource] = useState('');
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

  const handleChangeInput = (e) => {
    setTextInput(e.target.value);

    // if (socket) {
    //   if (e.target.value.length > 0) {
    //     socket.emit('user-typing', { chatRoomId: groupInfo._id, user: user });
    //   } else {
    //     socket.emit('user-stop-typing', {
    //       chatRoomId: groupInfo._id,
    //       user: user,
    //     });
    //   }
    // }
  };


  const onSendMessage = () => {
    if (textInput !== '') {
      handleSendMessage();
      clearInput();
    }
  }
  return (
    <React.Fragment>
      <div className={styles.chatboxInput}>
        <div className={styles.chatInputTool}>
          <AddCircleOutlinedIcon />
          <div className={styles.imageTool}>
            <label htmlFor="input-image" className={styles.imageTool}>
              <ImageIcon />
            </label>
          </div>

          <EmojiEmotions />
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
                onChange={handleChangeInput}
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
