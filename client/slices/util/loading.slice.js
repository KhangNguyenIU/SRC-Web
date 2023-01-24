import {createSlice} from '@reduxjs/toolkit'
import { loadingType } from '@constants';

const initialState ={
    state: false,
    type: loadingType.GENERAL,  
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        setLoading: (state,action) => ({
            ...state,
            state: true,
            type: action?.payload?.type || loadingType.GENERAL,
        }),
        stopLoading: (state) => ({
            ...initialState
        })
    }
});
const { setLoading, stopLoading } = loadingSlice.actions;

export { setLoading, stopLoading };
export default loadingSlice.reducer;