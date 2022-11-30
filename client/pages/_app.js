import { Provider, useSelector } from 'react-redux'
import '../styles/globals.css'
import store from '../store/index'
import { Notification } from '@components/Common/Notification'
import Loading from '@components/Common/Loading'
import { useEffect } from 'react'
import Wrapper from '@components/Auth/Wrapper'
function MyApp({ Component, pageProps }) {


    return <Provider store={store}>
        <Wrapper>
            <Component {...pageProps} />
            <Notification />
            <Loading />
        </Wrapper>

    </Provider>

}

export default MyApp
