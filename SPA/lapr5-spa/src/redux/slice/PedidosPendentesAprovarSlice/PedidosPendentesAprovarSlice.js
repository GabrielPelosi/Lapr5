import { createSlice } from "@reduxjs/toolkit";


export const pedidosPendentesAprovarSlice = createSlice({
    name: 'pedidosPendentesAprovar',
    initialState: {
        pedidosPendentesAprovar: []
    },
    reducers: {
        setPedidosPendentes: (state, action) => {
            state.pedidosPendentesAprovar = []
            state.pedidosPendentesAprovar = [...state.pedidosPendentesAprovar, ...action.payload]
        },
        eliminarPedidoRespondido: (state, action) => {
            state.pedidosPendentesAprovar = state.pedidosPendentesAprovar.filter((pro) => pro.id !== action.payload.id)
        }
    }
})

export const { setPedidosPendentes, eliminarPedidoRespondido } = pedidosPendentesAprovarSlice.actions;

export const selectAllPedidosPendetesAprovar = state => state.pedidosPendentesAprovar.pedidosPendentesAprovar || []

export default pedidosPendentesAprovarSlice.reducer;