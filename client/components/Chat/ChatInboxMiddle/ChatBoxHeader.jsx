import React from 'react';
import styles from '@styles/ChatInboxMiddle.module.scss';
import { Avatar, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function ChatBoxHeader({ currentChatRoom, participant }) {
  return (
    <React.Fragment>
      <div className={styles.chatboxHeader}>
        <div className={styles.chatboxHeaderInfo}>
          <Badge color="secondary" variant="dot">
            <Avatar src={participant?.user?.avatar} alt={'user'}></Avatar>
          </Badge>
          <div className={styles.groupHeaderInfo}>
            <span className={styles.groupName}>
              {participant?.user?.username}
            </span>
            {/* <span className={styles.groupMemberNumbers}>1 members</span> */}
          </div>
        </div>

        <div className={styles.chatboxToolInfo}>
          <SearchIcon />
          <MoreHorizIcon />
        </div>
      </div>
    </React.Fragment>
  );
}
