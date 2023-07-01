import Layout from '@components/Layout'
import PrivateRoute from '@components/Dashboard/Layout/PrivateRoute'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from 'firebaseConfig'
import { set, ref, onValue, remove, update } from "firebase/database";


export default function index() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const unreadMess = useSelector(state => state.unreadMess)
    const [value, setValue] = useState("")




    // console.log({unreadMess })
    // useEffect(()=>{
    //     onValue(ref(db, '/user'), (snapshot) => {
    //         const res = snapshot.val()
    //         if(res!==null){
    //             console.log({res})
    //         }
    //         console.log({res})
    //     })
    // })

    const write = () => {
        console.log("write")
        set(ref(db, '/user'), { name: value, age: 20 })
    }
    return (
        <Layout>
            <React.Fragment>
                <div style={{ height: '100vh', padding: '5rem' }}>
                    Test
                    <button onClick={write}>write</button>
                    <input value={value} onChange={e => setValue(e.target.value)} />
                </div>

            </React.Fragment>

        // </Layout>

    )
}
