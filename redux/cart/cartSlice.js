import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cart: []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let tempItem = state.cart.find(item => item.id === action.payload.id)
            console.log(tempItem);
            if (tempItem === undefined) {
                state.cart = [...state.cart, action.payload]
            }

        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id != action.payload)
            console.log(state.cart);
        },
        increasecartItemvalue: (state, action) => {
            state.cart.forEach((item) => {
                if (item.id == action.payload) {
                    item.cartvalue = item.cartvalue + 1
                    state.cart = [...state.cart]
                    console.log(state.cart);
                }
            })
        },
        decreasecartItemvalue: (state, action) => {
            state.cart.forEach((item) => {
                if (item.id == action.payload) {
                    item.cartvalue = item.cartvalue - 1
                    state.cart = [...state.cart]
                    console.log(state.cart);
                }
            })
        },
    },
},

)

export const { addItem, removeItem, increasecartItemvalue, decreasecartItemvalue } = cartSlice.actions

export default cartSlice.reducer
