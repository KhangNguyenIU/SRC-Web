import { Container } from '@mui/system';
import React from 'react';
import { DashboardNav } from './DashboardNav';
import DashboardSideNav from './DashboardSideNav';

/**
 * @author
 * @function DashboardLayout
 **/

export const DashboardLayout = ({ children }) => {
  const [toggleSideBar, setToggleSideBar] = React.useState(false);
  return (
    <React.Fragment>
      <DashboardNav setToggleSideBar={setToggleSideBar} />
      <DashboardSideNav
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      <Container>{children}</Container>
    </React.Fragment>
  );
};
