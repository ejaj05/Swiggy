import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    move : 0
}

export const moveSlice = createSlice({
    name : "moveSlice",
    initialState,
    reducers : {
        moveRight : (state) => {
            if (move > 0) {
                setMove(move - 1);
            }
        },
        moveLeft : (state,action) => {
            if (move < 4) {
                setMove(move + 1);
            }
        }
    }
})