import { createSlice } from "@reduxjs/toolkit";


export const LigacaoSlice = createSlice({
    name: 'ligacao',
    initialState: {
        ligacao: {}
    },
    reducers: {
        setLigacao: (state, action) => {
            state.ligacao = {...action.payload}
        },
    }
})

export const { setLigacao } = LigacaoSlice.actions;

export const selectLigacao = state => state.ligacao.ligacao || {};

export default LigacaoSlice.reducer;