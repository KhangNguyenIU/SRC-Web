import Landing from '@components/Landing'
import Layout from '@components/Layout'
import FeedbackService from '@services/feedback'
import React, { useEffect } from 'react'

export default function Home({ socket, feedbacks }) {
    return (
        <React.Fragment>
            <Layout >
                <Landing feedbacks={feedbacks}  />
            </Layout>
        </React.Fragment>
    )
}

export async function getServerSideProps({ req }) {

    // Get all feedbacks
    const res = await FeedbackService.getFeedbacks()
    const feedbacks = res.data.feedbacks

    return {
        props: {
            feedbacks
        },
    }
}

