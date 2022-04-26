import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice  from "./cart/cartSlice";
import { createWrapper } from "next-redux-wrapper";


const combineReducer = combineReducers({
    cartSlice,
})



 export const  makeStore =()=>
    configureStore({
        reducer: combineReducer,
    })


export const wrapper =  createWrapper(makeStore);