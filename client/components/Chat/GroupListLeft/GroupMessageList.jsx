import React from 'react'
import styles from "@styles/ChatGroupLeft.module.scss"
import GroupMessage from './GroupMessage'


export default function GroupMessageList({chatRooms, setCurrentChatRoom}) {

  return (
    <React.Fragment>
        <div className={styles.leftWrapper}>
            <div className={styles.groupList}>
                <div className={styles.list}>
                    {
                        !!chatRooms.length && chatRooms.map((room, index) => (
                            <GroupMessage 
                            key={index}
                            conversation={room}
                            setCurrentChatRoom={setCurrentChatRoom}
                            />

                        ))
                    }
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}
