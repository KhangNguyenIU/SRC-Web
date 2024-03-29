import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from 'slices/auth/auth.slice';
import { ref, onValue } from 'firebase/database';
import { db } from 'firebaseConfig';
import { setUnreadMess } from 'slices/util/unreadMess.slice';

export default function Wrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);
  const sound = useSelector((state) => state.sound);

  const redirect = useCallback(() => () => router.push('/'));

  useEffect(() => {
    dispatch(checkAuth({ callback: redirect }));
  }, []);

  useEffect(() => {
    console.log({ sound });
  }, [sound]);

  //Firebase subscription unread messages
  useEffect(() => {
    onValue(ref(db, '/unread_messages'), (snapshot) => {
      const res = snapshot.val();
      if (res !== null && !!user?.id) {
        let userPattern = `user_${user?.id}`;
        let unreadMessages = res[userPattern];
        {
          if (!!unreadMessages && unreadMessages !== {}) {
            const sumUnreadMess = Object.values(unreadMessages).reduce(
              (acc, cur) => acc + cur,
              0
            );
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
