import React, { useMemo, useState , useRef} from 'react';
import styles from '@styles/ChatInboxMiddle.module.scss';
import ChatBoxHeader from './ChatBoxHeader';
import { useSelector } from 'react-redux';
import ChatBoxContent from './ChatBoxContent';
import ChatBoxInput from './ChatBoxInput';
import { messageType } from '@constants';

export default function ChatConversation({ currentChatRoom , socket,updateChatList}) {
  const user = useSelector((state) => state.user);
     const chatBoxRef = useRef(null);

  const partner = useMemo(
    () =>
      currentChatRoom.conversationParticipants.filter(
        (participant, _) => participant.userid !== user.id
      )[0],
    [user, currentChatRoom]
  );


  const [textInput, setTextInput] = useState('');
  const [typeOfMessage, setTypeOMessage] = useState(messageType.TEXT);

  const handleSendMessage = () => {
      if(socket && textInput!==''){
        console.log('send message', textInput);

        const messagePacket ={
            chatRoomId: currentChatRoom.id,
            message: textInput,
            type: typeOfMessage,
            postedBy: user.id
        }

        socket.emit('send-message', messagePacket);
        setTextInput('');
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
