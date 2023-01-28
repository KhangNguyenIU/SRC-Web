import { setLoading, stopLoading } from "slices/util/loading.slice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "@services/post";
import { showNotification } from "slices/util/notification.slice";

export const createNewPost = createAsyncThunk(
    'post/createNewPost',
    async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch( setLoading())
            const { body, callback } = payload
            if (!body) { 
                return thunkAPI.rejectWithValue({ message: "Invalid body" })
             }
            if (!callback || typeof callback != "function"){
                return thunkAPI.rejectWithValue({ message: "Invalid callback" })
            }
            const response = await PostService.createPost(body)
            if (response.status === 200) {
                thunkAPI.dispatch(showNotification({ message: "Create a Post success", type: 'success' }))
                callback()
            }
        } catch (error) {
            thunkAPI.dispatch(showNotification({ message: error?.response?.data?.message || 'Internal Server', type: 'error' }))
        } finally {
            thunkAPI.dispatch(  stopLoading())
        }
    }
)