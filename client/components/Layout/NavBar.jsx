import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import AuthModal from '@components/Auth/AuthModal';

export default function NavBar(props) {
  let user = useSelector((state) => state.user);
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
const [ openAccountSetting, setOpenAccountSetting ] = useState(false);

  const handleOpenAuthModal = () => {setOpenAuthModal(true);};
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  const handleOpenAccountSetting = () => setOpenAccountSetting(true);
    const handleCloseAccountSetting = () => setOpenAccountSetting(false);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'center',
          fontFamily: 'Lora',
        }}
      >
        <IconButton 
        // onClick={() => props.setToggleSideBar(true)}
        onClick={()=>handleOpenAccountSetting()}
        
        >
          <MenuIcon />
        </IconButton>

        {user?.email ? (
          <UserInfo />
        ) : (
          <AuthButtons handleOpenAuthModal={handleOpenAuthModal} />
        )}

        <AuthModal open={openAuthModal} closeModal={handleCloseAuthModal} />
      </Box>
      <Menu
        anchorEl={openAccountSetting}
        open={openAccountSetting}
        id="account-menu"
        onClose={handleCloseAccountSetting}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 50,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
        }}
      > 
        <MenuItem>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const AuthButtons = ({ handleOpenAuthModal }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <span
        onClick={handleOpenAuthModal}
        style={{ cursor: 'pointer', marginRight: '2rem' }}
      >
        Sign in / Sign up
      </span>
    </Box>
  );
};

const UserInfo = () => {
  const [open, setOpen] = useState(false);
  const handleAvatarClick = () => {
    setOpen(true);
    console.log('avatar clicked');
  };
  return (
    <React.Fragment>
      <Box>
        <Tooltip title="account-setting">
        <IconButton
          aria-controls='account-menu'
          aria-haspopup="true"
          aria-expanded='true'
          onClick={handleAvatarClick}
        >
          <Avatar
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
            alt="user avatar"
            src="https://source.unsplash.com/random"
          />
        </IconButton>
        </Tooltip>
       
      </Box>

      <Menu
        anchorEl={open}
        open={open}
        id="account-menu"
        onClose={() => setOpen(false)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 50,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
        }}
      > 
        <MenuItem>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
