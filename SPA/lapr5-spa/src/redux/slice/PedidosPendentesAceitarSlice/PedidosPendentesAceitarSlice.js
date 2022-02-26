import { createSlice } from "@reduxjs/toolkit";


export const pedidosPendentesAceitarSlice = createSlice({
    name: 'pedidosPendentesAceitar',
    initialState: {
        pedidosPendentesAceitar: []
    },
    reducers: {
        setPedidosPendentes: (state, action) => {
            console.log(state.pedidosPendentesAceitar);
            state.pedidosPendentesAceitar = [...state.pedidosPendentesAceitar, ...action.payload]
        },
        eliminarPedidoRespondido: (state, action) => {
            state.pedidosPendentesAceitar = state.pedidosPendentesAceitar.filter((pro) => pro.id !== action.payload.id)
        }
    }
})

export const { setPedidosPendentes, eliminarPedidoRespondido } = pedidosPendentesAceitarSlice.actions;

export const selectAllPedidosPendetesAceitar = state => state.pedidosPendentesAceitar.pedidosPendentesAceitar

export default pedidosPendentesAceitarSlice.reducer;