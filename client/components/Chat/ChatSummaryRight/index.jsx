import React, { useMemo, useState } from 'react';
import styles from '@styles/ChatSummaryRight.module.scss';
import { useSelector } from 'react-redux';
import ChatHeading from './ChatHeading';
import Gallery from './Gallery';
import ButtonTool from './ButtonTool';
import { Box, ImageList, ImageListItem, Modal } from '@mui/material';

export default function ChatSummary({ currentChatRoom, chatSummaryRef }) {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {!!media.length && setOpen(true)};
  const handleClose = () => setOpen(false);
  const partner = useMemo(
    () =>
      currentChatRoom?.conversationParticipants?.length
        ? currentChatRoom?.conversationParticipants.filter(
            (part) => part.userid !== user.id
          )[0].user
        : null,
    [currentChatRoom]
  );
  const media = useMemo(
    () => currentChatRoom?.messages?.filter((msg) => msg.type === 'image'),
    [currentChatRoom]
  );

  return (
    <div className={styles.wrapper}>
      {!!partner && (
        <React.Fragment>
          <ChatHeading partner={partner} />

          <Gallery
            media={media}
            chatSummaryRef={chatSummaryRef}
            openModal={handleOpen}
          />

          <ButtonTool />

          {!!media.length && (
            <Modal
              open={open}
              onClose={handleClose}
              styles={{ padding: '0px' }}
            >
              <Box sx={modalBox}>
                <ImageList variant="masonry" cols={2} gap={8}>
                  {media.map((img, index) => (
                    <ImageListItem key={index}>
                      <img src={img.content} loading="lazy" alt="review" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Modal>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

const modalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ['100%', 600, 800, 1000],
  height: [800, 600],
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  outline:'none'
};
