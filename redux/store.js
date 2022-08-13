import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice  from "./cart/cartSlice";
import newProductSlice from './products/addProductSlice';

import { createWrapper } from "next-redux-wrapper";


const combineReducer = combineReducers({
    cartSlice,  newProductSlice
})



 export const  makeStore =()=>
    configureStore({
        reducer: combineReducer,
    })


export const wrapper =  createWrapper(makeStore);