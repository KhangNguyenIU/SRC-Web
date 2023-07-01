import React, { useEffect } from 'react';
import styles from '@styles/ChatGroupLeft.module.scss';
import { Avatar, Badge } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { messageType } from 'constants';
import { textLengthCut } from 'utils';
import { db } from 'firebaseConfig';
import { ref, update } from 'firebase/database';

export default function GroupMessage({ conversation, setCurrentChatRoom }) {
  const user = useSelector((state) => state.user);
  const unreadMess = useSelector((state) => state.unreadMess);
  const partner = useMemo(
    () =>
      conversation.conversationParticipants.filter(
        (participant, _) => participant.userid !== user.id
      )[0],
    [user, conversation]
  );

  const isUnread = useMemo(
    () => !!unreadMess.unReadCons[`con_${conversation.id}`],
    [unreadMess]
  );

  const handleChatRoomClick = (conversation) => {
    setCurrentChatRoom(conversation);
    if (isUnread && db && user?.id) {
      update(ref(db, `unread_messages/user_${user?.id}`), {
        [`con_${conversation.id}`]: 0,
      });
    }
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div
          className={`${styles.groupChatWrapper} ${
            isUnread && styles.isNotReaded
          }`}
          onClick={() => handleChatRoomClick(conversation)}
        >
          <Badge color="secondary" variant="dot" >
            <Avatar src={partner.user.avatar} />
          </Badge>
          <div className={styles.groupInfo}>
            <div className={styles.groupName}>
              <span className={styles.nameText}>{partner?.user?.username}</span>

              <span className={styles.timeText}>
                {!!conversation.messages.length &&
                  moment(conversation?.messages[0]?.created_at).fromNow()}
              </span>
            </div>

            {/**
             * Display message
             */}

            <div className={styles.groupLastMessage}>
              <div>
                {!!conversation.messages.length &&
                  (conversation?.messages[conversation?.messages.length - 1]
                    ?.type == messageType.IMAGE ? (
                    <span>[ Image ]</span>
                  ) : (
                    textLengthCut(
                      conversation?.messages[conversation?.messages.length - 1]
                        ?.content,
                      60
                    )
                  ))}
              </div>
              {!!unreadMess.unReadCons[`con_${conversation.id}`] && (
                <span className={styles.unreadNum}>
                  {unreadMess.unReadCons[`con_${conversation.id}`]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
