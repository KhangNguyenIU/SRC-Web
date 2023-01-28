import { MenuItem, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from '@styles/Auth.module.scss';
import { useDispatch } from 'react-redux';
import { signinUser } from 'slices/auth/auth.slice';
import data from 'data';
import { useState } from 'react';

const modalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  // border: '0px'
};

const titleStyle = {
  fontSize: '2rem',
  fontFamily: 'Lora',
  marginBottom: '2rem',
  fontWeight: '500',
};

export default function AuthModal({ open, closeModal }) {
  const dispatch = useDispatch();

  const [authOptions, setAuthOptions] = useState({
    user: data.signin.user[0].email,
    staff: data.signin.staff[0].email,
    admin: data.signin.admin.email,
  });

  const handleAuthSigninOptions = (e) => {
    let option = e.target.attributes.getNamedItem('data-tag').value;
    if (!option) return;

    switch (option) {
      case 'guest':
        dispatch(signinUser({ body: {email:authOptions.user, password:'123456'}, callback: closeModal }));
        break;
      case 'staff':
        dispatch(signinUser({ body: {email:authOptions.staff, password:'123456'}, callback: closeModal }));
        break;
      case 'admin':
        dispatch(signinUser({ body: {email:authOptions.admin, password:'123456'}, callback: closeModal }));
        break;
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          <h2 id="modal-modal-title" style={titleStyle}>
            Sign in
          </h2>
          <div style={{width:'100%'}}>
          <TextField
            select
            label="select"
            value={authOptions.user}
            fullWidth

            onChange={(e) =>
              setAuthOptions({ ...authOptions, user: e.target.value })
            }
          >
            {data.signin.user.map((user, i) => (
              <MenuItem key={i} value={user.email}>
                {user.firstName}
              </MenuItem>
            ))}
          </TextField>
            </div>

  
          <div
            className={styles.authButton}
            data-tag="guest"
            onClick={handleAuthSigninOptions}
          >
            Sign in as a guest
          </div>



          <div style={{width:'100%'}}>
          <TextField
            select
            label="select"
            value={authOptions.staff}
            onChange={(e) =>
              setAuthOptions({ ...authOptions, staff: e.target.value })
            }
            fullWidth
          >
            {data.signin.staff.map((user, i) => (
              <MenuItem key={i} value={user.email}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>
            </div>


          <div
            className={styles.authButton}
            data-tag="staff"
            onClick={handleAuthSigninOptions}
          >
            Sign in as a staff
          </div>

          <div
            className={styles.authButton}
            data-tag="admin"
            onClick={handleAuthSigninOptions}
          >
            Sign in as a admin
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
