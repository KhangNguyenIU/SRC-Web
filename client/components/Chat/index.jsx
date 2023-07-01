import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '@styles/Chat.module.scss';

import GroupMessageList from './GroupListLeft/GroupMessageList';
import ChatConversation from './ChatInboxMiddle/ChatConversation';
import ChatSummary from './ChatSummaryRight';

import { ChatService } from '@services/chat';

import { addObjectToUniqueArray } from 'utils';

export default function Chat({
  socket,
  chatList,
  currentChatRoom,
  setCurrentChatRoom,
  contactList,
}) {
  const user = useSelector((state) => state.user);
  const [chatRooms, setChatRooms] = useState([]);
  const chatSummaryRef = useRef(null);
  const dispatch = useDispatch();
  const [isTypingList, setIsTypingList] = useState([]);

  useEffect(() => {
    setChatRooms([...chatList]);
    setIsTypingList([]);
  }, [chatList]);

  useEffect(() => {
    if (socket && currentChatRoom) {
      socket.emit('joinRoom', currentChatRoom?.id);
    }
  }, [socket, currentChatRoom]);

  useEffect(() => {
    if (socket && user?.id !== '') {
      socket.emit('identity', user.id);

      socket.on('user-typing', (fields) => {
        const { user: typingUser, isTyping } = fields;
        if (typingUser.id !== user.id) {
          setIsTypingList([
            ...addObjectToUniqueArray(isTypingList, typingUser, isTyping),
          ]);
        }
      });
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

  const updateCurrentChatRoom = (roomId) => {
    setCurrentChatRoom(
      chatRooms.find(
        (item) =>
          item.conversationParticipants[0]?.user?.id == roomId ||
          item.conversationParticipants[1]?.user?.is == roomId
      ) || chatRooms[0]
    );
  };

  const updateChatList = async (callback, roomId) => {
    const partner = JSON.parse(localStorage.getItem('partner'));
    let tempChatList;
    const res = await ChatService.getChatList();

    if (res.status === 200) {
      tempChatList = [...res.data.conversations];

      // find existed conversation
      const bol = !tempChatList.some((con) =>
        con.conversationParticipants.every(
          (part) => part?.userid === partner?.id || part?.userid === user.id
        )
      );

      // if not exist, create new temporary conversation
      if (partner !== null && bol) {
        tempChatList.splice(0, 0, {
          conversationParticipants: [{ user: partner }],
          messages: [],
          status: 'temporary',
        });
      }
      setChatRooms(tempChatList);
      if (!!callback && typeof callback === 'function') callback();
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
            contactList={contactList}
            updateChatList={updateChatList}
            updateCurrentChatRoom={updateCurrentChatRoom}
          />
        </div>

        <div className={styles.messageChatboxMiddle}>
          <ChatConversation
            isTypingList={isTypingList}
            currentChatRoom={currentChatRoom}
            socket={socket}
            updateChatList={updateChatList}
          />
        </div>

        <div className={styles.messageSummaryRight} ref={chatSummaryRef}>
          <ChatSummary
            currentChatRoom={currentChatRoom}
            chatSummaryRef={chatSummaryRef}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
