const { createSlice } = require("@reduxjs/toolkit");

const socketInitialState = {
    socket: null
}

const socketSlice =  createSlice({
    name: "socket",
    initialState: {
        socket: null,
    },
    reducers:{
        setSocket: (state, action) => 
        ({
            ...action.payload
        }),
        clearSocket: (state) => ({
            ...socketInitialState
        })
    }
})

export const { setSocket, clearSocket } = socketSlice.actions
export default socketSlice.reducer