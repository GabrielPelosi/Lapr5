import { createSlice } from "@reduxjs/toolkit";


export const ObjectiveUserLigacaoSlice = createSlice({
    name: 'objectiveUserLigacao',
    initialState: {
        objectiveUserLigacao: {}
    },
    reducers: {
        setObjectiveUserLigacao: (state, action) => {
            state.objectiveUserLigacao = {...action.payload}
        },
    }
})

export const { setObjectiveUserLigacao } = ObjectiveUserLigacaoSlice.actions;

export const selectObjectiveUserLigacao = state => state.objectiveUserLigacao.objectiveUserLigacao || {}

export default ObjectiveUserLigacaoSlice.reducer;