import React from 'react';
import styles from '@styles/ChatGroupLeft.module.scss';
import { Avatar } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function GroupMessage({ conversation, setCurrentChatRoom }) {

  const user = useSelector((state) => state.user);
  const partner = useMemo(
    () =>
      conversation.conversationParticipants.filter(
        (participant, _) => participant.userid !== user.id
      )[0],
    [user, conversation]
  );

  const handleChatRoomClick =(conversation)=>{
    setCurrentChatRoom(conversation)
  }

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div 
        className={`${styles.groupChatWrapper} `}
        onClick={()=>handleChatRoomClick(conversation)}
        >
          <Avatar src={partner.user.avatar}/>
          <div className={styles.groupInfo}>
            <div className={styles.groupName}>
              <span className={styles.nameText}>{partner?.user?.username}</span>
            </div>

            {/**
             * Display message
             */}

            <div className={styles.groupLastMessage}>
              <div>
                {!!conversation.messages.length &&
                  conversation?.messages[0]?.content}
              </div>

              <span className={styles.timeText}>
                {!!conversation.messages.length &&
                  moment(conversation?.messages[0]?.created_at).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
