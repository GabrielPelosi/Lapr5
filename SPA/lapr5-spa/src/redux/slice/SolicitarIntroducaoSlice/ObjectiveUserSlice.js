import { createSlice } from "@reduxjs/toolkit";


export const ObjectiveUserSlice = createSlice({
    name: 'objectiveUser',
    initialState: {
        objectiveUser: {}
    },
    reducers: {
        setObjectiveUser: (state, action) => {
            state.objectiveUser = {...action.payload}
        },
    }
})

export const { setObjectiveUser } = ObjectiveUserSlice.actions;

export const selectObjectiveUser = state => state.objectiveUser.objectiveUser || {}

export default ObjectiveUserSlice.reducer;