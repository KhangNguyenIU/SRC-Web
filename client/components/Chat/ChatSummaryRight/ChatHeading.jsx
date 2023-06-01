import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import styles from '@styles/ChatSummaryRight.module.scss';
import { Avatar } from '@mui/material';

export default function ChatHeading({ partner }) {
  return (
    <div className={styles.infor}>
      <Avatar
        src={partner?.avatar}
        alt={partner.usernamr}
        sx={{ width: 96, height: 96 }}
      />
      <span className={styles.username}>@{partner.username}</span>

      <div className={styles.buttons}>
        <div>
          <NotificationsNoneOutlinedIcon />
        </div>

        <div>
          <GroupAddOutlinedIcon />
        </div>

        <div>
          <InfoOutlinedIcon />
        </div>

        <div>
          <LogoutOutlinedIcon />
        </div>
      </div>
    </div>
  );
}
