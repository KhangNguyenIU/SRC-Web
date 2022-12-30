import React, { useMemo, useState } from 'react';
import styles from '@styles/ChatInboxMiddle.module.scss';
import ChatBoxHeader from './ChatBoxHeader';
import { useSelector } from 'react-redux';
import ChatBoxContent from './ChatBoxContent';
import ChatBoxInput from './ChatBoxInput';
import { messageType } from 'constants';

export default function ChatConversation({ currentChatRoom }) {
  const user = useSelector((state) => state.user);
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
    console.log('send message', textInput);
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
      />
    </React.Fragment>
  );
}
