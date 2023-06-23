import Layout from '@components/Layout';
import TitleLayout from '@components/Layout/TitleLayout';
import HollandQuiz from '@components/Major/HollandQuiz';
import React from 'react';

export default function MajorByCharacteristicsPage() {
  return (
    <React.Fragment>
      <Layout>
        <TitleLayout h2="Major Suggest" h1="Characteristics Test">
          <HollandQuiz />
        </TitleLayout>
      </Layout>
    </React.Fragment>
  );
}
