import Chat from '@components/Chat';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function MessagePage({ socket, chatList }) {
  const [currentChatRoom, setCurrentChatRoom] = useState(chatList[0]);
  const [conversations, setConversations] = useState(chatList);
  useEffect(() => {
    const partner = JSON.parse(localStorage.getItem('partner'));
    if(partner !== null){
        const foundChat = chatList.find(
            (chat) =>
              chat.conversationParticipants[0]?.user?.id === partner.id ||
              chat.conversationParticipants[1]?.user?.id === partner.id
          );
          if (foundChat) {
            setCurrentChatRoom(foundChat)
        }  else {
            conversations.unshift({
              conversationParticipants: [{ user: partner }],
              messages: [],
              status: 'temporary'
            });
            setConversations(chatList);
          }
    }
  }, []);

  return (
    <React.Fragment>
      <Chat
        socket={socket}
        chatList={conversations}
        currentChatRoom={currentChatRoom}
        setCurrentChatRoom={setCurrentChatRoom}
      />
    </React.Fragment>
  );
}

export async function getServerSideProps({ req }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/conversation/my-conversation`,
    {
      withCredentials: true,
      headers: {
        cookie: req.headers.cookie,
      },
    }
  );

  return {
    props: {
      chatList: res.data.conversations,
    },
  };
}
