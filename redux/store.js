import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice  from "./cart/cartSlice";
import newProductSlice from './products/addProductSlice';
import authSlice from "./auth/authSlice";
import userDataSlice from "./auth/userDataSlice"


import { createWrapper } from "next-redux-wrapper";


const combineReducer = combineReducers({
    cartSlice,  newProductSlice, authSlice, userDataSlice
})



 export const  makeStore =()=>
    configureStore({
        reducer: combineReducer,
    })


export const wrapper =  createWrapper(makeStore);