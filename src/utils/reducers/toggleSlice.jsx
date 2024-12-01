import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    loginStatus: false,
}

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        setIsOpen: (state) => {
            state.isOpen = !state.isOpen
        },
        setLoginStatus: (state) => {
            state.loginStatus = !state.loginStatus
        }
    },
})

export const {setLoginStatus, setIsOpen } = toggleSlice.actions
export default toggleSlice.reducer