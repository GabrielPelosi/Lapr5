import { createSlice } from "@reduxjs/toolkit";


export const JogadorPostSelecionadoSlice = createSlice({
    name: 'jogadorPostSelecionado',
    initialState: {
        jogadorPostSelecionado: {}
    },
    reducers: {
        setJogadorPostSelecionado: (state, action) => {
            state.jogadorPostSelecionado = {...action.payload}
        },
    }
})

export const { setJogadorPostSelecionado } = JogadorPostSelecionadoSlice.actions;

export const selectJogadorPostSelecionado = state => state.jogadorPostSelecionado.jogadorPostSelecionado || {}

export default JogadorPostSelecionadoSlice.reducer;