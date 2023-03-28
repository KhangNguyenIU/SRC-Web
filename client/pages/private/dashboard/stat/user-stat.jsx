import { DashboardLayout } from '@components/Dashboard/Layout';
import { UserStat } from '@components/Dashboard/Stats/UserStat';
import { DashboardService } from '@services/dashboard';
import React from 'react';

/**
 * @author
 * @function UserStatPage
 **/

export default function UserStatPage({ userStats }) {
  return (
    <React.Fragment>
      <DashboardLayout>
        <UserStat data={userStats} />
      </DashboardLayout>
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
