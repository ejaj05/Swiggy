import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSameRes : true
}
export const resSlice = createSlice({
    name: "res",
    initialState,
    reducers: {
        checkRes: (state, action) => {
            state.isSameRes = action.payload;
        },
        resetRes: (state) => {
            state.isSameRes = true;
        }
    }
})

export const { checkRes ,resetRes} = resSlice.actions;
export default resSlice.reducer;