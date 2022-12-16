import { createSlice } from "@reduxjs/toolkit";






let initialState = {
    authCredentials: null
}


const authSlice = createSlice({
    name: "authCredentials",
    initialState,
    reducers: {
        updateAuthCredential: (state, action) => {
                state.authCredentials = action.payload
        }
    },
},

)

export const { updateAuthCredential } = authSlice.actions

export default authSlice.reducer
