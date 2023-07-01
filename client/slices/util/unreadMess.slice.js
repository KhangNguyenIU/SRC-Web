const {createSlice} = require("@reduxjs/toolkit");

const unreadMessInitialState = {
    unReadMess: 0,
    unReadCons: {}
}

const unreadMessSlice = createSlice({
    name: "unreadMess",
    initialState: unreadMessInitialState,
    reducers: {
        setUnreadMess: (state, action) => ({
            ...action.payload
        }),
        clearUnreadMess: (state) => ({
            ...unreadMessInitialState
        })
    }
})

export const {setUnreadMess, clearUnreadMess} = unreadMessSlice.actions

export default unreadMessSlice.reducer