import Layout from '@components/Layout'
import HollandQuiz from '@components/Major/HollandQuiz'
import React from 'react'

export default function MajorByCharacteristicsPage() {
  return (
    <React.Fragment>
        <Layout>
            <HollandQuiz/>
        </Layout>
    </React.Fragment>
  )
}
