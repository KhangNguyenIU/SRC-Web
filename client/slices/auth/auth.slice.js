
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '@services/auth/auth'
import { showNotification } from 'slices/util/notification.slice'

const userInitialState = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: ""
}

export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (payload, thunkAPI) => {
        try {
            const { body, callback } = payload
            if (!body) return thunkAPI.rejectWithValue({ message: "Invalid body" })
            if (!callback || typeof callback != "function") return thunkAPI.rejectWithValue({ message: "Invalid callback" })
            const response = await authService.login(body)
            if (response.status === 200) {
                thunkAPI.dispatch(setUser(response?.data?.user))
                thunkAPI.dispatch(showNotification({ message: response?.data?.message, type: 'success' }))
                callback()
            }
        } catch (error) {
            thunkAPI.dispatch(showNotification({ message: error?.response?.data?.message || 'Internal Server', type: 'error' }))
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (payload, thunkAPI) => {
        try {
            const { callback } = payload
            if (!callback || typeof callback != "function") return thunkAPI.rejectWithValue({ message: "Invalid callback" })
            const response = await authService.logout()
            if (response.status === 200) {
                thunkAPI.dispatch(setUser(userInitialState))
                thunkAPI.dispatch(showNotification({ message: response?.data?.message, type: 'success' }))
                callback()
            }
        } catch (error) {
            thunkAPI.dispatch(showNotification({ message: error?.response?.data?.message || 'Internal Server', type: 'error' }))
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (payload, thunkAPI) => {
        try {
            const response = await authService.checkAuth()
            if (response.status === 200) {
                thunkAPI.dispatch(setUser(response?.data?.user))
            }
        } catch (error) {
            const { callback } = payload
            if (window.location.pathname.startsWith('/private') && (callback && typeof callback === "function")) {
                callback()
            }
            thunkAPI.dispatch(clearUser())
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser: (state, action) => ({
            ...action.payload
        }),
        clearUser: (state) => ({
            ...userInitialState
        })
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer