import { createSlice } from "@reduxjs/toolkit";

export const LoggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState: {
        loggedUser: {}
    },
    reducers: {
        setLoggedUser: (state, action) => {
            state.loggedUser = {...action.payload}
        },
    }
})

export const { setLoggedUser } = LoggedUserSlice.actions;

export const selectLoggedUser = state => state.loggedUser.loggedUser

export default LoggedUserSlice.reducer;