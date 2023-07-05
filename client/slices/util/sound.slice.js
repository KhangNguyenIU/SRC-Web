import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    play: false,
    sound: '',
    playInLoop: false
}

const soundSlice = createSlice({
    name: 'sound',
    initialState,
    reducers: {
        setSound: (state, action) => ({
            ...state,
            play: true,
            sound: action.payload.sound,
            playInLoop: action.payload.playInLoop || false
        }),
        stopSound: () => ({
            ...initialState
        })
    }
})


const { reducer, actions} = soundSlice
export const { setSound, stopSound } = actions
export default reducer