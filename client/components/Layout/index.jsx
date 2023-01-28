import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function Layout({ children, socket }) {
  const [toggleSideBar, setToggleSideBar] = React.useState(false);

  return (
    <React.Fragment>
      <NavBar setToggleSideBar={setToggleSideBar} socket={socket} />
      <SideBar
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      {children}
      <Footer/>
    </React.Fragment>
  );
}
