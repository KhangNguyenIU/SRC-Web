import Chat from '@components/Chat';
import Layout from '@components/Layout';
import { ChatService } from '@services/chat';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import styles from "@styles/Chat.module.scss"


export default function MessagePage({socket, chatList}) {

  return (
    <React.Fragment>
        <Chat socket={socket} chatList={chatList} />
    </React.Fragment>
  );
}


export async function getServerSideProps({req}){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/conversation/my-conversation`, {
        withCredentials: true,
        headers: {
            cookie: req.headers.cookie
        }
    })

    return {
        props: {
            chatList: res.data.conversations

        }
    }
}