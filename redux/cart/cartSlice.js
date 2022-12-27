import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

let initialState = {
    cart: []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItem: (state, action) => {
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id != action.payload)
        },
        increasecartItemvalue: (state, action) => {
            state.cart.forEach((item) => {
                if (item.id == action.payload) {
                    item.cart_qty = item.cart_qty + 1
                    state.cart = [...state.cart]
                }
            })
        },
        decreasecartItemvalue: (state, action) => {
            state.cart.forEach((item) => {
                if (item.id == action.payload) {
                    item.cart_qty = item.cart_qty - 1
                    state.cart = [...state.cart]
                }
            })
        },
    },
},

)

export const { addItem, removeItem, increasecartItemvalue, decreasecartItemvalue, setCartItem } = cartSlice.actions

export default cartSlice.reducer
