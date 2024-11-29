import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartData : JSON.parse(localStorage.getItem('products')) || []
}
console.log(initialState.cartData);
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartData = [...state.cartData, action.payload]
            localStorage.setItem('products', JSON.stringify([...state.cartData]))
        },
        removeFromCart: (state, action) => {
            state.cartData = state.cartData.filter(item => item.id !== action.payload)
            localStorage.setItem('products', JSON.stringify(state.cartData.filter(item => item.id !== action.payload)))
            if(state.cartData.length == 0){
                localStorage.clear()
            }
        }
    }
})

export const {addToCart,removeFromCart} = cartSlice.actions
export default cartSlice.reducer