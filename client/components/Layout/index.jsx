
import React from 'react';
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
