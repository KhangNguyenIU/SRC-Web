import Chat from '@components/Chat';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ChatService } from '../../../services/chat';
import useSWR from 'swr';
import { ContactService } from '@services/contact';
import { useDispatch } from 'react-redux';
import { setLoading, stopLoading } from 'slices/util/loading.slice';
import { loadingType } from '@constants';
import Loading from '@components/Common/Loading';

const conversationsFetch = (url) =>
  ChatService.getChatList().then((res) => res.data.conversations);
const contactFetch = (url) =>
  ContactService.getContacts().then((res) => res.data);
export default function MessagePage({ socket }) {
    const dispatch = useDispatch();
  const {
    data: chatList,
    error: chatError,
    isLoading: consLoading,
  } = useSWR('fetch/conversations', conversationsFetch);

  const {
    data: contactList,
    error: contactError,
    isLoading: contactLoading,
  } = useSWR('fetch/faculty', contactFetch);

  if(consLoading || contactLoading){
    dispatch(setLoading({type:loadingType.MESSAGE}))
  }else
    dispatch(stopLoading())
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!!contactList?.length && contactList !== undefined && !contactLoading) {
      setContacts(contactList);
    }
  }, [contactList]);
  useEffect(() => {
    if (!!chatList?.length && chatList !== undefined && !consLoading) {
      setConversations(chatList);
      setCurrentChatRoom(chatList[0]);
    }
  }, [chatList]);

  useEffect(() => {
    const partner = JSON.parse(localStorage.getItem('partner'));
    if (partner !== null && chatList !== undefined && !consLoading) {
      const foundChat = chatList.find(
        (chat) =>
          chat.conversationParticipants[0]?.user?.id === partner.id ||
          chat.conversationParticipants[1]?.user?.id === partner.id
      );
      if (foundChat) {
        setCurrentChatRoom(foundChat);
      } else {
        conversations.unshift({
          conversationParticipants: [{ user: partner }],
          messages: [],
          status: 'temporary',
        });
        setConversations(chatList);
      }
    }
  }, [chatList]);
  console.log({ conversations, currentChatRoom, chatList });
  return (
    <React.Fragment>
      <Chat
        socket={socket}
        chatList={conversations}
        currentChatRoom={currentChatRoom}
        setCurrentChatRoom={setCurrentChatRoom}
        contactList={contacts}
      />

      <Loading type={loadingType.MESSAGE}/>
    </React.Fragment>
  );
}

// export async function getServerSideProps({ req }) {
//   const conversationData = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/conversation/my-conversation`,
//     {
//       withCredentials: true,
//       headers: {
//         cookie: req.headers.cookie,
//       },
//     }
//   );

//   const contactData = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/faculty`,)

//   return {
//     props: {
//       chatList: conversationData.data.conversations,
//         contactList: contactData.data
//     },
//   };
// }
