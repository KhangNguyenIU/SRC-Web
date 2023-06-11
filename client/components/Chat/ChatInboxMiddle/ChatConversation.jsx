import React, { useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxContent from './ChatBoxContent';
import ChatBoxInput from './ChatBoxInput';

import { messageType } from '@constants';
import { ChatService } from '@services/chat';

export default function ChatConversation({
  currentChatRoom,
  socket,
  updateChatList,
  isTypingList
}) {
  const user = useSelector((state) => state.user);
  const chatBoxRef = useRef(null);

  const partner = useMemo(
    () =>
      currentChatRoom?.conversationParticipants?.filter(
        (participant, _) => participant.userid !== user.id
      )[0],
    [user, currentChatRoom]
  );

  const [textInput, setTextInput] = useState('');
  const [typeOfMessage, setTypeOfMessage] = useState(messageType.TEXT);

  const handleSendMessage = async () => {
    if (socket && textInput !== '') {
      let chatRoomId = currentChatRoom.id;
      let messagePacket = {
        chatRoomId: chatRoomId,
        message: textInput,
        type: typeOfMessage,
        postedBy: user.id,
      };
      // check if the room is temporary room
      const partner = JSON.parse(localStorage.getItem('partner'));

      if (
        partner !== null &&
        !currentChatRoom.conversationParticipants.some(
          (part) => part.userid === partner?.id
        ) &&
        currentChatRoom.status === 'temporary'
      ) {
        const newChat = await ChatService.createNewChat({
          chatReceiverId: partner.id,
        });
        if (newChat.status === 200) {
          chatRoomId = newChat.data.newConversation.id;
          messagePacket = {
            ...messagePacket,
            chatRoomId: chatRoomId,
            partner: partner.id,
          };
        }
        localStorage.removeItem('partner');
      }
      socket.emit('send-message', messagePacket);
      socket.emit('user-stop-typing', { chatRoomId: currentChatRoom.id, user: user });
      setTextInput('');
    }
  };

  return (
    <React.Fragment>
      <ChatBoxHeader currentChatRoom={currentChatRoom} participant={partner} />

      <ChatBoxContent currentChatRoom={currentChatRoom} isTypingList={isTypingList} />

      <ChatBoxInput
        textInput={textInput}
        setTextInput={setTextInput}
        handleSendMessage={handleSendMessage}
        typeOfMessage={typeOfMessage}
        setTypeOfMessage={setTypeOfMessage}
        updateChatList={updateChatList}
        socket={socket}
        currentChatRoom={currentChatRoom} 
      />
    </React.Fragment>
  );
}
