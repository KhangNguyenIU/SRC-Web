import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isAuth } from 'utils';

export default function PrivateRoute({ children }) {
  //   const router = useRouter();
  const [validate, setValidate] = useState('loading');

  if (validate === 'loading') {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (!isAuth(user)) {
      Router.push('/');
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
