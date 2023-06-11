import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import styles from '@styles/ChatGroupLeft.module.scss';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import InboxModal from './InboxModal';

export default function DirectPart({contactList,updateChatList,updateCurrentChatRoom}) {
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  return (
    <React.Fragment>
      <div className={styles.directPart}>
        <IconButton onClick={() => router.push('/')}>
          <KeyboardBackspaceIcon color="white" sx={{ color: 'white' }} />
        </IconButton>
        <Tooltip title="Start new conversation" arrow>
          <IconButton onClick={handleOpen}>
            <AddIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </div>

      <div className={styles.search}>
        <SearchIcon className={styles.icon} />
        <input type="text" placeholder="Search..." />
      </div>

      <InboxModal open={open} closeModal={handleClose} contactList={contactList} updateChatList={updateChatList} updateCurrentChatRoom={updateCurrentChatRoom}/>
    </React.Fragment>
  );
}
