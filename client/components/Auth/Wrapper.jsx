import data from 'data';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, signinUser } from 'slices/auth/auth.slice';

export default function Wrapper({ children }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const redirect = () => router.push('/');
  useEffect(() => {
    dispatch(checkAuth({ callback: redirect }));
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
