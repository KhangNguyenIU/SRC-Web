import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function Layout({ children, window }) {

  const [toggleSideBar, setToggleSideBar] = React.useState(false);

  return (
    <React.Fragment>
      <NavBar setToggleSideBar={setToggleSideBar} />
      <SideBar
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      {children}
    </React.Fragment>
  );
}
