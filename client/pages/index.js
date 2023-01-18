import Landing from '@components/Landing'
import Layout from '@components/Layout'
import React from 'react'


import data from '../data'

export default function Home({ socket }) {

    return (

        <React.Fragment>
            <Layout >
                <Landing />
            </Layout>
        </React.Fragment>
    )
}


