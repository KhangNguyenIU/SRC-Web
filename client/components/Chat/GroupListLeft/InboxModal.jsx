import { Avatar, Box, IconButton, Modal } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from '@styles/ChatGroupLeft.module.scss';
import SearchIcon from '@mui/icons-material/Search';
export default function InboxModal({ open, closeModal, contactList ,updateChatList,updateCurrentChatRoom}) {

  const handleDirectMessage = (data) => {
    const partner = localStorage.getItem('partner')
    if(!!partner){
        localStorage.removeItem('partner')
    }
    localStorage.setItem('partner', JSON.stringify(data));
    updateChatList()
    updateCurrentChatRoom(data.id)
    closeModal()
  };


  return (
    <React.Fragment>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          <div className={styles.inboxModal}>
            <div className={styles.heading}>Inbox</div>

            <div className={styles.search}>
              <SearchIcon className={styles.icon} />
              <input type="text" placeholder="Search..." />
            </div>

            {contactList.map((contact, index) => (
              <div key={index} className={styles.contact}>
                <div className={styles.contactInfoGroup}>
                  <Avatar src={contact.avatar} alt="department" />
                  <span className={styles.contactName}>{contact.name}</span>
                </div>
                <IconButton onClick={()=>handleDirectMessage(contact.users[0])}>
                  <SendIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const modalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: [400, 500],
  height: [600, 700],
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
};
