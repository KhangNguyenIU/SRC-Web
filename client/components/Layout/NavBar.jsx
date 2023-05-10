import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AuthModal from '@components/Auth/AuthModal';
import { logout } from 'slices/auth/auth.slice';
import useDebounce from '@hooks/useDebounce';
import PostService from '@services/post';

export default function NavBar(props) {
  let user = useSelector((state) => state.user);
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [search, setSearch] = useState('');
    const [listPost, setListPost] = useState([]);
  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  useDebounce(()=>handleGetListPost,1000,[search])

  const  handleGetListPost =async()=>{
    // console.log('debounde')
    const res = await PostService().getListPost({search:search});
    if(res.status ===200 && !!res.data.posts.length){
        setListPost(res.data.posts)
    }
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'center',
          fontFamily: 'Lora',
          //   position: 'fixed',
          zIndex: 1,
        }}
      >
        <IconButton onClick={() => props.setToggleSideBar(true)}>
          <MenuIcon />
        </IconButton>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon />
          <TextField
            id="standard-basic"
            // label="Search"
            variant="standard"
            sx={{ width: ['100px', '200px'] }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {user?.email ? (
          <UserInfo socket={props.socket} />
        ) : (
          <AuthButtons handleOpenAuthModal={handleOpenAuthModal} />
        )}

        <AuthModal open={openAuthModal} closeModal={handleCloseAuthModal} />
      </Box>
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

const UserInfo = ({ socket }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSignout = () => {
    if (socket) {
      socket.disconnect();
    }
    dispatch(logout({ callback: handleClose }));
  };

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box>
        <IconButton
          aria-controls="account-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleAvatarClick}
        >
          <Avatar
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
            alt="user avatar"
            src={user?.avatar}
          />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        id="account-menu"
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
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
              top: 0,
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            padding: '1rem 0',
          }}
        >
          <IconButton>
            <Avatar
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              alt="user avatar"
              src={user?.avatar}
            />
          </IconButton>
          <span style={{ marginTop: '1rem' }}>{user?.email}</span>
        </Box>
        <Divider />
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={onSignout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
