import React from 'react';
import {
  Button,
  Grid,
} from '@mui/material';
import styles from '@styles/Auth/Login.module.scss';

import { NormalTextField } from './NormalTextField';
import { DevAuth } from './DevAuth';
import { useDispatch } from 'react-redux';
import { signinUser } from 'slices/auth/auth.slice';

/**
 * @author
 * @function Login
 **/


export const Login = ({ handleAuthOptions, closeModal }) => {
    const dispatch = useDispatch()

  const handleChangeForm = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const submit = () => {
    console.log('submit', formData);
    dispatch(signinUser({body: formData, callback: closeModal}))
  };

  const checkCanSubmit = () => {
    const { email, password } = formData;
    return !!email && !!password;
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h1 className={styles.heading}>Login</h1>

          <h3 className={styles.quote}>Sign in to explore awsome benefits</h3>

          <div className={styles.form}>
            <Grid container spacing={1}>
              <NormalTextField
                handleChange={handleChangeForm}
                initialData={formData}
                field="email"
                label="Email"
              />
              <br></br>
              <NormalTextField
                handleChange={handleChangeForm}
                initialData={formData}
                field="password"
                label="Password"
              />
            </Grid>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={!checkCanSubmit()}
              onClick={submit}
            >
              Submit
            </Button>
            <p className={styles.registerDirect}>
              Dont have an account?{' '}
              <span onClick={() => handleAuthOptions(0)}> Register</span>
            </p>
     
            <DevAuth closeModal={closeModal}/>
          </div>
        </div>

        <div className={styles.right}>
          <img
            src="https://images.pexels.com/photos/185764/pexels-photo-185764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="login"
          />
        </div>
      </div>
    </React.Fragment>
  );
};
