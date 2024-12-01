import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from '../reducers/toggleSlice'
import cordinateReducer from '../reducers/cordSlice'
import cartReducer from "../reducers/cartSlice";
import resReducer from "../reducers/resSlice";
import filterReducer from "../reducers/filterSlice"
import authReducer from '../reducers/authSlice'


const store = configureStore({
    reducer: {
        toggle : toggleReducer,
        cord : cordinateReducer,
        cart : cartReducer,
        res : resReducer,
        filter : filterReducer,
        auth : authReducer,
    }
})


export default store;