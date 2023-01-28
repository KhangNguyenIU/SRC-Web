import notificationReducer from './util/notification.slice';
import loadingReducer from './util/loading.slice';
import userReducer from './auth/auth.slice';
import socketReducer from './socket/socket.slice';

const reducers = {
    notification: notificationReducer,
    loading: loadingReducer,
    user: userReducer,
    socket: socketReducer
} 

export default reducers