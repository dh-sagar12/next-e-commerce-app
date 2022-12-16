import { createSlice } from "@reduxjs/toolkit";






let initialState = {
    currentUser: null
}


const userDataSlice = createSlice({
    name: "userDataSlice",
    initialState,
    reducers: {
        updateCurrentUser: (state, action) => {
                state.currentUser = action.payload
        }
    },
},

)

export const { updateCurrentUser } = userDataSlice.actions

export default userDataSlice.reducer
