import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { stopLoading } from 'slices/util/loading.slice';
import { loadingType } from 'constants';


export default function Loading({type}) {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    console.log(loading, loading.type === type)
    const handleClose = () => {
      dispatch(stopLoading())
    };
  
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading.state && loading.type === type}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
}
