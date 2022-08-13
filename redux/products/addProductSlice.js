import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    new_product: []
}


const newProductSlice = createSlice({
    name: "new_product",
    initialState,

    reducers: {
        addProduct:   (state, action) => {

            state.new_product = [ action.payload]
        },
        addProductItem: (state, action)=> {
            if (state.new_product.length> 1){
                state.new_product.pop()
                state.new_product = [...state.new_product, action.payload]
            }
            else{
                state.new_product = [...state.new_product, action.payload]

            }
        }
    }
}

)

export const { addProduct, addProductItem } = newProductSlice.actions

export default newProductSlice.reducer