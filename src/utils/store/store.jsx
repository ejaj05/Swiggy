import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from '../reducers/toggleSlice'
import cordinateReducer from '../reducers/cordSlice'
import cartReducer from "../reducers/cartSlice";
const store = configureStore({
    reducer: {
        toggle : toggleReducer,
        cord : cordinateReducer,
        cart : cartReducer
    }
})


export default store;