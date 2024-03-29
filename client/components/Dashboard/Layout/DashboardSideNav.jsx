import { Drawer, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

/**
 * @author
 * @function DashboardSideNav
 **/

const navItems = [
  { item: 'Home', link: '/' },
  { item: 'Create Post', link: '/private/dashboard/create-post' },
  { item: 'News', link: '/news' },
  { item: 'Enrollment Project', link: '/enrollment-project' },
  { item: 'Contact', link: '/contact' },
  { item: 'User Stat', link :' /private/dashboard/stat/user-stat' },
];

 const DashboardSideNav = (props) => {
  const closeBar = () => props.setToggleSideBar(false);
  return (
    <React.Fragment>
      <Drawer anchor="left" open={props.toggleSideBar} onClose={closeBar}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

const list = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      role="presentation"
    >
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index}>
            <Link href={`${item.link}`}>{item.item}</Link>
          </ListItem>
        ))}

        {/* {user?.role === 'admin' && (
          <ListItem key="admin">
            <Link href="/private/dashboard">Dashboard</Link>
          </ListItem>
        )} */}
      </List>
    </Box>
  );
};
export default DashboardSideNav;
