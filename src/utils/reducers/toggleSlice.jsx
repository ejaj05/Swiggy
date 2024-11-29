import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
}

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        setIsOpen: (state) => {
            state.isOpen = !state.isOpen
        },
    },
})

export const { setIsOpen } = toggleSlice.actions
export default toggleSlice.reducer