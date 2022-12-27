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

        addItem: (state, action) => {
            let tempItem = state.cart.find(item => item.product_inventory_id === action.payload.product_inventory_id)
            if (tempItem === undefined) {
                axios.post('/api/user/cart/', action.payload).then(res=>{
                    if(res.data.status==200){
                        console.log('axios post cart data', res.data.added_data);
                        state.cart =res.data.added_data
                        // setCartItem(res.data.added_data)
                    }
                    else{
                        message.error('something went wrong on adding cart')
                    }
                }).catch(err=>{
                    console.warn(err);
                })
                // state.cart = [...state.cart, action.payload]
            }

        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id != action.payload)
            console.log(state.cart);
        },
        increasecartItemvalue: (state, action) => {
            state.cart.forEach((item) => {
                if (item.id == action.payload) {
                    item.cart_qty = item.cart_qty + 1
                    state.cart = [...state.cart]
                    console.log(state.cart);
                }
            })
        },
        decreasecartItemvalue: (state, action) => {
            state.cart.forEach((item) => {
                if (item.id == action.payload) {
                    item.cart_qty = item.cart_qty - 1
                    state.cart = [...state.cart]
                    console.log(state.cart);
                }
            })
        },
    },
},

)

export const { addItem, removeItem, increasecartItemvalue, decreasecartItemvalue, setCartItem } = cartSlice.actions

export default cartSlice.reducer
