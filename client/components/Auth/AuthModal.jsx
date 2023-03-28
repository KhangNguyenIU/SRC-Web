import React from 'react';
import { useState } from 'react';

import { Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';

import { Login } from './Login';
import { Register } from './Register';

const AuthModal = ({ open, closeModal }) => {
  /**
   * @description
   * @param {number} authOptions
   * 0: register
   * 1: login
   */
  const [authOptions, setAuthOptions] = useState(1);

  const handleAuthOptions = (option) => {
    console.log(option)
    setAuthOptions(option);
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={closeModal} style={{ padding: '0px' }}>
        <Box sx={modalBox}>
          {!authOptions ? (
            <Register handleAuthOptions={handleAuthOptions} />
          ) : (
            <Login handleAuthOptions={handleAuthOptions } closeModal ={closeModal}/>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const modalBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ['100%', 600, 800, 1000],
  height: [800,600],
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
};

export default AuthModal;
