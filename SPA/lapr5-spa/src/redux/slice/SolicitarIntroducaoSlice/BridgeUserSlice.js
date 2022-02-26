import { createSlice } from "@reduxjs/toolkit";


export const BridgeUserSlice = createSlice({
    name: 'bridgeUser',
    initialState: {
        bridgeUser: {}
    },
    reducers: {
        setBridgeUser: (state, action) => {
            state.bridgeUser = {...action.payload}
        },
    }
})

export const { setBridgeUser } = BridgeUserSlice.actions;

export const selectBridgeUser = state => state.bridgeUser.bridgeUser || {}

export default BridgeUserSlice.reducer;