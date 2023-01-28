import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from 'slices/auth/auth.slice';

export default function TestPrivate() {
    const user =useSelector(state =>state.user)
    const dispatch  =  useDispatch()
    const router = useRouter()
    const callback = ()=>router.push('/')
    useEffect(()=>{
        dispatch( checkAuth({callback}) )
    },[])
  return <Layout>TestPrivate</Layout>;
}
