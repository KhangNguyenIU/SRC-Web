import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from 'slices/auth/auth.slice';

export default function Wrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const redirect = () => router.push('/');

  useEffect(() => {
    dispatch(checkAuth({ callback: redirect }));
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
