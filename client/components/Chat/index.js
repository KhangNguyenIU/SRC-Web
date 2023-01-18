
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "@styles/Chat.module.scss"
import GroupMessageList from './GroupListLeft/GroupMessageList';
import ChatConversation from './ChatInboxMiddle/ChatConversation';
import { ChatService } from '@services/chat';

export default function Chat({ socket, chatList }) {

    
    const user = useSelector(state => state.user)
    const [chatRooms, setChatRooms] = useState([...chatList]);
    const [currentChatRoom, setCurrentChatRoom] = useState(chatList[0]);
    const chatSummaryRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(chatRooms)
})
    useEffect(() => {
        if (socket && user && currentChatRoom) {
            socket.emit('identity', user.username)

            socket.emit('joinRoom',currentChatRoom.id)
        }
    }, [socket, user, currentChatRoom])

    useEffect(() => {
        if (socket) {
            socket.on('notification', (data) => {
                // console.log('new message', data)
            })

            socket.on('receive-message',async message=>{
                console.log('new message', message)
                if(message){
                    console.log('new messageasd', message)

                    const newCurConversationData = await updateChatList()
                        setCurrentChatRoom(newCurConversationData.find(item=>item.id == message.conversation.id))
                }
            })
        }
    }, [socket])

    const updateChatList = async ()=>{
        const res = await ChatService.getChatList()
        if(res.status === 200){
            setChatRooms(res.data.conversations)
            return res.data.conversations
        }
        return null
    }

    return (
        <React.Fragment>
            <div className={styles.messageWrapper}>
                <div className={styles.messageGroupLeft}>
                    <GroupMessageList
                        chatRooms={chatRooms}
                        currentChatRoom={currentChatRoom}
                        socket={socket}
                        setCurrentChatRoom={setCurrentChatRoom}
                    // getChatRooms={getChatRooms}
                    />
                </div>

                <div className={styles.messageChatboxMiddle}>
                    <ChatConversation
                        currentChatRoom={currentChatRoom}
                        socket={socket}
                        updateChatList={updateChatList}
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
