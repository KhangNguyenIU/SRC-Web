import React, { useMemo, useState, useRef } from 'react';
import styles from '@styles/ChatInboxMiddle.module.scss';
import ChatBoxHeader from './ChatBoxHeader';
import { useSelector } from 'react-redux';
import ChatBoxContent from './ChatBoxContent';
import ChatBoxInput from './ChatBoxInput';
import { messageType } from '@constants';
import { ChatService } from '@services/chat';

export default function ChatConversation({
  currentChatRoom,
  socket,
  updateChatList,
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

//   console.log({partner})

  const [textInput, setTextInput] = useState('');
  const [typeOfMessage, setTypeOMessage] = useState(messageType.TEXT);

  const handleSendMessage =async  () => {
    if (socket && textInput !== '') {
        let chatRoomId = currentChatRoom.id
        let messagePacket = {
            chatRoomId: chatRoomId,
            message: textInput,
            type: typeOfMessage,
            postedBy: user.id,
          };

        // check if the room is temporary room
        const partner = JSON.parse(localStorage.getItem('partner'))
        if(partner!== null){
            const newChat = await ChatService.createNewChat({chatReceiverId: partner.id})
            if(newChat.status ===200){
                chatRoomId = newChat.data.newConversation.id
                messagePacket = {
                    ...messagePacket,
                    chatRoomId: chatRoomId,
                    partner : partner.id
                }
            }
        }
   
      socket.emit('send-message', messagePacket);
      setTextInput('');
      localStorage.removeItem('partner')
    }
  };

  return (
    <React.Fragment>
      <ChatBoxHeader currentChatRoom={currentChatRoom} participant={partner} />

      <ChatBoxContent currentChatRoom={currentChatRoom} />

      <ChatBoxInput
        textInput={textInput}
        setTextInput={setTextInput}
        handleSendMessage={handleSendMessage}
        typeOfMessage={typeOfMessage}
        setTypeOMessage={setTypeOMessage}
        updateChatList={updateChatList}
      />
    </React.Fragment>
  );
}
