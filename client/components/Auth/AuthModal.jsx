import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from '@styles/Auth.module.scss';
import { useDispatch } from 'react-redux';
import { signinUser } from 'slices/auth/auth.slice';
import data from 'data';

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

  const handleAuthSigninOptions = (e) => {
    let option = e.target.attributes.getNamedItem('data-tag').value;
    if (!option) return;

    switch (option) {
      case 'guest':
        dispatch(signinUser({ body: data.signin.user, callback: closeModal }));
        break;
      case 'staff':
        dispatch(signinUser({ body: data.signin.staff, callback: closeModal }));
        break;
      case 'admin':
        dispatch(signinUser({ body: data.signin.admin, callback: closeModal }));
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
          <div
            className={styles.authButton}
            data-tag="guest"
            onClick={handleAuthSigninOptions}
          >
            Sign in as a guest
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
