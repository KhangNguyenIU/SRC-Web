import Layout from '@components/Layout'
import PrivateRoute from '@components/Dashboard/Layout/PrivateRoute'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from 'firebaseConfig'
import { set, ref, onValue, remove, update } from "firebase/database";
import authService from '@services/auth/auth'
import axios from 'axios'


export default function index({res}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const unreadMess = useSelector(state => state.unreadMess)
    const [value, setValue] = useState("")

    console.log({res})


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


export async function getServerSideProps(context) {

  const cookie = context.req.headers.cookie
  console.log({ cookie, header: context.req.headers })

    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`,{},{
        withCredentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
             Cookie: context.req.headers.cookie
        }
    })
    console.log({ res })
  return {
    props: {
      res:res
    },
  };
}
