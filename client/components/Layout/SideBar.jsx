import { Avatar, Divider, Drawer } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { adminItems, navItems, privateItems } from 'utils';
import styles from '@styles/Layout/Sidebar.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
/**
 * @author
 * @function SideBar
 **/

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
  const user = useSelector((state) => state.user);
  return (
    <div className={styles.wrapper}>
      {!!user.username && (
        <div className={styles.logo}>
          <Avatar src={user.avatar} sx={{ width: 56, height: 56 }} />
          <p>Welcome back,</p>
          <span>{user.username}</span>
        </div>
      )}

      <div className={styles.tool}>
        {navItems.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.icon}
            <span>
              <Link href={item.link}>{item.item}</Link>
            </span>
          </div>
        ))}
      </div>
      {/* <Divider /> */}
      <div className={styles.staff}>
        <div className={styles.title}>
          <span>Functionalities</span>
          <ExpandMoreIcon />
        </div>
        {['admin', 'staff','user'].includes(user.role) &&
          privateItems.map((item, index) => (
            <div key={index} className={styles.item}>
              {item.icon}
              <span>
                <Link href={item.link}>{item.item}</Link>
              </span>
            </div>
          ))}
      </div>
      {/* <Divider /> */}

      <div className={styles.admin}>
        <div className={styles.title}>
          <span>Mainboard</span>
          <ExpandMoreIcon />
        </div>
        {['admin'].includes(user.role) &&
          adminItems.map((item, index) => (
            <div key={index} className={styles.item}>
              {item.icon}
              <span>
                <Link href={item.link}>{item.item}</Link>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SideBar;
