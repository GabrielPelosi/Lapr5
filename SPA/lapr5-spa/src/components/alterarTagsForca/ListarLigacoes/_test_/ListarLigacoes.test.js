import React from 'react';
import ListarLigacoes from '../ListarLigacoes'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'

it("render without crashing", () => {
    const initialState = {ligacao:[
        {id:'1',jogador1UserName:'Jose',jogador2UserName:'Antonio',forcaLigacao:'11', tagsLigacao:'C#;Java',},
        {id:'2',jogador1UserName:'Jose',jogador2UserName:'Carlos',forcaLigacao:'13', tagsLigacao:'C#;Java',},
        {id:'3',jogador1UserName:'Jose',jogador2UserName:'Anibal',forcaLigacao:'17', tagsLigacao:'C#;Java;Javascript',},
    ]}
    const mockStore = configureStore()
    let store
    store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}> <ListarLigacoes/></Provider>,div) 
})
