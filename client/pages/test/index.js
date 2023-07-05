import Layout from '@components/Layout'
import PrivateRoute from '@components/Dashboard/Layout/PrivateRoute'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from 'firebaseConfig'
import { set, ref, onValue, remove, update } from "firebase/database";
import authService from '@services/auth/auth'
import axios from 'axios'
import { setSound } from 'slices/util/sound.slice'


export default function index() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const unreadMess = useSelector(state => state.unreadMess)
    const [value, setValue] = useState("")



    const write = () => {
        console.log("Set Sound")
        dispatch(setSound({ sound: "/sound/typing.mp3" }))
    }
    return (
        <Layout>
            <React.Fragment>
                <div style={{ height: '100vh', padding: '5rem' }}>
                    Test
                    <button onClick={write}>sound</button>
                    <input value={value} onChange={e => setValue(e.target.value)} />
                </div>

            </React.Fragment>

        // </Layout>

    )
}


