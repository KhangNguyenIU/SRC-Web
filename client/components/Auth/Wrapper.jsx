import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from 'slices/auth/auth.slice';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { db } from 'firebaseConfig';
import { setUnreadMess } from 'slices/util/unreadMess.slice';

export default function Wrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const redirect = () => router.push('/');

  useEffect(() => {
    dispatch(checkAuth({ callback: redirect }));
  }, []);

  useEffect(() => {
    //Firebase subscription unread messages
    onValue(ref(db, '/unread_messages'), (snapshot) => {
      console.log('fb', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
      const res = snapshot.val();
      if (res !== null && !!user?.id) {
        let userPattern = `user_${user?.id}`;
        let unreadMessages = res[userPattern];
        console.log('firebase', unreadMessages);
        {
          if (!!unreadMessages && unreadMessages !== {}) {
            const sumUnreadMess = Object.values(unreadMessages).reduce(
              (acc, cur) => acc + cur,
              0
            );
            console.log({ sumUnreadMess });
            if (!isNaN(sumUnreadMess)) {
              dispatch(
                setUnreadMess({
                  unReadMess: sumUnreadMess,
                  unReadCons: unreadMessages,
                })
              );
            }
          }
        }
      }
    });
  }, [user]);

  return <React.Fragment>{children}</React.Fragment>;
}
