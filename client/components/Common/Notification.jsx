import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { hideNotification } from 'slices/util/notification.slice';

/**
 * @author
 * @function Notification
 **/

const options = {
  vertical: 'bottom',
  horizontal: 'center',
  duration: 1500,
};

export const Notification = (props) => {
  const dispatch = useDispatch();
  let notification = useSelector((state) => state.notification);
  const handleCLose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(hideNotification());
  };
  return (
    <React.Fragment>
      {notification && (
        <Snackbar
          anchorOrigin={{
            vertical: options.vertical,
            horizontal: options.horizontal,
          }}
          open={notification.show}
          autoHideDuration={notification.duration}
          onClose={handleCLose}
        >
          <Alert
            onClose={handleCLose}
            severity={notification.type}
            // severity="error"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};
