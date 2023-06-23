import Layout from '@components/Layout';
import TitleLayout from '@components/Layout/TitleLayout';
import Grades from '@components/Major/Grades';
import React from 'react';

export default function MarjorByGradePage() {
  return (
    <React.Fragment>
      <Layout>
        <TitleLayout h2="Major Suggest" h1="High School Test Grades">
          <Grades />
        </TitleLayout>
      </Layout>
    </React.Fragment>
  );
}
