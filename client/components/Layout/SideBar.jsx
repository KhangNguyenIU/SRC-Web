import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';

/**
 * @author
 * @function SideBar
 **/
const listArray = ['Recruiment', 'News', 'Enrollment Project', 'Contact'];
const SideBar = (props) => {
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
        {listArray.map((text, index) => (
          <ListItem key={text}>
            <Link href={`/${text}`}>{text}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SideBar;
