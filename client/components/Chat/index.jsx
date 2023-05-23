import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '@styles/Chat.module.scss';

import GroupMessageList from './GroupListLeft/GroupMessageList';
import ChatConversation from './ChatInboxMiddle/ChatConversation';

import { ChatService } from '@services/chat';

export default function Chat({
  socket,
  chatList,
  currentChatRoom,
  setCurrentChatRoom,
}) {
  const user = useSelector((state) => state.user);
  const [chatRooms, setChatRooms] = useState([]);
  const chatSummaryRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setChatRooms([...chatList]);
  }, [chatList]);

  useEffect(() => {
    if (socket && currentChatRoom) {
      socket.emit('joinRoom', currentChatRoom?.id);
    }
  }, [socket, currentChatRoom]);

  useEffect(() => {
    if (socket && user?.id !== '') {
      console.log('identity', user.id);
      socket.emit('identity', user.id);
    }
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', async (message) => {
        if (message) {
          const newCurConversationData = await updateChatList();
          setCurrentChatRoom(
            newCurConversationData.find(
              (item) => item.id == message.conversation.id
            )
          );
        }
      });
    }
  }, [socket]);

  const updateChatList = async () => {
    const partner = JSON.parse(localStorage.getItem('partner'));
    let tempChatList;
    const res = await ChatService.getChatList();

    if (res.status === 200) {
      tempChatList = [...res.data.conversations];
      if (partner !== null) {
        tempChatList.splice(1, 0, {
          conversationParticipants: [{ user: partner }],
          messages: [],
          status: 'temporary',
        });
      }
      setChatRooms(tempChatList);
      return tempChatList;
    }
    return null;
  };

  return (
    <React.Fragment>
      <div className={styles.messageWrapper}>
        <div className={styles.messageGroupLeft}>
          <GroupMessageList
            chatRooms={chatRooms}
            currentChatRoom={currentChatRoom}
            socket={socket}
            setCurrentChatRoom={setCurrentChatRoom}
          />
        </div>

        <div className={styles.messageChatboxMiddle}>
          <ChatConversation
            currentChatRoom={currentChatRoom}
            socket={socket}
            updateChatList={updateChatList}
          />
        </div>

        <div className={styles.messageSummaryRight}>
          {/* <ChatSummary
                        removeRooms={removeRooms}
                        chatSummaryRef={chatSummaryRef}
                    /> */}
          right
        </div>
      </div>
    </React.Fragment>
  );
}
