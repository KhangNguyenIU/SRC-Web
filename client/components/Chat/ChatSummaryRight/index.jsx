import React, { useMemo } from 'react';
import styles from '@styles/ChatSummaryRight.module.scss';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatHeading from './ChatHeading';
import Gallery from './Gallery';
import ButtonTool from './ButtonTool';

export default function ChatSummary({ currentChatRoom, chatSummaryRef }) {

  const user = useSelector((state) => state.user);
  const partner = useMemo(
    () => currentChatRoom?.conversationParticipants?.length ?
      currentChatRoom?.conversationParticipants.filter(
        (part) => part.userid !== user.id
      )[0].user : null,
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

          
          <Gallery media={media} chatSummaryRef={chatSummaryRef} />

        <ButtonTool/>
          
        </React.Fragment>
      )}
    </div>
  );
}
