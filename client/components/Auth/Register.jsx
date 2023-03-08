import React, { useEffect } from 'react';

import styles from '@styles/Auth/Register.module.scss';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FavoriteOutlined } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import provincesData from 'provinces.json';
import { NormalTextField } from './NormalTextField';
import { useDispatch } from 'react-redux';
import { registerUser } from 'slices/auth/auth.slice';

/**
 * @author
 * @function Register
 **/

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const means = ['Mạng Xã Hội', 'Bạn Bè', 'Tin Tức', 'Khác'];

const schools = [
  'THPT Nguyễn Trãi',
  'THPT Nguyễn Du',
  'THPT Nguyễn Khuyến',
  'THPT Nguyễn Văn Linh',
  'THPT Nguyễn Văn Cừ',
  'THPT Nguyễn Văn Huyên',
];

export const Register = ({ handleAuthOptions }) => {
    const dispatch = useDispatch()
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mean: means[0],
    location: provincesData[0].province,
    school: schools[0],
    interest: 2,
  });

  const checkCanSubmit = () => {
    const { firstName, lastName, email, password, mean, location } = data;
    return (
      !!firstName && !!lastName && !!email && !!password && !!mean && !!location
    );
  };

  const submit = () => {

    dispatch(registerUser({
        body: data,
        callback:()=> handleAuthOptions(1)
    }))
  };
  const handleChangeForm = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
  };
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <img src="https://images.pexels.com/photos/158854/pexels-photo-158854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="register" />
        </div>

        <div className={styles.right}>
          <h1 className={styles.heading}>Register</h1>
          <h2 className={styles.secondaryHeading}>
            Manage your profile and explore awsome ultilities
          </h2>
          <h3 className={styles.quote}>
            Let's get you all set up so you can verify your personal account and
            begin setting up your profile
          </h3>

          <div className={styles.form}>
            <Grid container spacing={1}>
              <NormalTextField
                handleChange={handleChangeForm}
                initialData={data}
                field="firstName"
                label="First Name"
              />
              <NormalTextField
                handleChange={handleChangeForm}
                initialData={data}
                field="lastName"
                label="Last Name"
              />
              <NormalTextField
                handleChange={handleChangeForm}
                initialData={data}
                field="email"
                label="Email"
              />
              <NormalTextField
                handleChange={handleChangeForm}
                initialData={data}
                field="password"
                label="Password"
              />

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="caption">Where do you from</Typography>
                <FormControl size="small">
                  <Select
                    defaultValue={provincesData[0].province}
                    value={data.location}
                    onChange={handleChangeForm('location')}
                  >
                    {provincesData.map((province, index) => (
                      <MenuItem
                        key={province.province}
                        value={province.province}
                      >
                        {province.province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="caption">
                  Which high school do you from?
                </Typography>
                <FormControl size="small">
                  <Select
                    defaultValue={schools[0]}
                    onChange={handleChangeForm('school')}
                  >
                    {schools.map((school, index) => (
                      <MenuItem key={school} value={school}>
                        {school}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="caption">
                  How did you get to know us
                </Typography>
                <FormControl size="small">
                  <Select
                    defaultValue={means[0]}
                    onChange={handleChangeForm('mean')}
                  >
                    {means.map((mean, index) => (
                      <MenuItem key={mean} value={mean}>
                        {mean}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                padding={[2, 2, 2, 2]}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="caption">
                  Your interest about IU
                </Typography>
                <StyledRating
                  //   defaultValue={2}
                  max={5}
                  value={Number(data.interest)}
                  icon={<FavoriteOutlined />}
                  emptyIcon={<FavoriteBorderIcon />}
                  onChange={handleChangeForm('interest')}
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={!checkCanSubmit()}
              onClick={submit}
            >
              Submit
            </Button>
            <p className={styles.loginDirect}>
              Already have an account?{' '}
              <span onClick={() => handleAuthOptions(1)}> Login</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

