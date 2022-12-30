
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "@styles/Chat.module.scss"
import GroupMessageList from './GroupListLeft/GroupMessageList';
import ChatConversation from './ChatInboxMiddle/ChatConversation';

export default function Chat({ socket, chatList }) {

    const user = useSelector(state => state.user)
    const [chatRooms, setChatRooms] = useState([]);
    const [currentChatRoom, setCurrentChatRoom] = useState(chatList[0]);
    const chatSummaryRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket && user) {
            socket.emit('identity', user.username)
        }
    }, [socket, user])

    useEffect(() => {
        
    }, [currentChatRoom])

    return (
        <React.Fragment>
            <div className={styles.messageWrapper}>
                <div className={styles.messageGroupLeft}>
                    <GroupMessageList
                        chatRooms={chatList}
                        currentChatRoom={currentChatRoom}
                        socket={socket}
                        setCurrentChatRoom={setCurrentChatRoom}
                    // getChatRooms={getChatRooms}
                    />
                </div>

                <div className={styles.messageChatboxMiddle}>
                    <ChatConversation
                        currentChatRoom={currentChatRoom}
                    />
                </div>

                <div className={styles.messageSummaryRight} >
                    {/* <ChatSummary
                        removeRooms={removeRooms}
                        chatSummaryRef={chatSummaryRef}
                    /> */}
                    right
                </div>
            </div>
        </React.Fragment>
    )
}
