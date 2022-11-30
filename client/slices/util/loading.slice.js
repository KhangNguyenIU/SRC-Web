import {createSlice} from '@reduxjs/toolkit'
const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading: (state,) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        }
    }
});
const { setLoading, stopLoading } = loadingSlice.actions;

export { setLoading, stopLoading };
export default loadingSlice.reducer;