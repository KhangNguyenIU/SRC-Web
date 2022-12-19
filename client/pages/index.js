import Landing from '@components/Landing'
import Layout from '@components/Layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from 'slices/auth/auth.slice'
import { showNotification } from 'slices/util/notification.slice'

import data from '../data'

export default function Home() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
 

    return (

        <React.Fragment>
            <Layout >
            <Landing/>
            </Layout>

        </React.Fragment>
    )
}


