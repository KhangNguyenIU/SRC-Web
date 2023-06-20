import React from 'react';
import styles from '@styles/Landing/Hotline.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { showNotification } from 'slices/util/notification.slice';
export default function Hotline() {
    const user = useSelector(state=>state.user)
    const router = useRouter()
    const dispatch = useDispatch()
    const onClick =()=>{
        if(!!user.id){
            router.push('/private/message')
        }else{
            dispatch(showNotification({message:'Please login to use this feature',type:'error'}))
        }
    }
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img src="landing/intro1.png" alt="intro1" />
      </div>

      <div className={styles.right}>
        <span>Special Feature</span>
        <h1>
          Realtime chat
          <br />
          with Consultants
        </h1>
        <span></span>

        <button onClick={onClick}>
          Chat now
        </button>
      </div>
    </div>
  );
}
