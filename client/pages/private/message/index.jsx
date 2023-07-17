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
import axios from 'axios';

export default function MessagePage({ socket }) {
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await ChatService.getChatList();
        setChatList(res.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatList();

    const fetchContactList = async () => {
        try {
            const res = await ContactService.getContacts();
            console.log("contact list",res.data)
            setContactList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    fetchContactList()
  }, []);

  useEffect(() => {
    const partner = JSON.parse(localStorage.getItem('partner'));
    console.log({ partner, chatList })
    if (partner !== null && chatList !== undefined) {
      const foundChat = chatList.find(
        (chat) =>
          chat.conversationParticipants[0]?.user?.id === partner.id ||
          chat.conversationParticipants[1]?.user?.id === partner.id
      );
      if (foundChat) {
        console.log("IF")
        setCurrentChatRoom(foundChat);
      } else {
        console.log("ELSE")
        chatList.unshift({
          conversationParticipants: [{ user: partner }],
          messages: [],
          status: 'temporary',
        });
        setChatList([...chatList])
        setCurrentChatRoom(chatList[0]);
      }
    }
  }, [chatList]);
  //   console.log({ chatList, currentChatRoom, chatList });
  return (
    <React.Fragment>
      <Chat
        socket={socket}
        chatList={chatList}
        currentChatRoom={currentChatRoom}
        setCurrentChatRoom={setCurrentChatRoom}
        contactList={contactList}
      />

      <Loading type={loadingType.MESSAGE} />
    </React.Fragment>
  );
}

// export async function getServerSideProps({ req }) {  const cookie = req.headers.cookie;
//     console.log({ cookie })
//     const conversationData = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/conversation/my-conversation`,
//       {
//         // withCredentials: true,
//         headers: {
//           cookie: req.headers.cookie,
//           'Accept': '*/*',
//           'Access-Control-Allow-Origin': '*',
//           'Content-Type': 'application/json',
//         },
//       }
//     );

// //   const conversationData = await ChatService.getChatList(cookie);

//   const contactData = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/faculty`
//   );

//   return {
//     props: {
//       chatList: conversationData.data.conversations,
//       contactList: contactData.data,
//     },
//   };
// }
