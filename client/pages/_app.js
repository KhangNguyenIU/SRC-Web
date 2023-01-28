import { Provider, useDispatch, useSelector } from 'react-redux'
import '../styles/globals.css'
import store from '../store/index'
import { Notification } from '@components/Common/Notification'
import Loading from '@components/Common/Loading'
import { useEffect, useState } from 'react'
import Wrapper from '@components/Auth/Wrapper'
import io from 'socket.io-client'

function MyApp({ Component, pageProps }) {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
            const connectionOptions = {
                "force new connection": true,
                reconnectionAttempts: "Infinity",
                timeout: 10000,
                transports: ["websocket"],
            };
            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, connectionOptions);
            setSocket(newSocket);
    }, [])

    return <Provider store={store}>
        <Wrapper >
            <Component {...pageProps} socket={socket} />
            <Notification />
            <Loading />
        </Wrapper>

    </Provider>

}

export default MyApp
