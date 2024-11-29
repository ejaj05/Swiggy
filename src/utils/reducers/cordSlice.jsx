import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cord : { lat: 22.530777, lng: 88.4022104 },
}

export const cordSlice = createSlice({
    name: 'cordinates',
    initialState,
    reducers: {
        setCord: (state,action) => {
            state.cord = action.payload
        },
    },
})

export const { setCord } = cordSlice.actions
export default cordSlice.reducer