import notificationReducer from './util/notification.slice';
import loadingReducer from './util/loading.slice';
import userReducer from './auth/auth.slice';

const reducers = {
    notification: notificationReducer,
    loading: loadingReducer,
    user: userReducer
} 

export default reducers