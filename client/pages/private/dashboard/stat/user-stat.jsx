import { UserStat } from '@components/Dashboard/Stats/UserStat';
import Layout from '@components/Layout';
import TitleLayout from '@components/Layout/TitleLayout';
import { DashboardService } from '@services/dashboard';
import React from 'react';

/**
 * @author
 * @function UserStatPage
 **/

export default function UserStatPage({ userStats }) {
  return (
    <React.Fragment>
      <Layout>
        <TitleLayout h2="Dashboard" h1="User Stattistics">
        <UserStat data={userStats} />

        </TitleLayout>
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  const res = await DashboardService.getUserStats();

  return {
    props: {
      userStats: res.data,
    },
  };
}
