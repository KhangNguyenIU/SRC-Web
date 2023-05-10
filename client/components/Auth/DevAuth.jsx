import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { signinUser } from 'slices/auth/auth.slice';

import {authData} from 'data';
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import styles from '@styles/Auth/DevAuth.module.scss';

/**
 * @author
 * @function DevAuth
 **/

export const DevAuth = ({closeModal}) => {
  const dispatch = useDispatch();

  const [authOptions, setAuthOptions] = useState({
    user: authData.signin.user[0].email,
    staff: authData.signin.staff[0].email,
    admin: authData.signin.admin.email,
  });

  const handleAuthSigninOptions = (e) => {
    let option = e.target.attributes.getNamedItem('data-tag').value;
    if (!option) return;

    switch (option) {
      case 'guest':
        dispatch(
          signinUser({
            body: { email: authOptions.user, password: '123456' },
            callback: closeModal,
          })
        );
        break;
      case 'staff':
        dispatch(
          signinUser({
            body: { email: authOptions.staff, password: '123456' },
            callback: closeModal,
          })
        );
        break;
      case 'admin':
        dispatch(
          signinUser({
            body: { email: authOptions.admin, password: '123456' },
            callback: closeModal,
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.option}>
        <Typography variant="caption">Guest accounts</Typography>
        <FormControl size="small">
          <TextField
            select
            label="select"
            value={authOptions.user}
            fullWidth
            size="small"
            onChange={(e) =>
              setAuthOptions({ ...authOptions, user: e.target.value })
            }
          >
            {authData.signin.user.map((user, i) => (
              <MenuItem key={i} value={user.email}>
                {user.firstName}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        
        <Button variant="contained" data-tag="guest" onClick={handleAuthSigninOptions}>Signin as guest</Button>
      </div>

    

      <div className={styles.option}>
        <Typography variant="caption">Staff accounts</Typography>
        <FormControl size="small">
          <TextField
            select
            label="select"
            value={authOptions.staff}
            size="small"
            onChange={(e) =>
              setAuthOptions({ ...authOptions, staff: e.target.value })
            }
            fullWidth
          >
            {authData.signin.staff.map((user, i) => (
              <MenuItem key={i} value={user.email}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>

        </FormControl>
 <Button variant="contained" data-tag="staff" onClick={handleAuthSigninOptions}>Signin as staff</Button>
      </div>

      <Button variant="contained" data-tag="admin" onClick={handleAuthSigninOptions}>Signin as admin</Button>
    </div>
  );
};
