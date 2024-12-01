import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterVal : null
}
export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterVal: (state, action) => {
            state.filterVal = action.payload;
        }
    }
})

export const { setFilterVal } = filterSlice.actions;

export default filterSlice.reducer;