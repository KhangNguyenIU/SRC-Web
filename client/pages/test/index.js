import Layout from '@components/Layout'
import PrivateRoute from '@components/Dashboard/Layout/PrivateRoute'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function index() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    return (
        <PrivateRoute>
            <Layout>
                Test
            </Layout>
        </PrivateRoute>

    )
}
