import React from 'react';
import styles from '@styles/ChatGroupLeft.module.scss';
import GroupMessage from './GroupMessage';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import DirectPart from './DirectPart';
            
export default function GroupMessageList({ chatRooms, setCurrentChatRoom ,contactList,updateChatList,updateCurrentChatRoom}) {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className={styles.leftWrapper}>
        <div className={styles.groupList}>

          <DirectPart contactList={contactList} updateChatList={updateChatList} updateCurrentChatRoom={updateCurrentChatRoom}/>

          <div className={styles.list}>
            {!!chatRooms.length &&
              chatRooms.map((room, index) => (
                <GroupMessage
                  key={index}
                  conversation={room}
                  setCurrentChatRoom={setCurrentChatRoom}
                />
              ))}
          </div>


        </div>
      </div>
    </React.Fragment>
  );
}
