import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Badge,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AuthModal from '@components/Auth/AuthModal';
import { logout } from 'slices/auth/auth.slice';
import useDebounce from '@hooks/useDebounce';
import PostService from '@services/post';
import { useRouter } from 'next/router';

export default function NavBar(props) {
  let user = useSelector((state) => state.user);
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [search, setSearch] = useState('');
  const [listPost, setListPost] = useState([]);
    const router = useRouter()

  const handleOpenAuthModal = () => {
    setOpenAuthModal(true);
  };
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  useDebounce(() => handleGetListPost, 1000, [search]);

  const handleGetListPost = async () => {
    const res = await PostService().getListPost({ search: search });
    if (res.status === 200 && !!res.data.posts.length) {
      setListPost(res.data.posts);
    }
  };


  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'center',
          fontFamily: 'Lora',
          zIndex: 99,
          position: 'fixed',
        }}
      >
        <IconButton onClick={() => props.setToggleSideBar(true)}>
          <MenuIcon />
        </IconButton>

        {/* <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon />
          <TextField
            id="standard-basic"
            // label="Search"
            variant="standard"
            sx={{ width: ['100px', '200px'] }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}
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
    const router = useRouter()
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
        <IconButton onClick={()=>router.push('/private/message')}>
          <Badge badgeContent={0} color="error">
            <SvgIcon
              viewBox="0 0 24 24"
           
              sx={{fontSize: '2rem'}}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M7.764 19.225c.59-.26 1.25-.309 1.868-.139.77.21 1.565.316 2.368.314 4.585 0 8-3.287 8-7.7S16.585 4 12 4s-8 3.287-8 7.7c0 2.27.896 4.272 2.466 5.676a2.8 2.8 0 01.942 2.006l.356-.157zM12 2c5.634 0 10 4.127 10 9.7 0 5.573-4.366 9.7-10 9.7a10.894 10.894 0 01-2.895-.384.8.8 0 00-.534.039l-1.984.876a.8.8 0 01-1.123-.707l-.055-1.78a.797.797 0 00-.268-.57C3.195 17.135 2 14.617 2 11.7 2 6.127 6.367 2 12 2zM5.995 14.537l2.937-4.66a1.5 1.5 0 012.17-.4l2.336 1.75a.6.6 0 00.723 0l3.155-2.396c.421-.319.971.185.689.633l-2.937 4.66a1.5 1.5 0 01-2.17.4l-2.336-1.75a.6.6 0 00-.723 0l-3.155 2.395c-.421.319-.971-.185-.689-.633z" />
            </SvgIcon>
          </Badge>
        </IconButton>

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
