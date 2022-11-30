import data from 'data';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, signinUser } from 'slices/auth/auth.slice';

export default function Wrapper({ children }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
