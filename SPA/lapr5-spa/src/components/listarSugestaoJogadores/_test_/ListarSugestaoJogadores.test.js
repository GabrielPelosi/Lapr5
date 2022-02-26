import React from 'react';
import ListarSugestaoJogadores from '../ListarSugestaoJogadores'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'

it("render without crashing", () => {
    const initialState = {sugestaoJogadores:[
        {id:'1',nome:'Antonio',email:'aaa@gmail.com',},
        {id:'2',nome:'Joao',email:'jjj@hotmail.com',},
        {id:'3',nome:'Jose',email:'jjjo@sapo.pt',},
    ]}
    const mockStore = configureStore()
    let store
    store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}> <ListarSugestaoJogadores/></Provider>,div) 
})

