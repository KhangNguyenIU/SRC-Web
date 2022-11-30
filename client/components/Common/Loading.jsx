import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { stopLoading } from 'slices/util/loading.slice';


export default function Loading() {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading?.loading)

    const handleClose = () => {
      dispatch(stopLoading())
    };
  
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
}
